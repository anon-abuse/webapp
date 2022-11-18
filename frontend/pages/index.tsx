import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PropsPayload } from "../types/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import ProposalRow from "../components/proposalRow";
import { extractTitle, getSubgraphProps } from "../utils/graphql";

const getDbProps = async () =>
  (await axios.get<PropsPayload>("/api/getProps")).data;

interface DisplayProp {
  id: number;
  title: string;
  description: string; // in markdown format

  createdBlock: number;
  startBlock: number;
  endBlock: number;

  status: string;

  proposalThreshold: number;
  quorumVotes: number;

  executionETA: number | null;
}

const Home: NextPage = () => {
  const { address, connector, isConnected } = useAccount();
  const { isLoading: propIdsLoading, data: propIdsPayload } =
    useQuery<PropsPayload>({
      queryKey: ["props"],
      queryFn: getDbProps,
      retry: 1,
      enabled: address !== undefined,
      staleTime: 10000,
    });

  const { isLoading: propMetadataLoading, data: propMetadataPayload } =
    useQuery({
      queryKey: ["proposals"],
      queryFn: getSubgraphProps,
      retry: 1,
      enabled: address !== undefined,
      staleTime: 10000,
    });

  const propsReverseOrder = useMemo(() => {
    const finalizedPropIds = new Set(
      propIdsPayload?.props.filter((p) => p.finalized).map((p) => p.num)
    );

    let finalizedPropMetadata: DisplayProp[] = propMetadataPayload?.proposals
      .filter((p: any) => finalizedPropIds.has(Number(p.id)))
      .map((p: any) => {
        // NOTE: may want to extract this out later
        return {
          ...p,
          id: Number(p.id),

          createdBlock: Number(p.createdBlock),
          startBlock: Number(p.startBlock),
          endBlock: Number(p.endBlock),
          executionETA: p.executionETA ? Number(p.executionETA) : null,

          proposalThreshold: Number(p.proposalThreshold),
          quorumVotes: Number(p.quorumVotes),

          title: extractTitle(p.description),
        };
      });

    console.log(finalizedPropMetadata);

    if (finalizedPropMetadata) {
      return finalizedPropMetadata
        .slice(0)
        .sort((a: any, b: any) => b.id - a.id);
    } else {
      return [];
    }
  }, [propIdsPayload?.props, propMetadataPayload?.proposals]);

  return (
    <div>
      <Head>
        <title>Nouns 150</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-black dots">
          <div className="pt-8">
            <nav className="pr-6 flex justify-end">
              <ConnectButton />
            </nav>
            <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center max-w-2xl mx-auto">
                <h1 className="text-5xl text-white font-bold leading-14">
                  Give Feedback On Proposals Anonymously
                </h1>
                <p className="mt-4 text-xl font-normal leading-8 text-white">
                  Anoun allows noun-holders to give feedback on proposals while
                  maintaining their privacy using zero-knowledge proofs.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img className="w-40" src="nouns.png" />
          </div>
        </div>

        <div className="bg-gray-50">
          <div className="max-w-3xl mx-auto py-10">
            <h2 className="font-semibold text-3xl"> Proposals</h2>
            <div className="mt-4">
              {isConnected && propIdsLoading && propMetadataLoading ? (
                <div className="bg-gray-100 border border-gray-300 p-12 py-24 rounded-md flex justify-center text-gray-800">
                  <p>loading props...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(propsReverseOrder == undefined ||
                    propsReverseOrder.length === 0) && (
                    <div className="bg-gray-100 border border-gray-300 p-12 py-24 rounded-md flex justify-center text-gray-800">
                      Please connect your wallet to continue
                    </div>
                  )}

                  {propsReverseOrder &&
                    propsReverseOrder.map((prop: DisplayProp) => {
                      return (
                        <ProposalRow
                          key={prop.id}
                          number={prop.id}
                          title={prop.title}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx>
        {`
          .dots {
            background-image: radial-gradient(#1c1e2b 1px, transparent 0);
            background-size: 13px 13px;
            background-position: 0px 0px;
          }
        `}
      </style>
    </div>
  );
};

export default Home;

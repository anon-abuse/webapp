import { useQuery } from "@tanstack/react-query";

import GeneralCommentWriter from "./generalCommentWriter";
import CommentView from "./commentView";
import Spinner from "./spinner";

import { getPropComments } from "../requests";
import { PropCommentsPayload } from "../types/api";

const GeneralCommentPanel = () => {
  const propId = -1;
  const { isLoading, data, error } = useQuery<PropCommentsPayload>({
    queryKey: [`${propId}_comments`],
    queryFn: getPropComments(propId),
    retry: 1,
    enabled: true,
    staleTime: 1000,
  });

  return (
    <div className="flex justify-center items-center">
      <div className="space-y-4">
        <h2 className="ml-2 text-2xl font-semibold text-gray-800">
          Please share your experience
        </h2>
        <div className="p-6 py-3 rounded-lg bg-gray-100 border border-gray-200">
          <span className="text-lg">❤️</span>
          <span className="text-base ml-1">
            We ask that you input a tx hash relevant to the crime so we can anonymously associate your address with the set of those similarly victimized by the same attacker.<p></p><br></br> 

You will then be able to provably share your experience from this set of affected parties without revealing your specific address 
          </span>
        </div>

        <GeneralCommentWriter propId={1} />

            <Spinner />
     </div>
    </div>
  );
};

export default GeneralCommentPanel;

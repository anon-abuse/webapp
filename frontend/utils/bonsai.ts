import { providers } from 'ethers';
import { BonsaiResponse } from '../types/api';
import { fetchBlockNumber } from '@wagmi/core';

export async function fetchBonsaiProof(
  tx: providers.TransactionResponse,
  block: providers.Block
): Promise<BonsaiResponse> {
  const url = process.env.NEXT_PUBLIC_BONSAI_API_URL;

  if (url === undefined) {
    throw new Error('NEXT_PUBLIC_BONSAI_API_URL is undefined');
  }

  const data = {
    transaction: tx,
    scammer_address: tx.to,
    transactions_root: tx.
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Bonsai API failed. status: ${response.status}`);
  }

  const bonsaiData = await response.json();
  return {
    proof: bonsaiData.proof,
    from: bonsaiData.from,
    to: bonsaiData.to,
    root: bonsaiData.root
  }
}

export const anonAbuseAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "groupId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "merkleRoot",
        "type": "bytes32"
      }
    ],
    "name": "GroupAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "groupId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "oldMerkleRoot",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newMerkleRoot",
        "type": "bytes32"
      }
    ],
    "name": "GroupUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "groupMerkleRoot",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "hackerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "attackedAddress",
        "type": "address"
      }
    ],
    "name": "entryPoint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "attacker_address",
        "type": "address"
      }
    ],
    "name": "getLeavesFromAttackerAddress",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "groupID",
        "type": "uint256"
      }
    ],
    "name": "getLeavesFromGroupID",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "treeMetaDataByID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "merkleRoot",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

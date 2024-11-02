export const MULTI_SIG_CONTRACT_ABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_spInstance",
              "type": "address"
          },
          {
              "internalType": "uint64",
              "name": "_signatureSchemaId",
              "type": "uint64"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "MultiSigContract__alreadySigned",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "MultiSigContract__onlyFactoryTokenContract",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "MultiSigContract__onlySigner",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "factoryTokenContract",
      "outputs": [
          {
              "internalType": "contract FactoryTokenContract",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_txId",
              "type": "uint256"
          }
      ],
      "name": "getPendingTxData",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "txId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                  },
                  {
                      "internalType": "address[]",
                      "name": "signers",
                      "type": "address[]"
                  },
                  {
                      "internalType": "address[]",
                      "name": "signatures",
                      "type": "address[]"
                  }
              ],
              "internalType": "struct MultiSigContract.TxData",
              "name": "",
              "type": "tuple"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "owner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
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
      "name": "pendingTxs",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "txId",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_txId",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "_owner",
              "type": "address"
          },
          {
              "internalType": "address[]",
              "name": "_signers",
              "type": "address[]"
          }
      ],
      "name": "queueTx",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_factoryTokenContract",
              "type": "address"
          }
      ],
      "name": "setFactoryTokenContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_txId",
              "type": "uint256"
          }
      ],
      "name": "signTx",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "signatureSchemaId",
      "outputs": [
          {
              "internalType": "uint64",
              "name": "",
              "type": "uint64"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "signerToAttestationId",
      "outputs": [
          {
              "internalType": "uint64",
              "name": "",
              "type": "uint64"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "spInstance",
      "outputs": [
          {
              "internalType": "contract ISP",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_txId",
              "type": "uint256"
          }
      ],
      "name": "unsignTx",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
]

export const VESTING_CONTRACT_ABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "InitialOwner",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "AlreadyRevoked",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "NoTokensAreDue",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "NoVestingSchedule",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "SafeERC20FailedOperation",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "VestingAlreadySet",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "VestingIsRevoked",
      "type": "error"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "beneficiary",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "TokensReleased",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "beneficiary",
              "type": "address"
          }
      ],
      "name": "VestingRevoked",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "owner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "beneficiary",
              "type": "address"
          }
      ],
      "name": "release",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "beneficiary",
              "type": "address"
          }
      ],
      "name": "revoke",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "beneficiary",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "start",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "duration",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "setVestingSchedule",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "beneficiary",
              "type": "address"
          }
      ],
      "name": "vestedAmount",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
]

export const LIQUIDITY_MANAGER_CONTRACT_ABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_poolManager",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "_vestingContract",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "PoolAlreadyInitialized",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "PoolNotInitialized",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "SafeERC20FailedOperation",
      "type": "error"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "provider",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "token0",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "token1",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "LiquidityAdded",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "token0",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "token1",
              "type": "address"
          }
      ],
      "name": "LiquidityThresholdReached",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "token0",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "token1",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "pool",
              "type": "address"
          }
      ],
      "name": "PoolInitialized",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "token0",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "token1",
              "type": "address"
          },
          {
              "internalType": "uint24",
              "name": "swapFee",
              "type": "uint24"
          },
          {
              "internalType": "int24",
              "name": "tickLower",
              "type": "int24"
          },
          {
              "internalType": "int24",
              "name": "tickUpper",
              "type": "int24"
          },
          {
              "internalType": "uint256",
              "name": "amountToken0",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "amountToken1",
              "type": "uint256"
          }
      ],
      "name": "addLiquidity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "claimVestedTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "token0",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "token1",
              "type": "address"
          },
          {
              "internalType": "uint24",
              "name": "swapFee",
              "type": "uint24"
          },
          {
              "internalType": "int24",
              "name": "tickSpacing",
              "type": "int24"
          },
          {
              "internalType": "uint160",
              "name": "startingPrice",
              "type": "uint160"
          }
      ],
      "name": "initializePool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "isThresholdMet",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "liquidityProviders",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "amountProvided",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "hasVested",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "liquidityThreshold",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "poolInitialized",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "poolManager",
      "outputs": [
          {
              "internalType": "contract IPoolManager",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "vestingContract",
      "outputs": [
          {
              "internalType": "contract VestingContract",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
]

export const FACTORY_TOKEN_CONTRACT_ABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_multiSigContract",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "_liquidityManager",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "_USDC",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "initialOwner",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "EmptyName",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "EmptySymbol",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "FactoryTokenContract__onlyMultiSigContract",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "InvalidSignerCount",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "InvalidSupply",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "TransactionAlreadyExecuted",
      "type": "error"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "symbol",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "supply",
              "type": "uint256"
          }
      ],
      "name": "MemecoinCreated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "txId",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "address[]",
              "name": "signers",
              "type": "address[]"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "tokenName",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "tokenSymbol",
              "type": "string"
          }
      ],
      "name": "TransactionQueued",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "TX_ID",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "USDC_ADDRESS",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_txId",
              "type": "uint256"
          }
      ],
      "name": "executeCreateMemecoin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getTokenArray",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "txId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                  },
                  {
                      "internalType": "address[]",
                      "name": "signers",
                      "type": "address[]"
                  },
                  {
                      "internalType": "bool",
                      "name": "isPending",
                      "type": "bool"
                  },
                  {
                      "internalType": "string",
                      "name": "tokenName",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "tokenSymbol",
                      "type": "string"
                  },
                  {
                      "internalType": "uint256",
                      "name": "totalSupply",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "maxSupply",
                      "type": "uint256"
                  },
                  {
                      "internalType": "bool",
                      "name": "canMint",
                      "type": "bool"
                  },
                  {
                      "internalType": "bool",
                      "name": "canBurn",
                      "type": "bool"
                  },
                  {
                      "internalType": "bool",
                      "name": "supplyCapEnabled",
                      "type": "bool"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenAddress",
                      "type": "address"
                  },
                  {
                      "internalType": "string",
                      "name": "ipfsHash",
                      "type": "string"
                  }
              ],
              "internalType": "struct FactoryTokenContract.TxData[]",
              "name": "",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_txId",
              "type": "uint256"
          }
      ],
      "name": "getTxData",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "txId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                  },
                  {
                      "internalType": "address[]",
                      "name": "signers",
                      "type": "address[]"
                  },
                  {
                      "internalType": "bool",
                      "name": "isPending",
                      "type": "bool"
                  },
                  {
                      "internalType": "string",
                      "name": "tokenName",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "tokenSymbol",
                      "type": "string"
                  },
                  {
                      "internalType": "uint256",
                      "name": "totalSupply",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "maxSupply",
                      "type": "uint256"
                  },
                  {
                      "internalType": "bool",
                      "name": "canMint",
                      "type": "bool"
                  },
                  {
                      "internalType": "bool",
                      "name": "canBurn",
                      "type": "bool"
                  },
                  {
                      "internalType": "bool",
                      "name": "supplyCapEnabled",
                      "type": "bool"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenAddress",
                      "type": "address"
                  },
                  {
                      "internalType": "string",
                      "name": "ipfsHash",
                      "type": "string"
                  }
              ],
              "internalType": "struct FactoryTokenContract.TxData",
              "name": "",
              "type": "tuple"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "liquidityManager",
      "outputs": [
          {
              "internalType": "contract LiquidityManager",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "multiSigContract",
      "outputs": [
          {
              "internalType": "contract MultiSigContract",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "owner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "ownerToTxId",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address[]",
              "name": "_signers",
              "type": "address[]"
          },
          {
              "internalType": "address",
              "name": "_owner",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "_tokenName",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "_tokenSymbol",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "_totalSupply",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_maxSupply",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "_canMint",
              "type": "bool"
          },
          {
              "internalType": "bool",
              "name": "_canBurn",
              "type": "bool"
          },
          {
              "internalType": "bool",
              "name": "_supplyCapEnabled",
              "type": "bool"
          },
          {
              "internalType": "string",
              "name": "_ipfsHash",
              "type": "string"
          }
      ],
      "name": "queueCreateMemecoin",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "txId",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "txArray",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "txId",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "internalType": "bool",
              "name": "isPending",
              "type": "bool"
          },
          {
              "internalType": "string",
              "name": "tokenName",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "tokenSymbol",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "totalSupply",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "maxSupply",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "canMint",
              "type": "bool"
          },
          {
              "internalType": "bool",
              "name": "canBurn",
              "type": "bool"
          },
          {
              "internalType": "bool",
              "name": "supplyCapEnabled",
              "type": "bool"
          },
          {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "ipfsHash",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_liquidityManager",
              "type": "address"
          }
      ],
      "name": "updateLiquidityManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
]
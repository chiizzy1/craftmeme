'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { FACTORY_TOKEN_CONTRACT_ABI, FACTORY_TOKEN_CONTRACT_ADDRESS } from '@/constants';

export function useCreateToken() {

    const { data: hash, isPending, writeContract, writeContractAsync } = useWriteContract()

    const {
        isLoading: isConfirming,
        error,
        isSuccess: isConfirmed,
        data: contractData
    } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isConfirming) {
            toast.loading("Transaction Pending", {
                id: "tx-toast"
            });
        }
        if (isConfirmed) {
            toast.dismiss("tx-toast");
            toast.success("Transaction Successful", {
                action: {
                    label: "View on Etherscan",
                    onClick: () => {
                        window.open(`https://sepolia.etherscan.io/tx/${hash}`);
                    },
                },
            });
            console.log('success data: ', contractData)
        }
        if (error) {
            toast.dismiss("tx-toast");
            toast.error("Transaction Failed");
        }
    }, [isConfirming, isConfirmed, error, hash]);

    const createToken = async (params: {
        signers: string[]
        owner: string
        name: string
        symbol: string
        totalSupply: bigint
        maxSupply: bigint
        canMint: boolean
        canBurn: boolean
        supplyCapEnabled: boolean
        ipfsHash: string
    }) => {
        try {
            const contract = await writeContractAsync({
                address: FACTORY_TOKEN_CONTRACT_ADDRESS,
                abi: FACTORY_TOKEN_CONTRACT_ABI,
                functionName: 'queueCreateMemecoin',
                args: [
                    params.signers,
                    params.owner,
                    params.name,
                    params.symbol,
                    params.totalSupply,
                    params.maxSupply,
                    params.canMint,
                    params.canBurn,
                    params.supplyCapEnabled,
                    params.ipfsHash
                ],
            })
            return contract
        } catch (error) {
            toast.error('Failed to create token', {
                description: error instanceof Error ? error.message : 'Unknown error occurred',
            })
        }
    }

    return {
        createToken,
        isPending,
        isConfirming,
        isConfirmed,
    }
}
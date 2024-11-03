'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { MULTI_SIG_CONTRACT_ABI, MULTI_SIG_CONTRACT_ADDRESS } from '@/constants';

export function useSignWallet() {

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

    const sign = async (params: {
        txId: any
    }) => {
        console.log('txid: ', params.txId)
        try {
            const contract = await writeContractAsync({
                address: MULTI_SIG_CONTRACT_ADDRESS,
                abi: MULTI_SIG_CONTRACT_ABI,
                functionName: 'signTx',
                args: [BigInt(params.txId)],
            })
            return contract
        } catch (error) {
            toast.error('Failed to create token', {
                description: error instanceof Error ? error.message : 'Unknown error occurred',
            })
        }
    }

    return {
        sign,
        isPending,
        isConfirming,
        isConfirmed,
    }
}
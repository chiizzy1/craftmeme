import { FACTORY_TOKEN_CONTRACT_ABI, FACTORY_TOKEN_CONTRACT_ADDRESS } from '@/constants';
import { useReadContract } from 'wagmi';

export function useGetTokenDetails(id: any) {
    const { data: token, isSuccess: tokenFetched, isLoading: fetchingToken } = useReadContract({
        address: FACTORY_TOKEN_CONTRACT_ADDRESS,
        abi: FACTORY_TOKEN_CONTRACT_ABI,
        functionName: "getTxData",
        args: [BigInt(id)]
    });


    return {
        fetchingToken, tokenFetched, token
    }
}
import { FACTORY_TOKEN_CONTRACT_ABI, FACTORY_TOKEN_CONTRACT_ADDRESS } from '@/constants';
import { useReadContract } from 'wagmi';

export function useGetTokenArray() {
    const { data: allTokens, isSuccess: tokensFetched, isLoading: fetchingTokens } = useReadContract({
        address: FACTORY_TOKEN_CONTRACT_ADDRESS,
        abi: FACTORY_TOKEN_CONTRACT_ABI,
        functionName: "getTokenArray",
    });


    return {
        fetchingTokens, tokensFetched, allTokens
    }
}
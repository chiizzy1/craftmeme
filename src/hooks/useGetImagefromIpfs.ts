export default async function retrieveFromIPFS(requestId: string) {
    const myHeaders = new Headers();
    if (!process.env.NEXT_PUBLIC_QUICKNODE_API_KEY) {
        throw new Error("QuickNode API key is not defined");
    }
    myHeaders.append("x-api-key", process.env.NEXT_PUBLIC_QUICKNODE_API_KEY);

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow' as RequestRedirect
    };

    try {
        const response = await fetch(`https://api.quicknode.com/ipfs/rest/v1/pinning/${requestId}`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Retrieval successful:", result);
        return result?.cid ? result.cid : '';

    } catch (error) {
        console.error("Retrieval failed:", error);
        throw error;
    }
}
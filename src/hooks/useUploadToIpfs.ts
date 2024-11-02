export default async function uploadToIPFS(fileInput: any) {

    console.log('fileInput :', fileInput)
    if (!fileInput) {
        throw new Error("No file selected");
    }

    const myHeaders = new Headers();
    if (!process.env.NEXT_PUBLIC_QUICKNODE_API_KEY) {
        throw new Error("QuickNode API key is not defined");
    }
    myHeaders.append("x-api-key", process.env.NEXT_PUBLIC_QUICKNODE_API_KEY);

    const formdata = new FormData();
    formdata.append("Body", fileInput, fileInput.name);
    formdata.append("Key", fileInput.name);
    formdata.append("ContentType", fileInput.type);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow' as RequestRedirect
    };

    try {
        const response = await fetch("https://api.quicknode.com/ipfs/rest/v1/s3/put-object", requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
}
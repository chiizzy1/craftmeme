"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Spinner from "@/components/ui/Spinner";
import retrieveFromIPFS from "@/hooks/useGetImagefromIpfs";
import { useGetTokenDetails } from "@/hooks/useGetTokenDetails";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TokenDetailsPage() {
  const { tokenId } = useParams();
  const [tokenDetails, setTokenDetails] = useState<any>({});
  const [ipfsCid, setIpfsCid] = useState<string>("");
  const { fetchingToken, tokenFetched, token } = useGetTokenDetails(tokenId);

  useEffect(() => {
    if (tokenFetched) {
      setTokenDetails(token as any);
      console.log("token: ", token);
    }
  }, [tokenFetched, token]);

  useEffect(() => {
    if (tokenDetails?.ipfsHash) {
      fetchIpfsCid(tokenDetails.ipfsHash);
    }
  }, [tokenDetails?.ipfsHash]);

  const fetchIpfsCid = async (ipfsHash: string) => {
    try {
      const cid = await retrieveFromIPFS(ipfsHash);
      setIpfsCid(cid);
    } catch (error) {
      console.error("Error fetching IPFS:", error);
    }
  };

  if (fetchingToken) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Generate a random number between 200 and 400
  const randomNumber = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
  const imageUrl = `https://picsum.photos/${randomNumber}`;

  return (
    <main className="py-[200px]">
      <div className="container max-w-5xl mx-auto w-full relative">
        {tokenDetails && (
          <Card className="w-full bg-card">
            <CardHeader className="space-y-2">
              <div className="flex items-start gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border shrink-0">
                  <Image
                    src={ipfsCid.length > 1 ? `https://quicknode.quicknode-ipfs.com/ipfs/${ipfsCid}` : imageUrl}
                    alt={tokenDetails.tokenName}
                    fill
                    className="object-cover"
                    sizes="96px"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{tokenDetails.tokenName}</h1>
                  <p className="text-xl text-muted-foreground">{tokenDetails.tokenSymbol}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Token Details</h2>
                    <div className="space-y-2">
                      <p>
                        <span className="text-muted-foreground">Total Supply:</span>
                        {tokenDetails.totalSupply ? tokenDetails.totalSupply.toString() : "0"}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Max Supply:</span>
                        {tokenDetails.maxSupply ? tokenDetails.maxSupply.toString() : "0"}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Owner:</span> {tokenDetails.owner}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Token Address:</span> {tokenDetails.tokenAddress}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Status:</span> {tokenDetails.isPending ? "Pending" : "Confirmed"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Link href={`/token/signers/${tokenId}`}>
                      <Button>Multisig Signature</Button>
                    </Link>
                    <Link href={`/token/liquidity/${tokenId}`}>
                      <Button>Add Liquidity</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

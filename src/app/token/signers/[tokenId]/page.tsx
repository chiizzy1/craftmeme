"use client";

import { ArrowLeft, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTokenDetails } from "@/hooks/useGetTokenDetails";
import Spinner from "@/components/ui/Spinner";
import { useSignWallet } from "@/hooks/useSignWallet";
import { useAccount } from "wagmi";
import { toast } from "sonner";

export default function TokenSigners() {
  const { isConnected } = useAccount();
  const { tokenId } = useParams();
  const [signers, setSigners] = useState<any>([]);
  const [tokenDetails, setTokenDetails] = useState<any>({});
  const { fetchingToken, tokenFetched, token } = useGetTokenDetails(tokenId);
  const { sign, isConfirmed, isConfirming, isPending } = useSignWallet();

  const handleSign = async () => {
    if (!isConnected) {
      toast.error("Wallet isn't connected, Please connect your wallet!");
      return;
    }

    try {
      if (tokenDetails.txId) {
        console.log(`Transaction ID: ${tokenDetails.txId.toString()}`);
        await sign({ txId: tokenDetails.txId.toString() });
      }
    } catch (error) {
      toast.error("Failed to create token", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  const handleDeploy = async () => {
    if (!isConnected) {
      toast.error("Wallet isn't connected, Please connect your wallet!");
      return;
    }

    try {
      
    } catch (error) {
      toast.error("Failed to create token", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });}
  }

  useEffect(() => {
    if (tokenFetched) {
      setTokenDetails(token as any);
    }
  }, [tokenFetched, token]);

  if (fetchingToken) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <main className="py-[200px]">
      <div className="container max-w-5xl mx-auto w-full relative space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/token/${tokenId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Token Signers</h1>
        </div>

        <Card className="bg-zinc-900 text-white border-zinc-800">
          <CardHeader>
            <CardTitle>Required Signatures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tokenDetails.signers ? (
              tokenDetails.signers.map((signer: string, index: number) => (
                <div key={signer} className="flex items-center justify-between p-4 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">{index + 1}</div>
                    <div className="font-mono text-sm">{signer}</div>
                  </div>

                  <Button onClick={handleSign} disabled={isConfirming}>
                    {isConfirming && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Sign
                  </Button>
                </div>
              ))
            ) : (
              <div>No signers available</div>
            )}

            <Button onClick={handleDeploy} disabled={isConfirming} size="lg">
              {isConfirming && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Deploy your Contract
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

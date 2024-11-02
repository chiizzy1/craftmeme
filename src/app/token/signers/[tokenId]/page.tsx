"use client";

import { ArrowLeft, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockSigners = [
  {
    address: "0x301C96eC196fB6E1FE8B7eb777F317E5261B37eB",
    hasSigned: true,
  },
  {
    address: "0x8b09520549fAf8B64B3E421A89465544619C388",
    hasSigned: false,
  },
  {
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    hasSigned: false,
  },
];

export default function TokenSigners() {
  const { tokenId } = useParams();
  const [signers, setSigners] = useState(mockSigners);
  const [isSigningInProgress, setIsSigningInProgress] = useState(false);

  const handleSign = async (address: string) => {
    setIsSigningInProgress(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSigners((prevSigners) =>
      prevSigners.map((signer) => (signer.address === address ? { ...signer, hasSigned: true } : signer))
    );
    setIsSigningInProgress(false);
  };

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
            {signers.map((signer, index) => (
              <div key={signer.address} className="flex items-center justify-between p-4 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">{index + 1}</div>
                  <div className="font-mono text-sm">{signer.address}</div>
                </div>
                {signer.hasSigned ? (
                  <div className="flex items-center text-green-500">
                    <Check className="w-5 h-5 mr-2" />
                    Signed
                  </div>
                ) : (
                  <Button onClick={() => handleSign(signer.address)} disabled={isSigningInProgress}>
                    {isSigningInProgress && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Sign
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

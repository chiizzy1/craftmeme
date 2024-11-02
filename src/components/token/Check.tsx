"use client";

import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const mockTokenData = {
  name: "Based Pepe",
  symbol: "PEPE",
  totalSupply: "10",
  maxSupply: "1997",
  owner: "0x8b09520549fAf8B64B3E421A89465544619C388",
  tokenAddress: "0x0000000000000000000000000000000000000000",
  status: "Pending",
  imageUrl: "/placeholder.svg",
  signers: [
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
  ],
  liquidityProgress: 30,
};

export default function Component() {
  const [isSigningInProgress, setIsSigningInProgress] = useState(false);
  const [liquidityAmount, setLiquidityAmount] = useState("");

  const handleSign = async (address: string) => {
    setIsSigningInProgress(true);
    // Simulate signing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSigningInProgress(false);
  };

  const handleAddLiquidity = async () => {
    if (!liquidityAmount) return;
    // Handle liquidity addition here
    console.log("Adding liquidity:", liquidityAmount);
    setLiquidityAmount("");
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Token Details</TabsTrigger>
          <TabsTrigger value="signers">Signers</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <img src={mockTokenData.imageUrl} alt={mockTokenData.name} className="w-16 h-16 rounded-full" />
              <div>
                <CardTitle>{mockTokenData.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{mockTokenData.symbol}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="text-sm font-medium">Total Supply</div>
                <div className="text-lg">{mockTokenData.totalSupply}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-medium">Max Supply</div>
                <div className="text-lg">{mockTokenData.maxSupply}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-medium">Owner</div>
                <div className="text-sm font-mono break-all">{mockTokenData.owner}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-medium">Token Address</div>
                <div className="text-sm font-mono break-all">{mockTokenData.tokenAddress}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-medium">Status</div>
                <div className="text-sm">{mockTokenData.status}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signers">
          <Card>
            <CardHeader>
              <CardTitle>Required Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTokenData.signers.map((signer, index) => (
                <div key={signer.address} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">{index + 1}</div>
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
        </TabsContent>

        <TabsContent value="liquidity">
          <Card>
            <CardHeader>
              <CardTitle>Add Liquidity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Current Liquidity Progress</div>
                  {/* <Progress value={mockTokenData.liquidityProgress} /> */}

                  <div className="w-full h-[6px] md:h-[8px] rounded-[15px] bg-slate-400">
                    <div className="h-full bg-primary rounded-[15px]" style={{ width: `${mockTokenData.liquidityProgress}%` }} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {mockTokenData.liquidityProgress}% of required liquidity added
                  </div>
                </div>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={liquidityAmount}
                    onChange={(e) => setLiquidityAmount(e.target.value)}
                  />
                  <Button onClick={handleAddLiquidity}>Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

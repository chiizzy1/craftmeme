"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const mockLiquidityData = {
  currentLiquidity: 30,
  requiredLiquidity: 100,
};

export default function TokenLiquidity() {
  const { tokenId } = useParams();
  const [liquidityAmount, setLiquidityAmount] = useState("");
  const [currentLiquidity, setCurrentLiquidity] = useState(mockLiquidityData.currentLiquidity);

  const handleAddLiquidity = async () => {
    if (!liquidityAmount) return;
    const amount = parseFloat(liquidityAmount);
    if (isNaN(amount)) return;

    setCurrentLiquidity((prev) => Math.min(prev + amount, mockLiquidityData.requiredLiquidity));
    setLiquidityAmount("");
  };

  const liquidityPercentage = (currentLiquidity / mockLiquidityData.requiredLiquidity) * 100;

  return (
    <main className="py-[200px]">
      <div className="container max-w-5xl mx-auto w-full relative">
        <div className="flex items-center gap-4">
          <Link href={`/token/${tokenId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Manage Liquidity</h1>
        </div>

        <Card className="bg-zinc-900 text-white border-zinc-800">
          <CardHeader>
            <CardTitle>Add Liquidity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Current Liquidity Progress</div>
                {/* <Progress value={liquidityPercentage} className="h-2" /> */}
                <div className="w-full h-[6px] md:h-[8px] rounded-[15px] bg-slate-400">
                  <div className="h-full bg-primary rounded-[15px]" style={{ width: `${liquidityPercentage}%` }} />
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentLiquidity} / {mockLiquidityData.requiredLiquidity} required liquidity added (
                  {liquidityPercentage.toFixed(2)}%)
                </div>
              </div>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={liquidityAmount}
                  onChange={(e) => setLiquidityAmount(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                <Button onClick={handleAddLiquidity}>Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

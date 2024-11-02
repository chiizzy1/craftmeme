"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Coins, Flame, Lock } from "lucide-react";
import { Badge } from "../ui/badge";
import retrieveFromIPFS from "@/hooks/useGetImagefromIpfs";

interface CardComProps {
  data: any;
}

const CardCom: FC<CardComProps> = ({ data }) => {
  const [ipfsCid, setIpfsCid] = useState<string>("");

  // get image from Ipfs
  useEffect(() => {
    const fetchIpfsCid = () => {
      if (data.ipfsHash) {
        retrieveFromIPFS(data.ipfsHash)
          .then((cid) => setIpfsCid(cid))
          .catch((error) => console.error("Error fetching IPFS:", error));
      }
    };

    fetchIpfsCid();
  }, [data.ipfsHash]);

  // Generate a random number between 200 and 400
  const randomNumber = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
  const imageUrl = `https://picsum.photos/${randomNumber}`;

  // If data is undefined, use default values
  const {
    isPending = false,
    tokenName = "Unknown Token",
    tokenSymbol = "???",
    totalSupply = 0,
    maxSupply = 0,
    canMint = false,
    canBurn = false,
    supplyCapEnabled = false,
  } = data || {};

  // Calculate supply percentage
  const supplyPercentage = supplyCapEnabled && maxSupply > 0 ? Math.round((Number(totalSupply) / Number(maxSupply)) * 100) : 0;

  return (
    <Card className="w-full max-w-md bg-card hover:bg-card/80 transition-colors">
      <CardHeader className="space-y-2">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-border shrink-0">
            <Image
              src={ipfsCid.length > 1 ? `https://quicknode.quicknode-ipfs.com/ipfs/${ipfsCid}` : imageUrl}
              alt={data.tokenName}
              fill
              className="object-cover"
              sizes="64px"
              priority
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">{data.tokenName || tokenName}</h2>
                <p className="text-muted-foreground">{data.tokenSymbol || tokenSymbol}</p>
              </div>
              <div className="flex gap-2">
                {data.canMint && (
                  <Badge variant="outline" className="bg-primary/10">
                    <Coins className="w-3 h-3 mr-1" />
                    Mintable
                  </Badge>
                )}
                {data.canBurn && (
                  <Badge variant="outline" className="bg-destructive/10">
                    <Flame className="w-3 h-3 mr-1" />
                    Burnable
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Supply</p>
            <p className="font-medium">{data.totalSupply?.toString() || totalSupply}</p>
          </div>
          {data.supplyCapEnabled && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Max Supply</p>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <p className="font-medium">{data.maxSupply?.toString() || maxSupply}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">Status</p>
            <p>{data.isPending ? "Pending Signatures" : "Confirmed"}</p>
          </div>
          <div className="w-full h-[6px] md:h-[8px] rounded-[15px] bg-slate-400">
            <div className="h-full bg-primary rounded-[15px]" style={{ width: `${supplyPercentage}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardCom;

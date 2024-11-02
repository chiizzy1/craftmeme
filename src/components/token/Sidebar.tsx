/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CheckCircle, ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";

interface SidebarProps {}

const quickAmounts = ["reset", "0.1 SOL", "0.5 SOL", "1 SOL"];

const tokenInfo = [
  { label: "Creator", value: "J3hPE...Xu1V" },
  { label: "ZZA", value: "6cGe4...Cxgw" },
  { label: "Bonding curve", value: "67xkv...nFL3" },
  { label: "Migration DEX", value: "Meteora", icon: "" },
];

const metrics = [
  { icon: "🚀", value: 73 },
  { icon: "🔥", value: 3 },
  { icon: "💩", value: 71 },
  { icon: "🚩", value: 85 },
];

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <div className="flex flex-col">
      <div className="w-full max-w-sm mx-auto p-4 space-y-4 bg-background rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-2">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-primary-foreground">Buy</Button>
          <Button variant="secondary" className="w-full bg-muted text-muted-foreground hover:bg-muted/80">
            Sell
          </Button>
        </div>

        <div className="flex justify-between text-xs">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary p-0 h-auto">
            switch to Equinox
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary p-0 h-auto">
            Set max slippage
          </Button>
        </div>

        <div className="relative">
          <Input type="text" placeholder="0.0" className="pr-20 bg-background border-muted text-right text-lg" />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-primary mr-2">SOL</span>
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
              S
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          {quickAmounts.map((amount, index) => (
            <Button
              key={amount}
              variant="ghost"
              size="sm"
              className={`text-xs px-1 sm:px-2 py-1 h-auto ${
                index === 0 ? "text-muted-foreground" : "text-primary"
              } hover:text-primary hover:bg-transparent`}
            >
              {amount}
            </Button>
          ))}
        </div>

        <Button className="w-full bg-green-500 hover:bg-green-600 text-primary-foreground">place trade</Button>
      </div>

      {/* More Info */}
      <div className="w-full max-w-md mx-auto bg-background text-foreground rounded-lg shadow-md p-4 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <h2 className="text-sm font-medium">Token created</h2>
          <span className="text-sm text-muted-foreground">16h 8m ago</span>
        </div>
        <div className="space-y-3">
          {tokenInfo.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <div className="flex items-center space-x-2">
                {item.icon ? <Image src={item.icon} alt={item.label} className="w-5 h-5" /> : null}
                <span className="font-medium">{item.value}</span>
                {item.value !== "Meteora" && (
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0.5">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Expand</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
          <span className="font-medium">Audit</span>
          <Button variant="ghost" className="h-8 px-2 text-green-500 hover:text-green-400 hover:bg-green-500/10">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>No issues</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* User react */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 max-w-3xl mx-auto">
        {metrics.map(({ icon, value }, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-card text-card-foreground rounded-lg p-4 aspect-square"
          >
            <span className="text-2xl mb-2">{icon}</span>
            <span className="text-xl font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

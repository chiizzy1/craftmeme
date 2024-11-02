"use client";

import { FC, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { truncateAddress } from "@/lib/utils";

// Mock data for top profitable users
const topUsers = [
  { id: 1, wallet: "0x1234...5678", transactions: 156, profit: 2345.67 },
  { id: 2, wallet: "0xabcd...efgh", transactions: 98, profit: 1987.54 },
  { id: 3, wallet: "0x9876...5432", transactions: 78, profit: 1654.32 },
  { id: 4, wallet: "0xijkl...mnop", transactions: 65, profit: 1432.1 },
  { id: 5, wallet: "0xqrst...uvwx", transactions: 54, profit: 1198.76 },
];

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  const filteredUsers = topUsers.filter((user) => user.wallet.toLowerCase().includes(searchTerm.toLowerCase()));

  const copyToClipboard = async (wallet: string) => {
    try {
      await navigator.clipboard.writeText(wallet);
      setCopiedWallet(wallet);

      toast.success("Wallet address copied to clipboard.");
      setTimeout(() => setCopiedWallet(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy wallet address.");
    }
  };

  return (
    <section className="py-[100px]">
      <div className="container max-w-5xl mx-auto w-full relative">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Top Profitable Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search by wallet address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="w-[300px] text-muted-foreground">Wallet Address</TableHead>
                    <TableHead className="text-muted-foreground">Transactions</TableHead>
                    <TableHead className="text-muted-foreground">Profit (USD)</TableHead>
                    <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-b border-border">
                      <TableCell className="font-medium">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => copyToClipboard(user.wallet)}
                                className="flex items-center space-x-2 hover:text-primary transition-colors"
                              >
                                <span>{truncateAddress(user.wallet)}</span>
                                {copiedWallet === user.wallet ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click to copy wallet address</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>{user.transactions}</TableCell>
                      <TableCell>${user.profit.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        >
                          Track User
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;

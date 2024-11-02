/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { useState, useRef, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink, Filter, Loader2 } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC } from "react";

interface TradingAnalyticsProps {}

// Simulated API calls
const fetchTransactions = async ({ pageParam = 0 }) => {
  // Simulated delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    data: [
      {
        date: `${pageParam * 3 + 2}m ago`,
        type: "Buy",
        usd: 26.58,
        zza: 1191678,
        sol: 0.1479,
        price: 0.00002236,
        maker: "SaltoK",
      },
      {
        date: `${pageParam * 3 + 5}m ago`,
        type: "Sell",
        usd: 24.67,
        zza: 1108673,
        sol: 0.1376,
        price: 0.0000222,
        maker: "4PTnmi",
      },
      {
        date: `${pageParam * 3 + 7}m ago`,
        type: "Buy",
        usd: 49.73,
        zza: 2238037,
        sol: 0.2771,
        price: 0.00002232,
        maker: "Zpyjp6",
      },
    ],
    nextPage: pageParam + 1,
    hasMore: pageParam < 3, // Simulated end of data
  };
};

const fetchTopTraders = async ({ pageParam = 0 }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    data: [
      {
        rank: `#${pageParam * 3 + 1}`,
        maker: "Ati...njN",
        bought: 1323,
        sold: 1764,
        pnl: 441,
        unrealized: 0.1,
        balance: "0 of 121.8M",
        txns: 24,
      },
      {
        rank: `#${pageParam * 3 + 2}`,
        maker: "Hb1...gvY",
        bought: 541,
        sold: 911,
        pnl: 370,
        unrealized: 0.1,
        balance: "1.33 of 48.5M",
        txns: 6,
      },
      {
        rank: `#${pageParam * 3 + 3}`,
        maker: "94c...Vd4",
        bought: 741,
        sold: 1080,
        pnl: 338,
        unrealized: 0.1,
        balance: "0 of 56.7M",
        txns: 7,
      },
    ],
    nextPage: pageParam + 1,
    hasMore: pageParam < 3, // Simulated end of data
  };
};

const holdersData = [
  { rank: "#1", address: "67x...FL3", percentage: 40.61, amount: "406.1M / 999.9M", value: 9357, txns: 0 },
  { rank: "#2", address: "J3h...u1V", percentage: 5.47, amount: "54.7M / 999.9M", value: 1260, txns: 0 },
  { rank: "#3", address: "HCP...y4w", percentage: 5.23, amount: "52.3M / 999.9M", value: 1205, txns: 0 },
];

const useIntersectionObserver = (callback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);

  return useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) callback();
      });
      if (node) observer.current.observe(node);
    },
    [callback]
  );
};

const TradingAnalytics: FC<TradingAnalyticsProps> = ({}) => {
  const [activeTab, setActiveTab] = useState("transactions");

  const {
    data: transactionsData,
    fetchNextPage: fetchNextTransactions,
    hasNextPage: hasNextTransactions,
    isFetchingNextPage: isFetchingNextTransactions,
  } = useInfiniteQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    initialPageParam: 0,
  });

  const {
    data: topTradersData,
    fetchNextPage: fetchNextTopTraders,
    hasNextPage: hasNextTopTraders,
    isFetchingNextPage: isFetchingNextTopTraders,
  } = useInfiniteQuery({
    queryKey: ["topTraders"],
    queryFn: fetchTopTraders,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    initialPageParam: 0,
  });

  const transactionsEndRef = useIntersectionObserver(() => {
    if (hasNextTransactions) fetchNextTransactions();
  });

  const topTradersEndRef = useIntersectionObserver(() => {
    if (hasNextTopTraders) fetchNextTopTraders();
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <TabsList className="mb-2 sm:mb-0">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="topTraders">Top Traders</TabsTrigger>
          <TabsTrigger value="holders">Holders (75)</TabsTrigger>
        </TabsList>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TabsContent value="transactions">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>USD</TableHead>
                <TableHead>ZZA</TableHead>
                <TableHead>SOL</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Maker</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData?.pages.map((page, pageIndex) =>
                page.data.map((transaction, index) => (
                  <TableRow key={`${pageIndex}-${index}`}>
                    <TableCell className="whitespace-nowrap">{transaction.date}</TableCell>
                    <TableCell className={transaction.type === "Buy" ? "text-green-500" : "text-red-500"}>
                      {transaction.type}
                    </TableCell>
                    <TableCell>{transaction.usd.toFixed(2)}</TableCell>
                    <TableCell>{transaction.zza.toLocaleString()}</TableCell>
                    <TableCell>{transaction.sol.toFixed(4)}</TableCell>
                    <TableCell>${transaction.price.toFixed(8)}</TableCell>
                    <TableCell>{transaction.maker}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {isFetchingNextTransactions && (
          <div className="flex justify-center items-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        <div ref={transactionsEndRef} />
      </TabsContent>

      <TabsContent value="topTraders">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Maker</TableHead>
                <TableHead>Bought</TableHead>
                <TableHead>Sold</TableHead>
                <TableHead>PNL</TableHead>
                <TableHead>Unrealized</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>TXNS</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topTradersData?.pages.map((page, pageIndex) =>
                page.data.map((trader, index) => (
                  <TableRow key={`${pageIndex}-${index}`}>
                    <TableCell>{trader.rank}</TableCell>
                    <TableCell>{trader.maker}</TableCell>
                    <TableCell className="text-red-500">${trader.bought}</TableCell>
                    <TableCell className="text-green-500">${trader.sold}</TableCell>
                    <TableCell className="text-green-500">${trader.pnl}</TableCell>
                    <TableCell>${trader.unrealized}</TableCell>
                    <TableCell>{trader.balance}</TableCell>
                    <TableCell>{trader.txns}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {isFetchingNextTopTraders && (
          <div className="flex justify-center items-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        <div ref={topTradersEndRef} />
      </TabsContent>

      <TabsContent value="holders">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>%</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>TXNS</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdersData.map((holder, index) => (
                <TableRow key={index}>
                  <TableCell>{holder.rank}</TableCell>
                  <TableCell>{holder.address}</TableCell>
                  <TableCell>{holder.percentage}%</TableCell>
                  <TableCell>{holder.amount}</TableCell>
                  <TableCell>${holder.value}</TableCell>
                  <TableCell>{holder.txns}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TradingAnalytics;

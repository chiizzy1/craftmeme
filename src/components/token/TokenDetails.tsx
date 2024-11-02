"use client";

import { FC } from "react";
import Sidebar from "./Sidebar";
import TradingAnalytics from "./TradingAnalytics";

interface TokenDetailsProps {
  id: string;
}

const TokenDetails: FC<TokenDetailsProps> = ({ id }) => {
  return (
    <section className="py-[200px]">
      <div className="container mx-auto w-full relative">
        <div className="flex">
          <div className="basis-4/6 flex flex-col">
            <div className="border border-primary h-[250px] w-full">chart {id}</div>
            <TradingAnalytics />
          </div>
          <div className="basis-2/6">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenDetails;

"use client";

import { memes } from "@/constants";
import { FC, useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGetTokenArray } from "@/hooks/useGetTokenArray";
import Spinner from "../ui/Spinner";
import CardCom from "./Card";

interface MemeGridProps {}

const MemeGrid: FC<MemeGridProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(memes.length / itemsPerPage);
  const [tokens, setTokens] = useState<any[]>([]);

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tokens.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const { fetchingTokens, tokensFetched, allTokens } = useGetTokenArray();

  useEffect(() => {
    if (tokensFetched) {
      setTokens(allTokens as any[]);
      console.log("tokens: ", allTokens);
    }
  }, [tokensFetched, allTokens]);

  if (fetchingTokens) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="">
      <div className="container mx-auto w-full relative">
        <h2 className="text-4xl font-bold text-foreground">Trade Now</h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.length > 0 ? (
            getCurrentItems().map((token) => (
              <Link key={token.txId} href={`/token/${token.txId}`}>
                <CardCom data={token} />
              </Link>
            ))
          ) : (
            <div>
              <span>No tokens to display, please create a token!</span>{" "}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 pt-8">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            variant="outline"
            className="bg-primary-foreground hover:bg-secondary"
          >
            Previous
          </Button>

          <span className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            className="bg-primary-foreground hover:bg-secondary"
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MemeGrid;

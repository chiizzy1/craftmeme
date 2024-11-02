/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import TrackWallet from "./TrackWallet";

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <section className="py-[200px]">
      <div className="container max-w-5xl mx-auto w-full relative">
        <div className="flex flex-col gap-[80px] w-full">
          <div className="flex flex-col items-center gap-[32px]">
            <h1 className="text-[42px] font-extrabold leading-[75.6px] tracking-[10%] font-detacher">
              Launch Your <span className="text-primary">MemeCoin</span> Securely
            </h1>
            <span className="text-[24px] leading-[43.2px] font-light tracking-[6%]">
              Create, provide liquidity, and trade with built-in rugpull protection
            </span>
            <Link href={"/create"}>
              <Button size="lg">
                Create Your MemeCoin <ArrowRight className="ml-2" />
              </Button>
            </Link>

            <TrackWallet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import Link from "next/link";
import { navLinks } from "@/constants";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { truncateAddress } from "@/lib/utils";
import { Button } from "./ui/button";
import { Logo } from "@/assets";
import Image from "next/image";

const Navbar = () => {
  const [stickyClass, setStickyClass] = useState<boolean>(false);
  const [active, setActive] = useState<string>("Home");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();

  const handleConnect = () => {
    open();
  };

  const stickNavbar = () => {
    if (window !== undefined) {
      if (window.scrollY > 100) {
        setStickyClass(true);
      } else {
        setStickyClass(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50  ${
        stickyClass ? "bg-black/60 backdrop-blur-sm border-b border-slate-300 shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto w-full">
        <div className="flex w-full justify-between items-center py-4">
          <Link href="/">
            <Image src={Logo} width={40} height={40} className="rounded-lg" alt="logo" />
          </Link>

          <div className="hidden lg:flex items-center gap-[36px]">
            {navLinks.map(({ id, title, link }) => (
              <ul key={id}>
                <Link href={link} onClick={() => setActive(title)}>
                  <span
                    className={`text-[14px] leading-[14px] font-semibold font-laila ${
                      active === title ? "text-primary underline underline-offset-8" : "text-white"
                    }`}
                  >
                    {title}
                  </span>
                </Link>
              </ul>
            ))}
          </div>

          <Button className="uppercase hidden lg:block" onClick={handleConnect}>
            {!isConnected ? "Connect wallet" : truncateAddress(address!)}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center rounded-lg p-2"
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile menu */}
        {menuOpen ? (
          <div className="flex flex-col items-center gap-6 py-4 lg:hidden">
            <div className="flex flex-col items-center gap-4">
              {navLinks.map(({ id, title, link }) => (
                <ul key={id}>
                  <Link href={link} onClick={() => setActive(title)}>
                    <span
                      className={`text-[14px] leading-[14px] font-semibold font-laila ${
                        active === title ? "text-primary underline underline-offset-8" : "text-white"
                      }`}
                    >
                      {title}
                    </span>
                  </Link>
                </ul>
              ))}
            </div>

            <Button className="uppercase w-full" onClick={handleConnect}>
              {!isConnected ? "Connect wallet" : truncateAddress(address!)}
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;

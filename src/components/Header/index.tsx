"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

import { Container } from "../Container";

export function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;

    gsap.to(header, {
      backgroundColor: "white",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.08)",
      duration: 0.1,
      ease: "power4.out",
    });
  }, []);

  return (
    <>
      <header
        className={`relative top-0 w-full z-50 h-14 lg:h-20 flex items-center bg-white shadow-header"transition-all`}
        ref={headerRef}
      >
        <Container className="flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-blue-950">TODO LIST</Link>
        </Container>
      </header>
    </>
  );
}

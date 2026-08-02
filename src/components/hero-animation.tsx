"use client";

import { useRef, type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-gsap-reveal";

type HeroAnimationProps = {
  children: ReactNode;
};

export function HeroAnimation({ children }: HeroAnimationProps) {
  const ref = useScrollReveal<HTMLDivElement>({
    direction: "none",
    stagger: 0.12,
    duration: 0.7,
    start: "top 80%",
    disableOnMobile: false,
  });

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

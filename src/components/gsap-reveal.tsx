"use client";

import { useRef, type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-gsap-reveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "span" | "figure";
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
  disableOnMobile?: boolean;
};

export function Reveal({
  children,
  className,
  as: Tag = "div",
  direction = "up",
  distance = 40,
  duration = 0.8,
  delay = 0,
  start = "top 85%",
  once = true,
  disableOnMobile = true,
}: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>({
    direction,
    distance,
    duration,
    delay,
    start,
    once,
    disableOnMobile,
  });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

type StaggerGridProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  stagger?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
  duration?: number;
  start?: string;
  disableOnMobile?: boolean;
};

export function StaggerGrid({
  children,
  className,
  as: Tag = "div",
  stagger = 0.08,
  direction = "up",
  distance = 30,
  duration = 0.6,
  start = "top 85%",
  disableOnMobile = true,
}: StaggerGridProps) {
  const ref = useScrollReveal<HTMLDivElement>({
    direction,
    distance,
    duration,
    stagger,
    start,
    once: true,
    disableOnMobile,
  });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

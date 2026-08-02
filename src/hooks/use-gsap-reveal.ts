"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimDirection = "up" | "down" | "left" | "right" | "scale" | "none";

type RevealOptions = {
  direction?: AnimDirection;
  distance?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  markers?: boolean;
  toggleActions?: string;
  once?: boolean;
  scrub?: boolean | number;
  disableOnMobile?: boolean;
};

function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function useScrollReveal<T extends HTMLElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldReduceMotion()) return;

    const {
      direction = "up",
      distance = 40,
      duration = 0.8,
      stagger = 0,
      delay = 0,
      start = "top 85%",
      once = true,
    } = options;

    if (options.disableOnMobile && isMobile()) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    switch (direction) {
      case "up":
        fromVars.y = distance;
        break;
      case "down":
        fromVars.y = -distance;
        break;
      case "left":
        fromVars.x = distance;
        break;
      case "right":
        fromVars.x = -distance;
        break;
      case "scale":
        fromVars.scale = 0.95;
        break;
    }

    const targets = stagger
      ? Array.from(el.children)
      : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        fromVars,
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          stagger: stagger || undefined,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? "play none none none"
              : "play none none reset",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useGsapTimeline<T extends HTMLElement>(
  setupFn: (tl: gsap.core.Timeline, el: T) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldReduceMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      setupFn(tl, el);
    }, el);

    return () => ctx.revert();
  }, deps);

  return ref;
}

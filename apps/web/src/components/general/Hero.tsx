"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Globe, Lock, LucideIcon, Target, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

interface FeatureProps {
  label: string;
  Icon: LucideIcon;
}

const features: FeatureProps[] = [
  { label: "Private Rooms", Icon: Lock },
  { label: "Real-time Multiplayer", Icon: Users },
  { label: "Accuracy matters", Icon: Target },
  { label: "Global Leaderboard", Icon: Globe },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blurRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState<[number, number]>([0, 0]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!containerRef.current || !blurRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const blurRect = blurRef.current.getBoundingClientRect();

    const blurWidth = blurRect.width;
    const blurHeight = blurRect.height;

    
    let x = e.clientX - containerRect.left;
    let y = e.clientY - containerRect.top;

    x = Math.max(blurWidth / 2, Math.min(x, containerRect.width - blurWidth / 2));
    y = Math.max(blurHeight / 2, Math.min(y, containerRect.height - blurHeight / 2));

    setPosition([x, y]);
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex justify-center items-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Blur Div that follows mouse */}
      <motion.div
        ref={blurRef}
        className="-translate-1/2 ease-linear lg:w-[500px] w-[375px] aspect-square bg-orange-500/20 rounded-full blur-3xl absolute z-20 pointer-events-none duration-1000"
        style={{
          top: position[1],
          left: position[0],
        }}
        
      />

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center z-30">
        <div className="text-sm lg:text-lg mx-auto w-fit font-semibold border rounded-lg border-white/25 px-5 py-1.5 flex gap-4 items-center">
          571 Keyboard Warriors Online
          <div className="relative">
            <motion.div
              className="size-4 bg-orange-600/20 rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
            ></motion.div>

            <div className="size-2 bg-red-500 rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="mt-5 gap-1 lg:gap-3 max-w-4xl flex justify-center flex-col items-center">
          <h1 className="text-3xl lg:text-6xl font-semibold flex items-center gap-3 text-center">
            <span>
              Blaze.
              <span className="rounded-full block w-full h-[4px] bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-500" />
            </span>
            Compete.
            <span>
              Repeat.
              <span className="rounded-full block w-full h-[4px] bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500" />
            </span>
          </h1>

          <div className="text-center text-balance text-2xl lg:text-4xl font-semibold bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
            Compete in real-time battles and climb the global leaderboard.
          </div>
        </div>

        {/* Badges */}
        <div className="mt-5 grid lg:grid-cols-4 grid-cols-2 gap-5 justify-center">
          {features.map(({ label, Icon }, index) => (
            <div
              key={index}
              className={cn(
                "px-3 py-1.5 justify-center border bg-card/50 border-white/20 flex items-center gap-2 rounded-full text-xs lg:text-lg hover:scale-105 transition"
              )}
            >
              <Icon
                className={cn(
                  "size-4 font-semibold",
                  index % 2 !== 1 ? "text-orange-500" : "text-yellow-400"
                )}
              />
              {label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={"/"}
          className="mt-8 lg:text-xl px-5 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-yellow-500"
        >
          Start Typing
        </Link>
      </div>
    </div>
  );
}

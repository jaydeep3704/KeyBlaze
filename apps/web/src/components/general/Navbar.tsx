
"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Logo from "@/assets/logo-short.png"
import Image from "next/image"
import { Button, buttonVariants } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
export function Navbar() {

  return (
    <div className="fixed top-0 left-0 right-0 lg:px-0 px-4 z-100">
        <nav className="max-w-7xl mx-auto py-5 items-center flex justify-between ">
            <Link href={'/'} className="flex gap-2 lg:gap-4 shrink-0 items-center">
                <Image src={Logo} width={40} height={40} className="size-7 lg:size-8" alt="logo"/>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-wider mt-2">Key
                    <span className="text-orange-400">Blaze</span>
                </h1>
            </Link>
            <div className="flex gap-4">
             <Link href={'/singleplayer'} className={cn(buttonVariants({variant:"outline"}),"text-white hover:text-white")}>SinglePlayer</Link>
             <Link href={'/multiplayer'}  className={cn(buttonVariants({variant:"default"}),"bg-orange-400 hover:bg-orange-400/70 text-white hover:text-white")}>Multiplayer</Link>
            </div>        
        </nav>
    </div>
  )
}

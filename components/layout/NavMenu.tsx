/* eslint-disable react/jsx-no-undef */
"use client"

import * as React from "react"
import { BookOpenCheck, ChevronsUpDown, Hotel, Plus } from "lucide-react"
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavMenu() {
  // Utilisez useRouter pour obtenir l'objet de routeur
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Utilisez la méthode push pour rediriger vers "/hotel/new" */}
        <DropdownMenuItem onClick={() => router.push("/hotel/new")} className="cursor-pointer flex gap-2 items-center">
          <Plus size={15}/> <span>Add hotel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/my-hotels")} className="cursor-pointer flex gap-2 items-center">
          <Hotel size={15}/> <span>My Hotels</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/my-bookings")} className="cursor-pointer flex gap-2 items-center">
          <BookOpenCheck size={15}/> <span>My Bookings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
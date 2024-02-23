/* eslint-disable @next/next/no-img-element */
'use client'

import { UserButton, useAuth } from "@clerk/nextjs";
import Container from "../Container";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchInput from "../SearchInput";
import { ModeToggle } from "../ModeToggle";
import { NavMenu } from "./NavMenu";
 
export default function NavBar() {
  const router = useRouter()
  const {userId} = useAuth()

  return (
    <div className='sticky top-0 border border-b-primary/10 bg-secondary'>
      <Container>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1 cursor-pointer'>
            <img src='/logo.png' alt='logo' width="50" height="50" onClick={() => router.push("/")} />
            <div className='font-bold text-xl'>Mic</div>
          </div>
          <SearchInput />
          <div className='flex gap-3 items-center'>
            <div>
              {/* Dark Mode  */}
              <ModeToggle />
              <NavMenu />
            </div>
            {/* Le compte de l'utilisateur connecté */}
            <UserButton afterSignOutUrl="/" />
            {/* les bouto pour la redirection vers sign Page dans le cas où l'utilisateur n'est pas connecté*/}
            {!userId && (
              <>
                <Button variant='outline' size='sm' onClick={()=> router.push("/sign-in")}>
                  Sign in
                </Button>
                <Button size='sm' onClick={()=> router.push("/sign-up")}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
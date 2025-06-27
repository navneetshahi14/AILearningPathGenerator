import Link from "next/link"
import { Button } from "./ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Cog } from "lucide-react"

const Navbar = () => {
  return (
    <>
        <nav className=" h-screen lg:h-[8vh] w-[0%] lg:w-[80%] lg:rounded-full lg:bg-white/50 shadow-lg lg:mt-5 lg:px-10 lg:py-5 flex justify-between pb-10 lg:items-center flex-col lg:flex-row p-5 gap-28 overflow-hidden absolute top-0 left-0 z-[999] bg-white/90 lg:left-1/2 lg:right-1/2 lg:-translate-x-1/2 ">
            <div className="">
                <p className="lg:text-xl text-5xl font-semibold cursor-pointer">SkillRoute</p>
            </div>
            <div className="">
                <ul className="flex lg:flex-row flex-col lg:gap-8 text-3xl lg:text-xl gap-10">
                    <li className="lg:hover:scale-[1.2] cursor-pointer hover:translate-x-4 duration-75 transition-all  ease-in-out">
                        <Link href={'/'}>Home</Link>
                    </li>
                    <SignedOut>
                        <li className="lg:hover:scale-[1.2] cursor-pointer hover:translate-x-4 duration-75 transition-all  ease-in-out">About</li>
                    </SignedOut>
                    <SignedIn>
                        <li className="lg:hover:scale-[1.2] cursor-pointer hover:translate-x-4 duration-75 transition-all ease-in-out"><Link href={'/generatePage'} >Generate Path</Link></li>
                        <li className="lg:hover:scale-[1.2] cursor-pointer hover:translate-x-4 duration-75 transition-all ease-in-out"><Link href={'/Learnings'} >Learnings</Link></li>
                    </SignedIn>
                </ul>
            </div>
            <div className="flex gap-3 lg:flex-row flex-col justify-end items-center">
                <SignedIn>
                    <Link href={'/profile'}>
                        <Cog className="cursor-pointer font-extrabold " />
                    </Link>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <Button variant={'default'} className="cursor-pointer text-2xl lg:text-lg lg:rounded-full rounded-xl"><Link href={'/sign-in'}>Login</Link></Button>
                    <Button variant={'outline'} className="bg-white/50 border-black hover:bg-white cursor-pointer text-2xl lg:text-lg lg:rounded-full rounded-xl"><Link href={'/sign-up'}>SignUp</Link></Button>
                </SignedOut>
            </div>
        </nav>
    </>
  )
}

export default Navbar
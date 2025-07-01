'use client'
import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import WhySkillRoute from "@/components/WhySkillRoute";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {

  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn) {
        return;
      }

      const token = await getToken();
      const req = {
        clerkUserId: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user?.imageUrl
      }
      const response = await fetch('https://ailearningpathgenerator.onrender.com/auth',
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':'application/json'
          },
          body: JSON.stringify(req)
        }
      )
      await response.json();
    }

    syncUser()
  }, [isSignedIn,user,getToken])


  return (
    <>
      <div className="min-h-screen h-auto relative w-full flex lg:items-center text-xl flex-col bg-amber-200 overflow-hidden ">
        <Navbar />
        
        <div className="h-full w-full relative">
          <HeroSection />
        </div>
        <HowItWorks />
        <WhySkillRoute />
        <CTASection />
      </div>
    </>
  );
}

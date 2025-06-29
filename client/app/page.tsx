'use client'
import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import WhySkillRoute from "@/components/WhySkillRoute";
import { AppDispatch } from "@/redux/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { setUser } from "@/redux/slice/authSlice";

export default function Home() {

  const { user, isSignedIn } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn) {
        return;
      }

      const token = await getToken();
      console.log(user, token)
      const req = {
        clerkUserId: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user?.imageUrl
      }
      // console.log(req)
      const response = await fetch('http://localhost:6969/auth',
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':'application/json'
          },
          body: JSON.stringify(req)
        }
      )

      const resdata = await response.json();
      dispatch(setUser(resdata.user));
    }

    syncUser()
  }, [isSignedIn])


  return (
    <>
      <div className="min-h-screen h-auto relative w-full flex lg:items-center text-xl flex-col bg-amber-200  ">
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

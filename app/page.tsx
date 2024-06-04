"use client"

import { Display } from "@/components/Display";
import { NavigationBar } from "@/components/NavigationBar";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <main>
    <div className="grid grid-cols-6">
        <div className="col-span-1 h-screen"><NavigationBar /></div>
        <RecoilRoot>
          <div className="col-span-5 px-10 pt-10"> <Display /> </div>
        </RecoilRoot>
    </div>
    </main>
  );
}

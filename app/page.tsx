import { Display } from "@/components/Display";
import { NavigationBar } from "@/components/NavigationBar";

export default function Home() {
  return (
    <main>
    <div className="grid grid-cols-6">
        <div className="col-span-1 h-screen"><NavigationBar /></div>
        <div className="col-span-5"> <Display /> </div>
    </div>
    </main>
  );
}

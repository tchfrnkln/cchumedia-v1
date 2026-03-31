import Footer from "@/components/Home/Footer";
import { Header2 } from "@/components/Home/Header";
import Map from "@/components/Home/Map";
import Contact from "@/components/Home/Sub/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans">
      <Header2/>
      <Contact/>
      <Map/>
      <Footer/>
    </div>
  );
}
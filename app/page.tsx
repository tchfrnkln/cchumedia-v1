import Dashboard from "@/components/Dashboard/Main";
import Body, { Body2 } from "@/components/Home/Body";
import Footer from "@/components/Home/Footer";
import Header, { Header2 } from "@/components/Home/Header";
import Map from "@/components/Home/Map";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans">
      <Header2/>
      {/* <Dashboard/> */}
      <Body2/>
      <Map/>
      <Footer/>
    </div>
  );
}

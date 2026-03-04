import Dashboard from "@/components/Dashboard/Main";
import Body from "@/components/Home/Body";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import Map from "@/components/Home/Map";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans">
      <Header/>
      <Dashboard/>
      <Body/>
      <Map/>
      <Footer/>
    </div>
  );
}

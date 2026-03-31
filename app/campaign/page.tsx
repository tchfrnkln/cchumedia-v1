import Footer from "@/components/Home/Footer";
import { Header2 } from "@/components/Home/Header";
import Map from "@/components/Home/Map";
import ElectionCampaign from "@/components/Home/Sub/Campaign";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans">
      <Header2/>
      <ElectionCampaign/>
      <Map/>
      <Footer/>
    </div>
  );
}

import Footer from "@/components/Home/Footer";
import { Header2 } from "@/components/Home/Header";
import Map from "@/components/Home/Map";
import BookPublishing from "@/components/Home/Sub/Book";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans">
      <Header2/>
      <BookPublishing/>
      <Map/>
      <Footer/>
    </div>
  );
}

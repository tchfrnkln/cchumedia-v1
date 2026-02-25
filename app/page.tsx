import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans">
      <Header/>
      <Footer/>
    </div>
  );
}

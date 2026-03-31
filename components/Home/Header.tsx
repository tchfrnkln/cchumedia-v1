"use client"
import Image from 'next/image';
import Fab from './Header/Fab'
import Hero from './Header/Hero'
import Socials from './Header/Socials'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
  return (
    <div className='w-full'>
      <div className='w-full fixed top-0 left-0 bg-[#DCD8EF] p-4 z-10'>
        <Socials withMail/>
      </div>
      <Header2/>
      <Hero/>
      <Fab/>
    </div>
  )
}

export default Header

export function Header2() {
  const router = useRouter(); 
  return (
    <nav className="w-full sticky top-0 z-100 bg-white/96 backdrop-blur-xl border-b border-[var(--cchu-border)] px-6 md:px-10 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
        <Image src='/images/icon.png' alt="cchu media" width={50} height={50}></Image>
        <div>
          <div className="font-bold text-lg tracking-tight">PrintHub</div>
          <small className="text-[10px] text-[var(--cchu-gray)] -mt-1 block">
            by C-Chu Media Ltd
          </small>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm text-[var(--cchu-gray)]">
        <Link href="./start" className="hover:text-[var(--cchu-red)] transition-colors">Starter Kits</Link>
        <Link href="./campaign" className="hover:text-[var(--cchu-red)] transition-colors">Campaign</Link>
        <Link href="./publishing" className="hover:text-[var(--cchu-red)] transition-colors">Publishing</Link>
        <Link href="./earn" className="hover:text-[var(--cchu-red)] transition-colors">Earn with us</Link>
        <Link href="./contact" className="hover:text-[var(--cchu-red)] transition-colors">Contact</Link>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <Link href="/auth" className="hover:border-[1px] hover:border-[var(--cchu-red)] p-2 px-4 rounded-sm">Login</Link>
        <Link href="/auth/new" className="bg-(--cchu-red) text-white font-bold p-2 rounded-sm transform hover:translate-y-[-4px]">Order Now →</Link>
      </div>
    </nav>
  );
}
import Image from 'next/image'
import React from 'react'
import Socials from './Header/Socials'
import Link from 'next/link'

const Footer = () => {
  return (
    // <div className='grid grid-col-2 gap-y-10 md:gap-0 md:grid-cols-4 w-full p-12'>
    //     <div>
    //         <Image src='/images/icon.png' alt="cchu media" width={150} height={150}></Image>
    //         <p className='py-6'>Birthing your Imagination...</p>
    //         <Socials withMail={false} light/>
    //     </div>
    //     <div>
    //         <h1 className='font-bold text-lg'>Quick Links</h1>
    //         <div className='flex flex-col gap-1 pt-3'>
    //             <Link className='hover:text-[#9B96C8]' href='/auth'>Login</Link>
    //             <Link className='hover:text-[#9B96C8]' href='/auth/new'>Register</Link>
    //         </div>
    //     </div>
    //     <div>
    //         <h1 className='font-bold text-lg'>Physical Outlet</h1>
    //         <div className='flex items-center gap-1 pt-3'>
    //             <MapPinCheck className='size-9 text-[#9B96C8]'/>
    //             <p className='px-4'>Suite 38 mazfallah plaza Karu Abuja</p>
    //         </div>
    //     </div>
    //     <div>
    //         <h1 className='font-bold text-lg'>Let&apos;s Have a Chat</h1>
    //         <div className='flex items-center gap-1 pt-3'>
    //             <CalendarCheck2 className='size-11 text-[#9B96C8]'/>
    //             <p className='px-4'>Give us a call or drop by anytime, from Monday to Saturday.</p>
    //         </div>
    //     </div>
    // </div>
    <Footer2/>
  )
}

export default Footer

export function Footer2() {
  return (
    <footer className="bg-[#111] text-white pt-16 pb-8 border-t border-white/10 w-full" id="contact">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
             <Image src='/images/icon.png' alt="cchu media" width={50} height={50}></Image>
            <div className="font-bold text-2xl mb-1">PrintHub</div>
             <Socials withMail={false} light/>     
            <p className="text-sm text-white/50 max-w-xs mt-3">
              Professional printing and branding solutions for businesses, organisations, and individuals across Nigeria.
            </p>
          </div>

          <div>
            <div className="uppercase text-xs tracking-widest text-white/40 mb-4">Services</div>
            <div className="space-y-2 text-sm text-white/70">
              <Link href="#services" className="block hover:text-white">Banners & Large Format</Link>
              <Link href="#services" className="block hover:text-white">Branded Souvenirs</Link>
              <Link href="#services" className="block hover:text-white">Signage & Installation</Link>
              <Link href="#services" className="block hover:text-white">Book Publishing</Link>
              <Link href="#starter-kits" className="block hover:text-white">Business Starter Kits</Link>
            </div>
          </div>

          <div>
            <div className="uppercase text-xs tracking-widest text-white/40 mb-4">Company</div>
            <div className="space-y-2 text-sm text-white/70">
              <a href="/start#kits" className="block hover:text-white">Kit</a>
              <Link href="/auth" className="block hover:text-white">Login</Link>
              <a href="/contact" className="block hover:text-white">Contact</a>
              <a href="/earn" className="block hover:text-white">Affiliate Program</a>
            </div>
          </div>

          <div>
            <div className="uppercase text-xs tracking-widest text-white/40 mb-4">Contact</div>
            <div className="space-y-2 text-sm text-white/70">
              <a href="tel:+2349015599370" className="block hover:text-white">+234 901 559 9370</a>
              <a href="tel:+2348063753209" className="block hover:text-white">+234 806 375 3209</a>
              <a href="mailto:info@cchumedia.com" className="block hover:text-white">info@cchumedia.com</a>
              <a href="https://wa.me/2348052929523" className="block hover:text-white">WhatsApp</a>
              <div className="text-xs text-white/50 mt-4">
                Suite 38, Mazfallah Plaza, Karu, Abuja<br />
                Mon – Sat: 8am – 7pm
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          <div className='flex gap-1'>© 2025 <p className='text-(--cchu-red) m-0 p-0'>C-Chu Media Limited.</p> All rights reserved. Birthing your Imagination...</div>
          <div className="mt-3 md:mt-0">printhub.cchumedia.com</div>
        </div>
      </div>
    </footer>
  );
}
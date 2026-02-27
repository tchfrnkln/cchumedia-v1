import Image from 'next/image'
import React from 'react'
import Socials from './Header/Socials'
import Link from 'next/link'
import { CalendarCheck2, MapPinCheck } from 'lucide-react'

const Footer = () => {
  return (
    <div className='grid grid-col-2 gap-y-10 md:gap-0 md:grid-cols-4 w-full p-12'>
        <div>
            <Image src='/images/icon.png' alt="cchu media" width={150} height={150}></Image>
            <p className='py-6'>Birthing your Imagination...</p>
            <Socials withMail={false} light/>
        </div>
        <div>
            <h1 className='font-bold text-lg'>Quick Links</h1>
            <div className='flex flex-col gap-1 pt-3'>
                <Link className='hover:text-[#9B96C8]' href='/auth/new'>Login</Link>
                <Link className='hover:text-[#9B96C8]' href='/auth'>Register</Link>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg'>Physical Outlet</h1>
            <div className='flex items-center gap-1 pt-3'>
                <MapPinCheck className='size-9 text-[#9B96C8]'/>
                <p className='px-4'>Suite 38 mazfallah plaza Karu Abuja</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg'>Let&apos;s Have a Chat</h1>
            <div className='flex items-center gap-1 pt-3'>
                <CalendarCheck2 className='size-11 text-[#9B96C8]'/>
                <p className='px-4'>Give us a call or drop by anytime, from Monday to Saturday.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer
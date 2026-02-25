import { Facebook, Instagram, Mail, Phone, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Socials = ({withMail, light}:{withMail:boolean, light?:boolean}) => {

    const userName = "cchumedia";
    const phone = "+(234) 901 559 9370";
    const mail = "info@cchumedia.com"

  return (
    <div className={`max-w-screen w-full flex justify-between items-center ${light ? 'text-white' : 'text-black'}`}>
        <div className='flex gap-1 hover:cursor-pointer'>
            <Link href={`https://www.facebook.com/${userName}`}>
                <Facebook className='size-4 hover:text-[#9B96C8]'/>
            </Link>
            <Link href={`https://www.instagram.com/${userName}`}>
                <Instagram className='size-4 hover:text-[#9B96C8]'/>
            </Link>
            <Link href={`https://www.twitter.com/${userName}`}>
                <Twitter className='size-4 hover:text-[#9B96C8]'/>
            </Link>
        </div>

        {withMail && <div className='flex gap-1 flex-col md:flex-row hover:cursor-pointer text-xs'>
            <div className='flex mr-8 gap-1 hover:text-[#9B96C8]'>
                <Mail className='size-4'/>
                <p>{mail}</p>
            </div>
            <div className='flex gap-1 hover:text-[#9B96C8]'>
                <Phone className='size-4'/>
                <p>{phone}</p>
            </div>
        </div>}
    </div>
  )
}

export default Socials
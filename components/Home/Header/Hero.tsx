import React from 'react'
import AutoCarousel from './Carousel'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {

    const whatapp = "https://wa.me/2348052929523?text=Hello%20C-CHU%20Media%2C%20My%20name%20is"

  return (
    <div className="max-w-screen w-full hero bg-[#9B96C8] min-h-screen text-[#2A2840]">
        <div className="hero-content flex-col lg:flex-row md:px-24">
            <div className='md:px-24 pt-15 md:pt-0'>
                <div className='w-16 h-16 bg-[#DCD8EF] justify-center items-center flex rounded-full mb-4'>
                    <Image src='/images/icon.png' alt="cchu media" width={50} height={50}></Image>
                </div>
                <div>
                    <h1 className="text-2xl md:text-5xl font-bold">C-Chu Media</h1>
                    <span className="text-rotate text-3xl md:text-4xl leading-loose font-bold text-[#DCD8EF]">
                        <span>
                            <span className="bg-teal-400  px-2 rounded-2xl">Photography</span>
                            <span className="bg-red-400 px-2 rounded-2xl">Cinematography</span>
                            <span className="bg-blue-400 px-2 rounded-2xl">Web & Graphic Design</span>
                            <span className="bg-indigo-400 px-2 rounded-2xl">Print & Publication</span>
                        </span>
                    </span>
                </div>
                <p className="py-6 px-2">
                    We bring your ideas to life with precision and creativity, ensuring your brand shines brighter in a crowded market.
                </p>
                <Link href={whatapp}  className="btn btn-primary mt-12">Discover More</Link>
                <p className='font-bold py-2'>Expect results that exceed your expectations.</p>
            </div>
            {/* Carosals */}
            {/* <Image width={300} height={500} alt='Hero CCHumedia' src={"/images/Table.jpg"} ></Image> */}
            <AutoCarousel/>
        </div>
    </div>
  )
}

export default Hero
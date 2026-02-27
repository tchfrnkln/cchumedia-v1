import Image from 'next/image'
import React from 'react'
import { AutoSlideshow } from './Header/Carousel'

const Body = () => {

    const whyChooseImages = [
        {src:"/images/Table.jpg", alt:"why choose cchu media"},
        {src:"/images/Shirts.jpg", alt:"why choose cchu media"},
        {src:"/images/Signage.jpg", alt:"why choose cchu media"},
    ] 
    
    const competitivePricing = [
        {src:"/images/Table.jpg", alt:"cchu media competitive pricing", price:"5k", name:"Banner", description:"Large/Small Scale banner printings"},
        {src:"/images/Shirts.jpg", alt:"cchu media competitive pricing", price:"3k", name:"Papers", description:"Catalogues, Flyers and all Papers Sizes"},
        {src:"/images/Signage.jpg", alt:"cchu media competitive pricing", price:"4k", name:"SAV", description:"Stickers (SELF-Adhesive Vinyl)"},
    ] 

    const expertise = [
        {src:"/images/Table.jpg", alt:"World-Class Expertise", name:"Printing & Publication", description:"Vibrant business cards, banners, posters, custom nylons, stickers, large-format prints, plus professional book production—editing, design, and premium printing to bring your story or brand to life."},
        {src:"/images/Shirts.jpg", alt:"World-Class Expertise", name:"Graphic Design & Videography", description:"Eye-catching logos, marketing visuals, digital graphics, and professional video production—events, promos, brand stories, corporate videos—with expert editing and motion graphics."},
        {src:"/images/Shirts.jpg", alt:"World-Class Expertise", name:"Photography", description:"High-impact product, portrait, event, and commercial shots—beautifully lit, composed, and edited to tell your story with clarity and style."},
        {src:"/images/Table.jpg", alt:"World-Class Expertise", name:"Branding", description:"Strong, cohesive identities: brand stories, visual systems, custom elements (acrylic signs, fabric branding, labels, ID cards, backdrops), and integrated print/digital/video assets that make you stand out."},
    ] 

  return (
    <div className="p-12 w-full h-max bg-[#DCD8EF] text-[#2A2840]">
        {/* Why Choose Us */}
        <div className='flex flex-col gap-3 items-center justify-center text-center'>
            <h1 className='font-bold text-md md:text-xl flex gap-1'>Why <p className='text-[#B91C1C]'>Choose</p></h1>
            <h1 className='font-bold text-2xl md:text-5xl'>C-Chu Media</h1>
            <p className='w-full md:w-1/2'>Since our founding in 2011 and official incorporation in 2013, C-Chu Media Limited has become a go-to name for top-notch media services and solutions. We’re dedicated to delivering excellence to individuals, businesses, and organizations around the world. Our focus on quality and speed ensures that every project is completed on time, with no compromise on value. Our mission is to offer cutting-edge services with outstanding quality, quick turnaround, and fair pricing, making us a standout player in the media industry. Whether you need printing, branding, or digital media services, we’re committed to exceeding your expectations and leading the way in innovation.</p>

            <div className='grid grid-cols-3 gap-5 py-10'>
                {whyChooseImages.map((image, index) => (
                    <Image className='object-cover w-full h-23 md:h-110 rounded-t-full' key={index} src={image.src} alt={image.alt} width={300} height={200}></Image>
                ))}
            </div>
        </div>

        <div className="divider"></div>
        {/* Competitive Prices */}
        <div className='flex flex-col gap-3 items-center justify-center py-3 md:py-10'>
            <h1 className='font-bold text-md md:text-xl flex gap-1 w-full md:w-1/2'>Unbeatable <p className='text-[#B91C1C]'>Competitive</p></h1>
            <h1 className='font-bold text-2xl md:text-5xl w-full md:w-1/2'>Pricing</h1>
            <p className='w-full md:w-1/2'>Quality craftsmanship shouldn’t break the bank. At our studio, we deliver competitive pricing that fits your vision and budget, ensuring every project balances affordability with unmatched excellence. Whether it’s custom signs, branded fabrics, or intricate designs, we offer flexible rates that make premium results accessible—without ever compromising on detail or durability. Let’s bring your ideas to life at a price that works for you.</p>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 py-10 md:p-10'>
                {competitivePricing.map((image, index) => (
                    <div key={index}>
                        <Image className='object-cover w-full h-25 md:h-80 rounded-tl-[50px] rounded-tr-lg'  src={image.src} alt={image.alt} width={300} height={200}></Image>
                        <div className='w-full h-max bg-[#dcd8efe6] flex items-end justify-between py-3'>
                            <div>
                                <p className='font-bold md:text-lg'>{image.name}</p>
                                <p className="text-xs">{image.description}</p>
                            </div>
                            <p className='font-bold md:text-lg text-green-600 underline'>₦{image.price}+</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="divider"></div>
        
        {/* World-Class Expertise */}
        <div className='flex flex-col gap-3 items-center justify-center'>
            <h1 className='font-bold text-md md:text-xl flex gap-1 w-full md:w-1/2'>World <p className='text-[#B91C1C]'>Class</p></h1>
            <h1 className='font-bold text-2xl md:text-5xl w-full md:w-1/2'>Expertise</h1>
            <p className='w-full md:w-1/2'>From bold table markers and event signage to elegant branded apparel, professional labels, high-quality videography, and beyond, our expertise at C-Chu Media Limited spans a comprehensive range of creative solutions tailored for businesses, events, individuals, and organizations worldwide.</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-10 md:p-10'>
                {expertise.map((image, index) => (
                    <div key={index} className='flex flex-col md:flex-row justify-center items-center'>
                        <Image className='object-cover w-full md:w-50 h-30 md:h-80 rounded-tl-[50px] rounded-bl-lg'  src={image.src} alt={image.alt} width={300} height={200}></Image>
                        <div className='w-full bg-[#dcd8efe6] flex items-start justify-between mt-4 md:mt-0 md:px-6'>
                            <div>
                                <p className='font-bold text-xl md:text-2xl mb-3'>{`${index+1}. ${image.name}`}</p>
                                <p>{image.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="divider"></div>
            
        {/* Us */}
        <div className='flex gap-3 flex-col-reverse md:flex-row items-center md:items-end justify-center py-10'>
            <div className='w-full md:w-1/2 mt-6 md:mt-0'>
                <div className="flex flex-col justify-center items-start mb-3">
                    <h1 className='font-bold text-md md:text-xl flex gap-1'>Visionary <p className='text-[#B91C1C]'>Media</p></h1>
                    <h1 className='font-bold text-2xl md:text-5xl w-max'>Solutions</h1>
                </div>
                <p>Our team excels at turning concepts into tangible, high-impact pieces—whether vibrant acrylic signs, premium fabric branding (like napkins and shirts in rich hues), industrial room labels, custom ID cards, full event backdrops, captivating photographs, or polished video content—that elevate your brand or occasion with unmatched precision, quick turnaround, and a commitment to exceeding expectations. Whatever your need—from everyday prints and stunning stills to cinematic videos and visionary projects—we’re equipped to deliver standout, value-driven results that birth your imagination into reality.</p>
            </div>
            <AutoSlideshow/>
        </div>
    </div>
  )
}

export default Body
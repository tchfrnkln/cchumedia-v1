"use client"; // Required for client-side hooks in Next.js App Router

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AutoCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    { src: "/images/Table.jpg", alt: "Table showcase" },
    { src: "/images/Shirts.jpg", alt: "Shirts showcase" },
    { src: "/images/Signage.jpg", alt: "Signage showcase" },
    // Add more images here if needed
  ];

  // Auto-scroll logic (every 4 seconds, pause on hover/touch)
  useEffect(() => {
    if (isHovered || !carouselRef.current) return;

    intervalRef.current = setInterval(() => {
      if (!carouselRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const itemWidth = clientWidth;

      let nextScroll = scrollLeft + itemWidth;

      // Simple loop: reset to start when near the end
      if (nextScroll >= scrollWidth - itemWidth / 2) {
        nextScroll = 0;
      }

      carouselRef.current.scrollTo({
        left: nextScroll,
        behavior: "smooth",
      });
    }, 4000); // Adjust timing here (4000ms = 4 seconds)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  return (
    <div className="flex justify-center items-center min-h-150 p-4">
      {/* Phone mockup wrapper */}
      {/* <div className="mockup-phone border-[#58547A] relative"> */}
      {/* <div className="mockup-phone border-[#D8261C] relative"> */}
      <div className="mockup-phone border-[#DCD8EF] relative">
        {/* Camera notch */}
        <div className="mockup-phone-camera"></div>

        {/* The screen/display area – carousel goes here */}
        <div className="mockup-phone-display w-54">
          {/* Carousel container */}
          <div
            className="carousel h-full w-full overflow-hidden rounded-box"
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 3000)}
          >
            {images.map((img, idx) => (
              <div key={idx} className="carousel-item w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}   // Typical phone width (adjust if needed)
                  height={667}  // Typical phone height (adjust for aspect ratio)
                  className="w-full h-full object-cover"
                  priority={idx === 0} // Optional: load first image faster
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const images = [
  "/images/Table.jpg",
  "/images/Shirts.jpg",
  "/images/Signage.jpg",
];

export const AutoSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-90 h-100 overflow-hidden rounded-box shadow-xl">
      {images.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}           // load first image eagerly
            sizes="192px"                  // w-48 = 12rem = 192px at default density
            quality={85}                   // good balance of quality/size
          />
        </div>
      ))}

      {/* Optional: indicator dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === currentIndex
                ? "bg-white scale-125 shadow-sm"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
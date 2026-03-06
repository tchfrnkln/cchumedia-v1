// src/components/CountdownLaunch.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownLaunch() {
  // Change this date to your actual launch date
  const LAUNCH_DATE = new Date('2026-03-13T18:00:00'); // Example: March 13, 2026, 6:00 PM WAT

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +LAUNCH_DATE - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLaunched = timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-5xl bg-base-100 shadow-2xl">
        <div className="card-body p-6 md:p-10">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              We&apos;re Launching Soon!
            </h1>
            <p className="text-xl md:text-2xl opacity-80">
              Get ready — something amazing arrives in just
            </p>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-3 md:gap-6 mb-10 md:mb-16 justify-items-center">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="stats shadow bg-linear-to-br from-primary to-secondary text-primary-content w-20 md:w-32">
                  <div className="stat place-items-center p-4 md:p-6">
                    <div className="stat-value text-4xl md:text-7xl font-black">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-lg md:text-xl font-medium opacity-70">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Image / Teaser Gallery Space */}
          <div className="carousel w-full rounded-box mb-10 md:mb-16">
            {/* You can make this dynamic later with props / array of images */}
            {[
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
              'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
              'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
              'https://images.unsplash.com/photo-1555066931-bf19c9cb1085?w=800',
            ].map((src, idx) => (
              <div key={idx} id={`slide${idx + 1}`} className="carousel-item relative w-full">
                <Image
                  src={src}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover rounded-box"
                  alt={`Teaser image ${idx + 1}`}
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href={`#slide${idx === 0 ? 4 : idx}`}
                    className="btn btn-circle btn-neutral btn-sm md:btn-md opacity-70 hover:opacity-100"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${idx === 3 ? 1 : idx + 2}`}
                    className="btn btn-circle btn-neutral btn-sm md:btn-md opacity-70 hover:opacity-100"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action / Status */}
          <div className="text-center">
            {isLaunched ? (
              <div className="alert alert-success shadow-lg max-w-md mx-auto">
                <span className="text-xl font-bold">We&apos;re Live! 🎉</span>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-lg md:text-xl opacity-80">
                  Stay tuned — launching on <strong>March 13th, 2026</strong>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn btn-primary btn-lg">Get Notified</button>
                  <button className="btn btn-outline btn-lg">Learn More</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
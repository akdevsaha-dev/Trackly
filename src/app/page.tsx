import { HeroSection } from "@/components/heroSection";
import { Navbar } from "@/components/navbar";
import Image from "next/image";

const starData = [
  { top: "10%", left: "5%", delay: "0.2s" },
  { top: "20%", left: "15%", delay: "0.4s" },
  { top: "30%", left: "40%", delay: "1s" },
  { top: "45%", left: "80%", delay: "1.5s" },
  { top: "60%", left: "10%", delay: "2s" },
  { top: "70%", left: "55%", delay: "1.7s" },
  { top: "15%", left: "65%", delay: "0.6s" },
  { top: "35%", left: "25%", delay: "1.2s" },
  { top: "50%", left: "70%", delay: "1.1s" },
  { top: "65%", left: "35%", delay: "2.5s" },
  { top: "75%", left: "85%", delay: "2s" },
  { top: "5%", left: "50%", delay: "0.3s" },
  { top: "25%", left: "90%", delay: "0.9s" },
  { top: "80%", left: "15%", delay: "1.8s" },
  { top: "90%", left: "45%", delay: "2.2s" },
];

export default function Home() {
  return (
    <div className="relative h-screen w-full text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0 bg-[url('/heroimage.jpg')] bg-cover bg-center" />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/85" />

      {/* 🟦 Dashed Lines (z-15) */}
      <svg className="pointer-events-none absolute inset-0 z-[15] h-full w-full">
        {/* 🔹 Vertical Lines (3) */}
        <line
          x1="25%"
          y1="0"
          x2="25%"
          y2="100%"
          stroke="white"
          strokeOpacity="0.07"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        <line
          x1="55%"
          y1="0"
          x2="55%"
          y2="100%"
          stroke="white"
          strokeOpacity="0.07"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        <line
          x1="85%"
          y1="0"
          x2="85%"
          y2="100%"
          stroke="white"
          strokeOpacity="0.07"
          strokeWidth="1"
          strokeDasharray="8 6"
        />

        {/* 🔹 Horizontal Lines (3) */}
        <line
          x1="0"
          y1="20%"
          x2="100%"
          y2="20%"
          stroke="white"
          strokeOpacity="0.07"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        <line
          x1="0"
          y1="55%"
          x2="100%"
          y2="55%"
          stroke="white"
          strokeOpacity="0.07"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        <line
          x1="0"
          y1="90%"
          x2="100%"
          y2="90%"
          stroke="white"
          strokeOpacity="0.07"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
      </svg>

      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {starData.map((star, i) => (
          <div
            key={i}
            className="animate-starDrift absolute h-1 w-1 rounded-full bg-white/60 blur-[1px]"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 h-full">
        <Navbar />
        <HeroSection />
      </div>
      <div className="flex h-screen w-full flex-col items-center bg-[#020013]">
        <Image
          src="/anka_image_3.png"
          alt="img"
          height={800}
          width={800}
          className="relative"
        />
        <div className="absolute top-0">
          Best-in-class uptime monitoring. No false positives.
        </div>
      </div>
    </div>
  );
}

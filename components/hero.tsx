"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import { ArrowRight } from "lucide-react";

// Array of icons with unique positions
const floatingIcons = [
  { src: "/icons/music-svgrepo-com.svg", alt: "Music Icon", style: "top-1/2 left-44 w-4 h-4", parallax: 30 },
  { src: "/icons/radio-svgrepo-com.svg", alt: "Radio Icon", style: "top-1/2 right-40 w-4 h-4", parallax: 20 },
  { src: "/icons/lightbulb-alt-svgrepo-com.svg", alt: "Lightbulb Icon", style: "top-10 right-1/6 w-4 h-4", parallax: 25 },
  { src: "/icons/ghost-svgrepo-com.svg", alt: "Ghost Icon", style: "bottom-16 left-1/4 w-4 h-4", parallax: 18 },
  { src: "/icons/face-smile-svgrepo-com.svg", alt: "Smile Icon", style: "bottom-24 right-12 w-4 h-4", parallax: 22 },
  { src: "/icons/cloud-rain-alt-svgrepo-com.svg", alt: "Cloud Rain Icon", style: "top-20 right-1/3 w-4 h-4", parallax: 15 },
  { src: "/icons/music-svgrepo-com.svg", alt: "Music Icon", style: "bottom-32 left-1/2 w-4 h-4", parallax: 18 },
  { src: "/icons/radio-svgrepo-com.svg", alt: "Radio Icon", style: "bottom-36 right-40 w-4 h-4", parallax: 20 },
  { src: "/icons/lightbulb-alt-svgrepo-com.svg", alt: "Lightbulb Icon", style: "top-40 left-1/3 w-4 h-4", parallax: 22 },
  { src: "/icons/ghost-svgrepo-com.svg", alt: "Ghost Icon", style: "bottom-40 right-1/4 w-4 h-4", parallax: 16 },
  { src: "/icons/face-smile-svgrepo-com.svg", alt: "Smile Icon", style: "bottom-32 left-1/3 w-4 h-4", parallax: 24 },
  { src: "/icons/cloud-rain-alt-svgrepo-com.svg", alt: "Cloud Rain Icon", style: "bottom-1/3 left-20 w-4 h-4", parallax: 15 },
  { src: "/icons/music-svgrepo-com.svg", alt: "Music Icon", style: "bottom-20 left-1/6 w-4 h-4", parallax: 16 },
  { src: "/icons/radio-svgrepo-com.svg", alt: "Radio Icon", style: "bottom-16 right-10 w-4 h-4", parallax: 14 },
  { src: "/icons/lightbulb-alt-svgrepo-com.svg", alt: "Lightbulb Icon", style: "bottom-10 left-12 w-4 h-4", parallax: 12 },
  { src: "/icons/ghost-svgrepo-com.svg", alt: "Ghost Icon", style: "bottom-5 right-20 w-4 h-4", parallax: 10 },
  { src: "/icons/face-smile-svgrepo-com.svg", alt: "Smile Icon", style: "top-12 right-10 w-4 h-4", parallax: 18 },
  { src: "/icons/cloud-rain-alt-svgrepo-com.svg", alt: "Cloud Rain Icon", style: "top-1/3 left-3 w-4 h-4", parallax: 12 },
  { src: "/icons/face-smile-svgrepo-com.svg", alt: "Smile Icon", style: "top-44 right-16 w-4 h-4", parallax: 19 },
  { src: "/icons/lightbulb-alt-svgrepo-com.svg", alt: "Lightbulb Icon", style: "bottom-32 left-1/4 w-4 h-4", parallax: 14 },
  { src: "/icons/lightbulb-alt-svgrepo-com.svg", alt: "Lightbulb Icon", style: "left-32 top-1/2 w-4 h-4", parallax: 14 },
  { src: "/icons/lightbulb-alt-svgrepo-com.svg", alt: "Lightbulb Icon", style: "top-1/3 left-1/4 w-4 h-4", parallax: 14 },
  { src: "/icons/lightbulb-alt-svgrepo-com.svg", alt: "Lightbulb Icon", style: "bottom-1/2 left-2 w-4 h-4", parallax: 14 },
  { src: "/icons/lightbulb-alt-svgrepo-com.svg", alt: "Lightbulb Icon", style: "right-32 left-1/4 w-4 h-4", parallax: 14 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center w-full overflow-hidden px-4 py-24 sm:py-40 bg-gradient-to-b from-[#f5eaff] to-[#e6e6fa]"
    >
      {/* Floating icons */}
      {floatingIcons.map((icon, idx) => {
  const y = useSpring(0, { stiffness: 30, damping: 20 });
  const x = useSpring(0, { stiffness: 30, damping: 20 });
  const rotate = useSpring(0, { stiffness: 30, damping: 20 });
  const scale = useSpring(1, { stiffness: 30, damping: 20 });

  useEffect(() => {
    let frame: number;
    let t = Math.random() * 10;

    // Pick a random animation type per icon
    const animationType = idx % 5; // Can use random if you want true randomness

    const animate = () => {
      t += 0.016;
    
      // Common float for all icons
      const floatY = Math.sin(t * 1.5) * 20;
      y.set(floatY);
    
      // Add individual animations on top
      switch (animationType) {
        case 0:
          // Subtle horizontal drift
          x.set(Math.sin(t) * 10);
          break;
        case 1:
          // Slow rotation
          rotate.set((t * 45) % 360);
          break;
        case 2:
          // Pulse
          scale.set(1 + Math.sin(t * 2) * 0.2);
          break;
        case 3:
          // Orbit-style motion
          x.set(Math.cos(t) * 20);
          y.set(floatY + Math.sin(t) * 10); // keep the base float, enhance Y
          break;
        case 4:
          // Jitter effect
          x.set(Math.sin(t * 10 + idx) * 5);
          rotate.set(Math.sin(t * 2) * 10);
          break;
      }
    
      frame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(frame);
  }, [x, y, rotate, scale]);

  return (
    <motion.img
      key={icon.src + idx}
      src={icon.src}
      alt={icon.alt}
      className={`pointer-events-none absolute ${icon.style.replace("w-4 h-4", "sm:w-8 sm:h-8")} h-4 w-4 opacity-80 select-none mix-blend-multiply`}
      style={{
        x,
        y,
        rotate,
        scale,
        filter: "drop-shadow(0 0 12px #a78bfa) saturate(2) brightness(1.2) hue-rotate(-20deg)",
      }}
      draggable={false}
    />
  );
})}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-6xl text-black font-bold  font-mono mb-4">
          The AI Design Studio <br className="hidden sm:block" />
          <span className="block">
            for{" "}
            <span className="bg-gradient-to-r from-[#c084fc] to-[#6366f1] bg-clip-text text-transparent">
              Graphic Designers
            
            </span>
          </span>
        </h1>
        <p className="text-lg sm:text-xl font- leading-relaxed text-gray-600 font-medium mb-8">
          Crafted to make you <span className="font-semibold">faster</span> and more{" "}
          <span className="font-semibold">creative</span>.
          <br />
          AI studio for graphic designers, entrepreneurs, and influencers.
        </p>
        <motion.a
          href="#"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className=" px-10 p-3 flex  hover:to-blue-400 rounded-xl font-semibold shadow-2xl   text-white bg-gradient-to-br from-purple-600 to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-[#a78bfa] focus:ring-offset-2 mb-2"
        >
          Start For Free 
          
          <motion.span
    className="ml-4"
    animate={{
      x: [0, 5, 0], // Moves forward by 5px and then back to 0
    }}
    transition={{
      duration: 0.8, // 1 second for the full forward-backward motion
      repeat: Infinity, // Infinite loop
      repeatType: "loop", // Smooth looping
    }}
  >
    <ArrowRight />
  </motion.span>        </motion.a>
        <span className="block text-xs text-gray-500 mt-2">No Credit Card Required</span>
      </div>
    </section>
  );
}

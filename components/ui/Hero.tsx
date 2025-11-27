"use client";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/image";

// 1. The Scrolling Strip Component
const Marquee = () => (
  <div className="absolute top-[20%] w-full overflow-hidden whitespace-nowrap z-0 opacity-[0.03] rotate-[-5deg] scale-110 pointer-events-none">
    <motion.div 
      className="inline-block text-[10vw] font-black uppercase"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      Full Stack • Robotics • Design • Engineering • Creative • 
      Full Stack • Robotics • Design • Engineering • Creative • 
    </motion.div>
  </div>
);

// 2. The Doodles Component
const Doodles = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <svg className="absolute top-[15%] left-[10%] w-24 h-24 text-gray-500/20 rotate-12" viewBox="0 0 100 100">
      <path fill="none" stroke="currentColor" strokeWidth="3" d="M10,50 Q30,20 50,50 T90,50" />
    </svg>
    <svg className="absolute bottom-[20%] right-[15%] w-40 h-40 text-gray-500/20" viewBox="0 0 100 100">
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M50,10 A40,40 0 1,0 50,90 A40,40 0 1,0 50,10 M45,15 A35,35 0 1,1 45,85" />
    </svg>
    <svg className="absolute top-[35%] right-[25%] w-32 h-32 text-white/10 rotate-[130deg]" viewBox="0 0 100 100">
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M10,50 L90,50 M80,40 L90,50 L80,60" />
    </svg>
    <div className="absolute top-[10%] right-[10%] text-2xl text-gray-800">+</div>
    <div className="absolute bottom-[30%] left-[5%] text-4xl text-gray-800">+</div>
  </div>
);

export default function Hero({ profile }: { profile: any }) {
  if (!profile) return null;

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-10 bg-[#0a0a0a]">
      
      {/* BACKGROUND LAYERS */}
      <Marquee />
      <Doodles />

      {/* 1. SOLID TEXT (Back Layer) */}
      <motion.h1 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[15vw] leading-none font-black text-[#1a1a1a] tracking-tighter select-none z-10 absolute top-[12%] md:top-[8%]"
      >
        CREATIVE
      </motion.h1>

      {/* 2. IMAGE (Middle Layer) */}
      <div className="relative z-20 w-[80vw] md:w-[45vh] aspect-[3/4] mt-10">
        {profile.profileImage ? (
           <motion.img
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2, duration: 0.8 }}
             src={urlFor(profile.profileImage).width(1000).url()}
             alt={profile.name}
             className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
           />
        ) : (
           <div className="w-full h-full bg-neutral-800 animate-pulse" />
        )}

        {/* 2.5 LINKEDIN BUTTON (White Circle) */}
        {profile.socials?.linkedin && (
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.6, type: "spring" }}
               className="absolute top-[40%] -right-6 md:-right-12 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-30 group shadow-2xl"
            >
                {/* Diagonal Arrow Icon (Signifies 'Go To Link') */}
                <svg 
                  className="w-8 h-8 text-black group-hover:rotate-45 transition-transform duration-300" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17"></path>
                </svg>
            </motion.div>
          </a>
        )}
      </div>

      {/* 3. OUTLINED TEXT (Front Layer) */}
      <motion.h1 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="text-[15vw] leading-none font-black tracking-tighter select-none z-30 absolute bottom-[15%] md:bottom-[10%] text-transparent pointer-events-none"
        style={{ 
          WebkitTextStroke: "2px rgba(255, 255, 255, 0.4)", 
        }}
      >
        DEVELOPER
      </motion.h1>

      {/* 4. INFO TEXT (Bottom Left) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-8 md:left-12 z-40 text-xs md:text-sm font-mono text-gray-500 flex flex-col gap-1"
      >
         <span className="text-white">BASED IN INDIA</span>
         <span>AVAILABLE FOR HIRE</span>
      </motion.div>

      {/* 5. BOUNCING SCROLL ARROW (Bottom Center) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
      >
         <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Scroll</span>
         <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
         </div>
      </motion.div>

    </section>
  );
}
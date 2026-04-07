"use client";
import { Variants } from "motion";
import { motion } from "motion/react";

export const HeroSection = () => {
  const headingText = "Never Miss a Beat Again.".split(" ");
  const paragraphText =
    `Real-time uptime monitoring with instant alerts. Keep your online presence alive and flourishing.`.split(
      " ",
    );

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 1.5,
        duration: 1.5,
        ease: "circOut",
      },
    },
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-20">
      <div className="relative z-10 w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 font-mono text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase"
        >
          [ Status: Operational // Peak Performance ]
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-8 font-brand text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-[100px] lg:text-[120px]"
        >
          {headingText.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className={`inline-block mr-[0.2em] ${word.toLowerCase().includes("beat") ? "text-accent" : ""
                }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 1.2 }
            }
          }}
          className="mx-auto mb-12 max-w-2xl text-lg font-medium text-white/50 md:text-2xl font-brand leading-relaxed"
        >
          {paragraphText.map((word, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="mr-1.5 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <div className="flex flex-col items-center gap-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Start Monitoring Free</span>
            <div className="absolute inset-0 z-0 bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-electric-blue/10 blur-[120px] opacity-20" />
    </section>
  );
};

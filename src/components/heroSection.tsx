"use client";
import { Variants } from "motion";
import { motion } from "motion/react";
export const HeroSection = () => {
  const headingText = "Never Miss a Beat.".split(" ");
  const paragraphText =
    `"Real-time uptime monitoring with instant alerts. Keep your online presence alive."`.split(
      " ",
    );
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3, // optional: small delay before start
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: "blur(20px)",
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: [0.85, 1],
      transition: {
        opacity: { duration: 0.9, ease: "easeOut" },
        y: { duration: 0.9, ease: "easeOut" },
        filter: { duration: 0.9, ease: "easeOut" },
        scale: {
          duration: 0.8,
          delay: 0.9,
          ease: "easeOut",
        },
      },
    },
  };

  const paraContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1,
      },
    },
  };

  const paraWordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: "blur(20px)",
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: [0.85, 1],
      transition: {
        opacity: { duration: 0.9, ease: "easeOut" },
        y: { duration: 0.9, ease: "easeOut" },
        filter: { duration: 0.9, ease: "easeOut" },
        scale: {
          duration: 0.9,
          delay: 2.4,
          ease: "easeOut",
        },
      },
    },
  };

  return (
    <div className="flex h-[80vh] justify-center">
      <div className="w-[75%]">
        <div className="mt-[150px] text-center">ACHIEVE PEAK PERFORMANCE</div>
        <div className="mt-3 flex h-[1px] w-full justify-center">
          <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
        </div>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-[180px] px-12 text-center text-[80px] leading-none font-light tracking-tight font-stretch-extra-expanded antialiased"
        >
          {headingText.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="mr-6 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={paraContainerVariants}
          className="px-32 pt-6 text-center text-[37px] font-light text-indigo-100"
        >
          {paragraphText.map((word, index) => (
            <motion.span
              key={index}
              className="mr-3 inline-block"
              variants={paraWordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2, duration: 2, ease: "easeOut" }}
          className="h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
        ></motion.div>
      </div>
    </div>
  );
};

export const appleEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const appleSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
};

export const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: appleEase },
  },
};

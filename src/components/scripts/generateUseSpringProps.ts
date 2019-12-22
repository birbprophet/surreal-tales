const bottomPositionOptions: string[] = [
  "0%",
  "10%",
  "20%",
  "30%",
  "40%",
  "50%",
  "60%",
  "70%",
  "80%",
  "90%"
];

const getRandomPosition = () => {
  const randIdx = Math.floor(Math.random() * bottomPositionOptions.length);
  return bottomPositionOptions[randIdx];
};

export const generateUseSpringProps = () => {
  const initialSideLeft: boolean = Math.random() > 0.5;
  return {
    from: {
      position: "absolute",
      bottom: getRandomPosition(),
      right: initialSideLeft ? "-20%" : "120%"
    },
    to: async (next: any) => {
      if (Math.random() > 0.5) {
        await next({
          position: "absolute",
          bottom: getRandomPosition(),
          right: initialSideLeft ? "-20%" : "120%"
        });
      }
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: !initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: !initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: !initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: !initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: !initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: !initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: !initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: !initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: initialSideLeft ? "-20%" : "120%"
      });
      await next({
        position: "absolute",
        bottom: getRandomPosition(),
        right: initialSideLeft ? "-20%" : "120%"
      });
    },
    config: {
      duration: 12000 + Math.random() * 8000
    },
    reset: true
  };
};

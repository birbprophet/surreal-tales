import React from "react";
import { animated, useSpring } from "react-spring";

import { generateUseSpringProps } from "./scripts";

import { ReactComponent as ShrekSvg } from "./assets/floating_icons/shrek.svg";
import { ReactComponent as TrumpSvg } from "./assets/floating_icons/trump.svg";
import { ReactComponent as KimJongUnSvg } from "./assets/floating_icons/kimjongun.svg";
import { ReactComponent as BigChungusSvg } from "./assets/floating_icons/bigchungus.svg";
import { ReactComponent as DogeSvg } from "./assets/floating_icons/doge.svg";
import { ReactComponent as RicardoSvg } from "./assets/floating_icons/ricardo.svg";
import { ReactComponent as PepeSvg } from "./assets/floating_icons/pepe.svg";

interface IAnimatedIconProps {
  svgIcon: any;
}
const AnimatedIcon: React.FC<IAnimatedIconProps> = ({ svgIcon }) => (
  <animated.div style={useSpring(generateUseSpringProps())}>
    <div>{svgIcon}</div>
  </animated.div>
);

const ReactComponent: React.FC = () => {
  const animatedIcons: any[] = [
    ShrekSvg,
    TrumpSvg,
    KimJongUnSvg,
    BigChungusSvg,
    DogeSvg,
    RicardoSvg,
    PepeSvg
  ];
  return (
    <div className="absolute top-0 w-full h-64 -z-10">
      {animatedIcons.map(IconSvg => (
        <AnimatedIcon
          svgIcon={<IconSvg className="opacity-50 h-10" />}
        ></AnimatedIcon>
      ))}
    </div>
  );
};

export default ReactComponent;

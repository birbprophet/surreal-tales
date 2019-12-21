import React from "react";

import MenuItems from "./MenuItems";

interface IProps {
  menuOpen: boolean;
}

const ReactComponent: React.FC<IProps> = ({ menuOpen }) => {
  return (
    <nav
      className={
        "flex flex-col justify-center bg-gray-700 h-screen w-screen absolute top-0 left-0 z-30"
      }
      style={
        menuOpen
          ? {
              WebkitTransition: "transform 0.5s ease-in-out",
              transition: "transform 0.5s ease-in-out",
              WebkitTransform: "translateX(0)",
              transform: "translateX(0)"
            }
          : {
              WebkitTransition: "transform 0.5s ease-in-out",
              transition: "transform 0.5s ease-in-out",
              WebkitTransform: "translateX(100%)",
              transform: "translateX(100%)"
            }
      }
    >
      <MenuItems />
    </nav>
  );
};

export default ReactComponent;

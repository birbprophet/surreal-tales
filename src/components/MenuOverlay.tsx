import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import {
  IonList,
  IonItem,
  IonToolbar,
  IonButtons,
  IonContent,
  IonText,
  IonIcon
} from "@ionic/react";

import { arrowForward } from "ionicons/icons";

interface IProps {
  menuOpen: boolean;
}

const ReactComponent: React.FC<IProps> = ({ menuOpen }) => {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const resourcesOpenProps = useSpring({
    transform: resourcesOpen ? "rotate(90deg)" : "rotate(0deg)"
  });

  const aboutOpenProps = useSpring({
    transform: aboutOpen ? "rotate(90deg)" : "rotate(0deg)"
  });

  const handleResourcesOnClick = () => {
    if (aboutOpen && !resourcesOpen) {
      setAboutOpen(!aboutOpen);
    }
    setResourcesOpen(!resourcesOpen);
  };

  const handleAboutOnClick = () => {
    if (resourcesOpen && !aboutOpen) {
      setResourcesOpen(!resourcesOpen);
    }
    setAboutOpen(!aboutOpen);
  };

  return (
    <>
      <div
        className={
          "flex flex-col justify-center align-top bg-gray-800 h-full w-screen fixed mt-16 top-0 left-0 z-20"
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
        <div className="flex-1">
          <IonContent color="dark-grey">
            <div className="pt-4 mx-3">
              <IonList lines="full">
                <IonItem>
                  <IonText slot="start">
                    <div className="text-xl py-4">How It Works</div>
                  </IonText>
                </IonItem>

                <div className="flex flex-col">
                  <div className="flex-1">
                    <IonItem
                      color={resourcesOpen ? "medium-grey" : "dark-grey"}
                      onClick={handleResourcesOnClick}
                    >
                      <IonText slot="start">
                        <div className="text-xl py-4">Resources</div>
                      </IonText>
                      <IonButtons slot="end">
                        <animated.div style={resourcesOpenProps}>
                          <IonIcon
                            color="light"
                            size="large"
                            icon={arrowForward}
                          />
                        </animated.div>
                      </IonButtons>
                    </IonItem>
                  </div>
                  <div className="flex-1">
                    <div className={resourcesOpen ? "" : "hidden"}>
                      <IonItem lines="none">
                        <IonText slot="start">
                          <div className="text-lg pt-4 pl-4">
                            Getting Started
                          </div>
                        </IonText>
                      </IonItem>
                      <IonItem lines="none">
                        <IonText slot="start">
                          <div className="text-lg pt-4 pl-4">
                            Play with Friends
                          </div>
                        </IonText>
                      </IonItem>
                      <IonItem>
                        <IonText slot="start">
                          <div className="text-lg py-4 pl-4">FAQs</div>
                        </IonText>
                      </IonItem>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex-1">
                    <IonItem
                      color={aboutOpen ? "medium-grey" : "dark-grey"}
                      onClick={handleAboutOnClick}
                    >
                      <IonText slot="start">
                        <div className="text-xl py-4">About</div>
                      </IonText>
                      <IonButtons slot="end">
                        <animated.div style={aboutOpenProps}>
                          <IonIcon
                            color="light"
                            size="large"
                            icon={arrowForward}
                          />
                        </animated.div>
                      </IonButtons>
                    </IonItem>
                  </div>
                  <div className="flex-1">
                    <div className={aboutOpen ? "" : "hidden"}>
                      <IonItem lines="none">
                        <IonText slot="start">
                          <div className="text-lg pt-4 pl-4">Technology</div>
                        </IonText>
                      </IonItem>
                      <IonItem lines="none">
                        <IonText slot="start">
                          <div className="text-lg pt-4 pl-4">Contact Us</div>
                        </IonText>
                      </IonItem>
                      <IonItem>
                        <IonText slot="start">
                          <div className="text-lg py-4 pl-4">
                            Terms & Policies
                          </div>
                        </IonText>
                      </IonItem>
                    </div>
                  </div>
                </div>
                <IonItem>
                  <IonText slot="start">
                    <div className="text-xl py-4">Blog</div>
                  </IonText>
                </IonItem>
              </IonList>
            </div>
          </IonContent>
        </div>
      </div>
      <div
        className="fixed w-screen bottom-0 z-30"
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
        <IonToolbar color="dark-grey">
          <div className="text-center p-8 bg-gray-800">
            <div className="bg-gray-300 p-4 text-2xl font-rounded font-semibold rounded-lg text-gray-900">
              Create Stories Now
            </div>
          </div>
        </IonToolbar>
      </div>
    </>
  );
};

export default ReactComponent;

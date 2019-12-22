import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons
} from "@ionic/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, analytics } from "../scripts/firebase";
import Typist from "react-typist";
import TypistLoop from "react-typist-loop";

import MenuIcon from "../components/MenuIcon";
import MenuOverlay from "../components/MenuOverlay";
import FloatingIconSection from "../components/FloatingIconsSection";

const Page: React.FC = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuOpen = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    analytics.logEvent("visited_home_page");
  }, [user]);

  const typistLoopTextList: string[] = [
    "Stories",
    "Crossovers",
    "Adventures",
    "Fanfics",
    "Memes"
  ];

  return (
    <IonPage>
      {/* HOME HEADER SECTION */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <div className="font-rounded font-semibold text-gray-100 text-2xl flex-1 py-4 pl-6">
              <Typist
                avgTypingDelay={100}
                startDelay={1000}
                cursor={{
                  show: true,
                  blink: true,
                  element: "_",
                  hideWhenDone: false
                }}
              >
                Surreal <Typist.Delay ms={500} />
                Tales
              </Typist>
            </div>
          </IonButtons>
          <IonButtons slot="end">
            <MenuIcon menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* HOME CONTENT SECTION */}
      <IonContent>
        <MenuOverlay menuOpen={menuOpen} />
        <FloatingIconSection />
        <div className="relative top-0 inset-x-0 flex flex-col h-full font-rounded font-bold text-gray-200 text-4xl text-left tracking-normal leading-tight">
          <div className="p-8">
            <div className="flex">
              <div className="mr-2">Create </div>
              <div>
                <TypistLoop interval={3000}>
                  {typistLoopTextList.map(text => (
                    <Typist
                      key={text}
                      startDelay={500}
                      cursor={{
                        show: false,
                        blink: true,
                        element: "_"
                      }}
                    >
                      {text}
                      <Typist.Delay ms={4000} />
                      {Array.prototype.map.call(text, _ => (
                        <Typist.Backspace count={1} delay={50} />
                      ))}
                    </Typist>
                  ))}
                </TypistLoop>
              </div>
            </div>
            <div>you never knew</div>
            <div>you wanted</div>
            <div className="text-gray-400 mt-8 text-xl font-normal">
              Generate unique stories by interacting with an AI via "choose your
              adventure" style prompts.
            </div>
          </div>

          <div className="flex-1" />
          <div className="text-center m-8">
            <div className="bg-gray-300 p-4 text-2xl font-rounded font-semibold rounded-lg text-gray-900">
              Create Stories Now
            </div>
          </div>
        </div>

        <div className="relative top-0 inset-x-0 flex flex-col h-full p-8 font-rounded font-bold text-gray-200 text-4xl text-left tracking-normal leading-tight bg-gray-900">
          <div className="flex">
            <div className="mr-2">Create </div>
            <div>
              <TypistLoop interval={3000}>
                {typistLoopTextList.map(text => (
                  <Typist
                    key={text}
                    startDelay={500}
                    cursor={{
                      show: false,
                      blink: true,
                      element: "_"
                    }}
                  >
                    {text}
                    <Typist.Delay ms={4000} />
                    {Array.prototype.map.call(text, _ => (
                      <Typist.Backspace count={1} delay={50} />
                    ))}
                  </Typist>
                ))}
              </TypistLoop>
            </div>
          </div>
          <div>you never knew</div>
          <div>you wanted</div>
          <div className="text-lg font-normal">
            Generate unique stories by interacting with an AI via "choose your
            adventure" style prompts.
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;

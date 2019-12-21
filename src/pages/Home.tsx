import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle
} from "@ionic/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, analytics } from "../scripts/firebase";
import Typist from "react-typist";

import MenuIcon from "../components/MenuIcon";
import MenuOverlay from "../components/MenuOverlay";

import { book, build, colorFill, grid } from "ionicons/icons";

const Page: React.FC = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenuOpen = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    analytics.logEvent("visited_home_page");
  }, [user]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <div className="font-rounded font-semibold text-gray-100 text-2xl flex-1 p-4">
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
      <IonContent>
        <MenuOverlay menuOpen={menuOpen} />
        <IonCard className="welcome-card">
          <img src="/assets/shapes.svg" alt="" className="" />
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Welcome to Ionic</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Now that your app has been created, you'll want to start building
              out features and components. Check out some of the resources below
              for next steps.
            </p>
          </IonCardContent>
        </IonCard>

        <IonList lines="none">
          <IonListHeader>
            <IonLabel>Resources</IonLabel>
          </IonListHeader>
          <IonItem href="https://ionicframework.com/docs/" target="_blank">
            <IonIcon slot="start" color="medium" icon={book} />
            <IonLabel>Ionic Documentation</IonLabel>
          </IonItem>
          <IonItem
            href="https://ionicframework.com/docs/building/scaffolding"
            target="_blank"
          >
            <IonIcon slot="start" color="medium" icon={build} />
            <IonLabel>Scaffold Out Your App</IonLabel>
          </IonItem>
          <IonItem
            href="https://ionicframework.com/docs/layout/structure"
            target="_blank"
          >
            <IonIcon slot="start" color="medium" icon={grid} />
            <IonLabel>Change Your App Layout</IonLabel>
          </IonItem>
          <IonItem
            href="https://ionicframework.com/docs/theming/basics"
            target="_blank"
          >
            <IonIcon slot="start" color="medium" icon={colorFill} />
            <IonLabel>Theme Your App</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <div
        className="relative z-30"
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
        <IonToolbar>
          <IonButtons slot="end">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Back Button</IonTitle>
        </IonToolbar>
      </div>
    </IonPage>
  );
};

export default Page;

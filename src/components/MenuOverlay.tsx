import React from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonRadio,
  IonCheckbox,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton
} from "@ionic/react";

interface IProps {
  menuOpen: boolean;
}

const ReactComponent: React.FC<IProps> = ({ menuOpen }) => {
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
          <IonList>
            <IonItem lines="none">Pokémon Yellow</IonItem>
            <IonItem>
              <IonLabel>Mega Man X</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>The Legend of Zelda</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Pac-Man</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Super Mario World</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </div>
    </>
  );
};

export default ReactComponent;

import React from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent
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
          <IonContent color="dark-grey">
            <IonList>
              <IonItem lines="none" color="dark-grey">
                An Item Something
              </IonItem>
              <IonItem lines="none" color="dark-grey">
                An Item Something
              </IonItem>
              <IonItem lines="none" color="dark-grey">
                An Item Something
              </IonItem>
              <IonItem lines="none" color="dark-grey">
                An Item Something
              </IonItem>
              <IonItem lines="none" color="dark-grey">
                An Item Something
              </IonItem>
              <IonItem lines="none" color="dark-grey">
                An Item Something
              </IonItem>
            </IonList>
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
          <IonButtons slot="end">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Back Button</IonTitle>
        </IonToolbar>
      </div>
    </>
  );
};

export default ReactComponent;

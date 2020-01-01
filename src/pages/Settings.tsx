import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonContent,
  IonItem,
  IonIcon,
  IonList,
} from "@ionic/react"

import { arrowBack, lock, key, logOut } from "ionicons/icons"

import { auth } from "../scripts/firebase"
import { segment } from "../scripts/segment"

const ReactComponent: React.FC = () => {
  useEffect(() => {
    segment.page()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="relative h-12 pt-2">
            <Link to="/app/profile/">
              <div className="pl-2 absolute left-0 cursor-pointer">
                <IonIcon size="large" slot="start" icon={arrowBack} />
              </div>
            </Link>
            <div className="text-xl absolute text-center w-screen font-semibold font-rounded mt-1">
              Settings
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="pt-12">
          <IonList color="transparent">
            <IonItem color="transparent" lines="none" disabled>
              <div className="cursor-pointer flex pb-6 pl-2">
                <IonIcon size="large" slot="start" icon={lock} />
                <div className="text-2xl pl-4">Security</div>
              </div>
            </IonItem>
            <IonItem color="transparent" lines="none" disabled>
              <div className="cursor-pointer flex pb-6 pl-2">
                <IonIcon size="large" slot="start" icon={key} />
                <div className="text-2xl pl-4">Accounts</div>
              </div>
            </IonItem>
            <IonItem
              color="transparent"
              lines="none"
              onClick={() => {
                auth.signOut()
              }}
            >
              <div className="cursor-pointer flex pb-6 pl-2">
                <IonIcon size="large" slot="start" icon={logOut.md} />
                <div className="text-2xl pl-4">Logout</div>
              </div>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ReactComponent

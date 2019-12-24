import React, { useEffect } from "react"
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth, analytics } from "../scripts/firebase"

const ReactComponent: React.FC = () => {
  const [user] = useAuthState(auth)

  useEffect(() => {
    analytics.logEvent("visited_profile_page")
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{user ? user.displayName : "Hi"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton
          size="large"
          onClick={() => {
            auth.signOut()
          }}
        >
          <div className="text-lg font-rounded font-semibold">LOGOUT</div>
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default ReactComponent

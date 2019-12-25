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

import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

const GET_USER_FROM_UID = gql`
  query getUserEntry($user_id: String!) {
    users(where: { user_id: { _eq: $user_id } }) {
      username
      email
      display_name
      profile_picture_url
      bio
    }
  }
`

interface IUserEntry {
  username: string
  email: string
  display_name?: string
  profile_picture_url?: string
  bio?: string
}

const ReactComponent: React.FC = () => {
  const [user] = useAuthState(auth)
  const { data: userData } = useQuery(GET_USER_FROM_UID, {
    variables: { user_id: user ? user.uid : "" },
  })

  const userEntry: IUserEntry | null =
    userData && userData.users ? userData.users[0] : null

  useEffect(() => {
    analytics.logEvent("visited_profile_page")
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{userEntry ? "@" + userEntry.username : ""}</IonTitle>
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

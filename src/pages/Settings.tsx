import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonAvatar,
  IonItem,
  IonLabel,
  IonIcon,
  IonActionSheet,
  IonList,
} from "@ionic/react"

import { arrowBack, lock, key, logOut } from "ionicons/icons"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth, analytics } from "../scripts/firebase"
import { segment } from "../scripts/segment"

import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { ReactComponent as DefaultProfilePicSvg } from "../components/assets/default_profile_pic/default_profile_pic.svg"

const GET_USER_FROM_UID = gql`
  query getUserEntry($user_id: String!) {
    users(where: { user_id: { _eq: $user_id } }) {
      username
      email
      display_name
      profile_picture_url
      bio
      stream_token
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

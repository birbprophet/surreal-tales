import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonContent,
  IonItem,
  IonIcon,
  IonInput,
  IonCard,
} from "@ionic/react"

import { search } from "ionicons/icons"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../scripts/firebase"
import { segment } from "../scripts/segment"

import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

const GET_USER_FROM_UID = gql`
  query getUserEntry($id: String!) {
    users(where: { id: { _eq: $id } }) {
      username
      email
      display_name
      profile_picture_url
      bio
      stream_token
    }
  }
`

const GET_CURRENT_SESSION = gql`
  query getCurrentSession($user_id: String!) {
    sessions(
      limit: 1
      where: {
        user_id: { _eq: $user_id }
        in_progress: { _eq: true }
        cancelled: { _eq: false }
      }
    ) {
      character_bio
      character_name
      story_setting
      interactions {
        option {
          text
          is_user_input
        }
        text
        type
        options {
          text
          is_user_input
        }
      }
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

interface ISessionEntry {
  character_bio: string | null
  character_name: string | null
  story_setting: string | null
  interactions: {
    option: {
      text: string
      is_user_input: boolean
    } | null
    text: string
    type: string
    options: {
      text: string
      is_user_input: boolean
    }
  }[]
}

const ReactComponent: React.FC = () => {
  const [user, initialising] = useAuthState(auth)
  const [sessionLoaded, setSessionLoaded] = useState(false)
  const { data: userData, loading: userLoading } = useQuery(GET_USER_FROM_UID, {
    variables: { id: user ? user.uid : "" },
  })

  const { data: sessionData } = useQuery(GET_CURRENT_SESSION, {
    variables: { user_id: user ? user.uid : "" },
  })

  useEffect(() => {
    segment.page()
  }, [])

  if (userData && sessionData && sessionLoaded !== true) {
    setSessionLoaded(true)
  }

  const userEntry: IUserEntry =
    userData && userData.users ? userData.users[0] : null

  const sessionEntry: ISessionEntry =
    sessionData && sessionData.sessions && sessionData.sessions.length > 0
      ? sessionData.sessions[0]
      : null

  if (!sessionEntry) {
  }

  const isInitialising = initialising

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="relative h-12 pt-2">
            <div className="text-xl absolute text-center w-screen font-semibold font-rounded mt-1">
              Surreal Tales
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col h-full">
          <div className="bg-black flex-1 p-4">
            {sessionLoaded ? (
              <div>
                <div className="text-left align top font-mono">
                  Hello, {userEntry.display_name}. Before we begin, what is the
                  name of your character?
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="bg-gray-800 h-48">
            <IonCard></IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ReactComponent

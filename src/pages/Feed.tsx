import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonContent,
  IonItem,
  IonIcon,
} from "@ionic/react"

import { search } from "ionicons/icons"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../scripts/firebase"
import { segment } from "../scripts/segment"

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

  useEffect(() => {
    segment.page()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="relative h-12 pt-2">
            <div className="text-xl absolute text-center w-screen font-semibold font-rounded mt-1">
              Surreal Tales
            </div>
            <div className="pr-2 absolute right-0 cursor-pointer">
              <Link to="/app/profile/settings">
                <IonIcon size="large" slot="end" icon={search.md} />
              </Link>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col w-full">
          <IonItem color="transparent" lines="full">
            <div className="flex flex-col pt-6 pb-8 pl-2">
              <div className="text-gray-400">27 Dec 2019</div>
              <div className="flex flex-row mt-1">
                <div className="flex flex-col w-2/3">
                  <div className="flex-1 text-xl font-semibold font-rounded pt-1 pr-8">
                    Title of my Story Title of my Story
                  </div>
                  <div className="flex-1 text-gray-400 pt-2">
                    Subtitle Subtitle Subtitle...
                  </div>
                </div>
                <div>
                  <img src="https://via.placeholder.com/80" alt="" />
                </div>
              </div>
              <div className="flex flex-row w-full mt-4">
                <div className="w-2/3">
                  <span className="font-rounded font-semibold">@ben</span>
                  <span className="mx-1 text-gray-400">as</span>
                  <span className="font-rounded font-semibold">Shrek</span>
                </div>
                <div className="w-20 text-center font-rounded font-semibold">
                  25 <span className="text-red-400">❤</span>
                </div>
              </div>
            </div>
          </IonItem>
          <IonItem color="transparent" lines="full">
            <div className="flex flex-col pt-6 pb-8 pl-2">
              <div className="text-gray-400">27 Dec 2019</div>
              <div className="flex flex-row mt-1">
                <div className="flex flex-col w-2/3">
                  <div className="flex-1 text-xl font-semibold font-rounded pt-1 pr-8">
                    Title of my Story Title of my Story
                  </div>
                  <div className="flex-1 text-gray-400 pt-2">
                    Subtitle Subtitle Subtitle...
                  </div>
                </div>
                <div>
                  <img src="https://via.placeholder.com/80" alt="" />
                </div>
              </div>
              <div className="flex flex-row w-full mt-4">
                <div className="w-2/3">
                  <span className="font-rounded font-semibold">@ben</span>
                  <span className="mx-1 text-gray-400">as</span>
                  <span className="font-rounded font-semibold">Shrek</span>
                </div>
                <div className="w-20 text-center font-rounded font-semibold">
                  25 ♡
                </div>
              </div>
            </div>
          </IonItem>
          <IonItem color="transparent" lines="full">
            <div className="flex flex-col pt-6 pb-8 pl-2">
              <div className="text-gray-400">27 Dec 2019</div>
              <div className="flex flex-row mt-1">
                <div className="flex flex-col w-2/3">
                  <div className="flex-1 text-xl font-semibold font-rounded pt-1 pr-8">
                    Title of my Story Title of my Story
                  </div>
                  <div className="flex-1 text-gray-400 pt-2">
                    Subtitle Subtitle Subtitle...
                  </div>
                </div>
                <div>
                  <img src="https://via.placeholder.com/80" alt="" />
                </div>
              </div>
              <div className="flex flex-row w-full mt-4">
                <div className="w-2/3">
                  <span className="font-rounded font-semibold">@ben</span>
                  <span className="mx-1 text-gray-400">as</span>
                  <span className="font-rounded font-semibold">Shrek</span>
                </div>
                <div className="w-20 text-center font-rounded font-semibold">
                  25 <span className="text-red-400">❤</span>
                </div>
              </div>
            </div>
          </IonItem>
          <IonItem color="transparent" lines="full">
            <div className="flex flex-col pt-6 pb-8 pl-2">
              <div className="text-gray-400">27 Dec 2019</div>
              <div className="flex flex-row mt-1">
                <div className="flex flex-col w-2/3">
                  <div className="flex-1 text-xl font-semibold font-rounded pt-1 pr-8">
                    Title of my Story Title of my Story
                  </div>
                  <div className="flex-1 text-gray-400 pt-2">
                    Subtitle Subtitle Subtitle...
                  </div>
                </div>
                <div>
                  <img src="https://via.placeholder.com/80" alt="" />
                </div>
              </div>
              <div className="flex flex-row w-full mt-4">
                <div className="w-2/3">
                  <span className="font-rounded font-semibold">@ben</span>
                  <span className="mx-1 text-gray-400">as</span>
                  <span className="font-rounded font-semibold">Shrek</span>
                </div>
                <div className="w-20 text-center font-rounded font-semibold">
                  25 ♡
                </div>
              </div>
            </div>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ReactComponent

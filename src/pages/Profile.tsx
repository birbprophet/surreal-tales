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

import { menu } from "ionicons/icons"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../scripts/firebase"
import { segment } from "../scripts/segment"

import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

import { ReactComponent as DefaultProfilePicSvg } from "../components/assets/default_profile_pic/default_profile_pic.svg"

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
    variables: { id: user ? user.uid : "" },
  })

  const userEntry: IUserEntry | null =
    userData && userData.users && userData.users.length > 0
      ? userData.users[0]
      : null

  useEffect(() => {
    segment.page()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="relative h-12 pt-2">
            <div className="text-xl absolute text-center w-screen font-semibold font-rounded mt-1">
              {userEntry ? "@" + userEntry.username : ""}
            </div>
            <div className="pr-2 absolute right-0 cursor-pointer">
              <Link to="/app/profile/settings">
                <IonIcon size="large" slot="end" icon={menu.md} />
              </Link>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="px-4 pt-6">
          <IonItem color="transparent" lines="none">
            <div className="flex flex-row">
              <div className="w-20">
                <DefaultProfilePicSvg />
              </div>
              <div className="flex-1 flex content-center flex-wrap pl-6">
                <div className="w-full text-xl font-rounded font-semibold">
                  {userEntry && userEntry.display_name
                    ? userEntry.display_name.slice(0, 22)
                    : ""}
                </div>
                <div className="w-full pt-1">
                  {userEntry && userEntry.bio ? (
                    userEntry.bio
                  ) : (
                    <i>(add a bio)</i>
                  )}
                </div>
              </div>
            </div>
          </IonItem>
        </div>
        <div className="pl-8 pt-4 pb-6">
          <IonItem color="transparent" lines="none">
            <div className="flex flex-row items-stretch w-full">
              <div className="flex-1">
                <div className="text-2xl font-rounded font-semibold">10</div>
                <div className="pt-1">Stories</div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-rounded font-semibold">10</div>
                <div className="pt-1">Followers</div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-rounded font-semibold">10</div>
                <div className="pt-1">Following</div>
              </div>
            </div>
          </IonItem>
        </div>
        <div className="flex flex-row w-full mb-8">
          <button className="flex-1 ml-4 mr-1 py-2 font-semibold rounded bg-black text-gray-400">
            EDIT PROFILE
          </button>
          <button className="flex-1 mr-4 ml-1 py-2 font-semibold rounded bg-black text-gray-400">
            VIEW SAVED
          </button>
        </div>
        <div className="bg-gray-800 pt-6 pb-2 pl-8 text-xl font-bold">
          Your Recent Stories
        </div>
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
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ReactComponent

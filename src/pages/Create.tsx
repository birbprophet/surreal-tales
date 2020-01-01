import React, { useEffect, useState } from "react"
import { IonHeader, IonToolbar, IonPage, IonContent } from "@ionic/react"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../scripts/firebase"
import { segment } from "../scripts/segment"

import { useQuery } from "@apollo/react-hooks"

import Typist from "react-typist"

import CreateLoader from "../components/CreateLoader"

import {
  GET_USER_ENTRY_FROM_UID,
  GET_CURRENT_SESSION_FROM_UID,
  GET_ALL_OPEN_SESSION_ROOM_CODE,
} from "../graphql/queries"
import { IUserEntry } from "../graphql/interfaces"

import { generateRoomCode } from "../scripts/interactions"

const ActionButton = ({
  text,
  handleClick,
  hidden,
}: {
  text: string
  handleClick: any
  hidden?: boolean
}) => {
  return (
    <div
      className={
        "bg-gray-400 text-gray-900 h-12 text-center font-mono rounded-lg mx-4 mt-4 font-semibold " +
        (hidden ? "hidden" : "")
      }
      style={{ lineHeight: "48px" }}
      onClick={handleClick}
    >
      {text}
    </div>
  )
}

const Page: React.FC = () => {
  const [user] = useAuthState(auth)
  const [initialiseTextCompleted, setInitialiseTextCompleted] = useState(false)
  const [joinAdventureChoice, setJoinAdventureChoice] = useState<string | null>(
    null
  )
  const { loading: userLoading, data: userData } = useQuery(
    GET_USER_ENTRY_FROM_UID,
    {
      variables: { user_id: user ? user.uid : "" },
    }
  )
  const { loading: sessionLoading, data: sessionData } = useQuery(
    GET_CURRENT_SESSION_FROM_UID,
    {
      variables: { user_id: user ? user.uid : "" },
    }
  )
  const { loading: roomCodesLoading, data: roomCodesData } = useQuery(
    GET_ALL_OPEN_SESSION_ROOM_CODE
  )

  useEffect(() => {
    segment.page()
  }, [])

  const userEntry: IUserEntry | null =
    userData && userData.users && userData.users.length > 0
      ? userData.users[0]
      : null

  const sessionEntry =
    sessionData && sessionData.sessions && sessionData.sessions.length > 0
      ? sessionData.sessions[0]
      : null

  const roomCodes =
    roomCodesData && roomCodesData.sessions
      ? roomCodesData.sessions.map((item: any) => item.room_code)
      : null

  const isLoading = userLoading || sessionLoading || roomCodesLoading
  console.log(roomCodes)

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
        <div className="flex flex-col h-full relative">
          <div className="bg-black flex-1 px-4 py-6">
            <div className="text-left align top font-mono">
              {isLoading ? (
                <CreateLoader isLoading={isLoading} />
              ) : userEntry && !sessionEntry ? (
                <span>
                  <Typist
                    startDelay={1000}
                    cursor={{
                      show: true,
                      blink: true,
                      element: "_",
                      hideWhenDone: joinAdventureChoice === null,
                    }}
                    onTypingDone={() => setInitialiseTextCompleted(true)}
                  >
                    Hello {userEntry.display_name}!
                    <Typist.Delay ms={1000} />
                    <br />
                    Would you like to start a new adventure or join an existing
                    one?
                  </Typist>
                </span>
              ) : (
                <></>
              )}
              {joinAdventureChoice === "join" ? (
                <span>
                  <br />> Join an existing adventure
                  <Typist
                    startDelay={1000}
                    cursor={{
                      show: true,
                      blink: true,
                      element: "_",
                    }}
                  >
                    Please enter the room code of the adventure you would like
                    to join:
                    <br />
                  </Typist>
                </span>
              ) : (
                <></>
              )}
              {joinAdventureChoice === "create" ? (
                <span>
                  <br />> Create a new adventure
                  <Typist
                    startDelay={1000}
                    cursor={{
                      show: true,
                      blink: true,
                      element: "_",
                    }}
                  >
                    Creating a new adventure...
                  </Typist>
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="bg-gray-800 h-48 absolute bottom-0 inset-x-0 rounded-t-lg">
            <div>
              <ActionButton
                text="Create a new adventure"
                handleClick={() => setJoinAdventureChoice("create")}
                hidden={
                  !initialiseTextCompleted && joinAdventureChoice === null
                }
              />
              <ActionButton
                text="Join an existing adventure"
                handleClick={() => setJoinAdventureChoice("join")}
                hidden={
                  !initialiseTextCompleted && joinAdventureChoice === null
                }
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Page

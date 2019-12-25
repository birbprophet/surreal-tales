import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import {
  IonContent,
  IonSlides,
  IonSlide,
  IonPage,
  IonLoading,
  IonInput,
  IonButton,
} from "@ionic/react"

import Typist from "react-typist"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../scripts/firebase"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { ReactComponent as WelcomeSvg } from "../components/assets/welcome/welcome.svg"
import { ReactComponent as UsernameSvg } from "../components/assets/username/username.svg"

const GET_USERNAME = gql`
  query getUsername($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
    }
  }
`

const ADD_USER_ENTRY = gql`
  mutation addUserEntry(
    $username: String!
    $display_name: String!
    $email: String!
  ) {
    insert_users(
      objects: {
        username: $username
        display_name: $display_name
        email: $email
      }
    ) {
      affected_rows
    }
  }
`

const Page: React.FC = () => {
  const [user, initialising] = useAuthState(auth)
  const [inputUsername, setInputUsername] = useState<string>("")
  const [invalidMessage, setInvalidMessage] = useState<string | null>("")

  const { loading, data } = useQuery(GET_USERNAME, {
    variables: { username: inputUsername },
  })

  const [
    addUserEntry,
    { data: insertData, loading: insertLoading },
  ] = useMutation(ADD_USER_ENTRY)

  const handleConfirmUsername = () => {
    if (user) {
      addUserEntry({
        variables: {
          username: inputUsername,
          display_name: user.displayName,
          email: user.email,
        },
      })
    } else {
      setInvalidMessage("You are not logged in")
    }
  }

  let username: string | null
  if (!loading && data && data.users.length === 1) {
    username = data.users[0].username
  } else if (data) {
    username = null
  } else {
    username = ""
  }

  const usernameIsAvailable = username === null
  const isInitialising = initialising || insertLoading

  if (
    !inputUsername.match(/^[a-z0-9_][a-z0-9._]+[a-z0-9_]$/) ||
    inputUsername.match(/\.\./)
  ) {
    if (inputUsername === "") {
      const newInvalidMessage = ""
      if (invalidMessage !== newInvalidMessage) {
        setInvalidMessage(newInvalidMessage)
      }
    } else if (inputUsername.match(/^\./) || inputUsername.match(/\.$/)) {
      const newInvalidMessage = "Username cannot start or end with ."
      if (invalidMessage !== newInvalidMessage) {
        setInvalidMessage(newInvalidMessage)
      }
    } else if (inputUsername.match(/\.\./)) {
      const newInvalidMessage = "Username cannot contain more than 1 . in a row"
      if (invalidMessage !== newInvalidMessage) {
        setInvalidMessage(newInvalidMessage)
      }
    } else if (inputUsername.length < 3) {
      const newInvalidMessage = "Username must be at least 3 characters long"
      if (invalidMessage !== newInvalidMessage) {
        setInvalidMessage(newInvalidMessage)
      }
    } else {
      const newInvalidMessage =
        "Username can only contain letters, numbers, ., or _"
      if (invalidMessage !== newInvalidMessage) {
        setInvalidMessage(newInvalidMessage)
      }
    }
  } else {
    if (isInitialising) {
      const newInvalidMessage = "Checking if username is available..."
      if (invalidMessage !== newInvalidMessage) {
        setInvalidMessage(newInvalidMessage)
      }
    } else if (!usernameIsAvailable) {
      const newInvalidMessage = "This username is already taken"
      if (invalidMessage !== newInvalidMessage) {
        setInvalidMessage(newInvalidMessage)
      }
    } else {
      const newInvalidMessage = null
      if (invalidMessage !== newInvalidMessage) {
        setInvalidMessage(newInvalidMessage)
      }
    }
  }

  return initialising || !user ? (
    <IonPage>
      <IonContent>
        <IonLoading isOpen={initialising} translucent />
      </IonContent>
    </IonPage>
  ) : insertData ? (
    <Redirect to="/app" />
  ) : (
    <IonPage>
      <IonContent>
        <IonSlides>
          <IonSlide>
            <div className="flex content-center flex-wrap h-screen mx-8">
              <div>
                <WelcomeSvg className="w-full h-48" />
                <div className="text-4xl font-rounded font-semibold leading-normal text-center mb-12 mt-8 h-24">
                  <Typist
                    startDelay={0}
                    cursor={{
                      show: true,
                      blink: true,
                      element: "_",
                      hideWhenDone: true,
                      hideWhenDoneDelay: 0,
                    }}
                  >
                    Hello!
                    <Typist.Delay ms={1000} />
                    {Array.prototype.map.call("Hello!", char => (
                      <Typist.Backspace key={char} count={1} delay={50} />
                    ))}
                    Welcome to
                    <br />
                    <span className="text-5xl">Surreal Tales</span>
                  </Typist>
                </div>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="flex content-center flex-wrap h-screen mx-8">
              <div>
                <UsernameSvg className="w-full h-48" />
                <div className="text-4xl font-rounded font-semibold leading-normal text-center mb-12 mt-8 h-24">
                  Pick a username:
                  <div className="tracking-wide border-gray-400 -mt-2">
                    <IonInput
                      value={inputUsername === "" ? "" : "@" + inputUsername}
                      placeholder={"@username"}
                      debounce={500}
                      inputmode={"text"}
                      maxlength={13}
                      minlength={1}
                      onIonChange={event => {
                        const newInputUsername = (event.detail.value || "")
                          .replace("@", "")
                          .toLowerCase()
                        if (newInputUsername !== inputUsername) {
                          setInputUsername(newInputUsername)
                        }
                      }}
                    />
                  </div>
                  {invalidMessage ? (
                    <div className="text-xl text-red-500 mx-10">
                      {invalidMessage}
                    </div>
                  ) : (
                    <></>
                  )}
                  {invalidMessage === null ? (
                    <div className="mt-4">
                      <IonButton
                        size="large"
                        expand="block"
                        onClick={handleConfirmUsername}
                      >
                        <div className="text-lg font-rounded font-semibold">
                          CONFIRM USERNAME
                        </div>
                      </IonButton>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

export default Page

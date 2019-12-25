import React, { useState } from "react"

import {
  IonContent,
  IonSlides,
  IonSlide,
  IonPage,
  IonLoading,
} from "@ionic/react"

import Typist from "react-typist"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../scripts/firebase"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

import { ReactComponent as WelcomeSvg } from "../components/assets/welcome/welcome.svg"

const GET_USERNAME = gql`
  query getUserEntry($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
    }
  }
`

const Page: React.FC = () => {
  const [user, initialising] = useAuthState(auth)
  const [inputUsername, setInputUsername] = useState("")

  const { loading, data } = useQuery(GET_USERNAME, {
    variables: { username: inputUsername },
  })

  return initialising || !user ? (
    <IonPage>
      <IonContent>
        <IonLoading isOpen={initialising} translucent />
      </IonContent>
    </IonPage>
  ) : (
    <IonPage>
      <IonContent>
        <IonSlides>
          <IonSlide>
            <div className="flex content-center flex-wrap h-screen mx-8">
              <div>
                <WelcomeSvg className="w-full" />
                <div className="text-4xl font-rounded font-semibold leading-normal text-center pb-8 mt-8 h-24">
                  <Typist
                    startDelay={500}
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
            <h3>Slide 2</h3>
          </IonSlide>
          <IonSlide>
            <h3>Slide 3</h3>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  )
}

export default Page

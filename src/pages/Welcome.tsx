import React, { useState } from "react"

import {
  IonContent,
  IonSlides,
  IonSlide,
  IonPage,
  IonLoading,
} from "@ionic/react"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../scripts/firebase"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

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

  return initialising ? (
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
            <h3>Slide 1</h3>>
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

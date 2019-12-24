import React, { useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"

import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"

import LogRocket from "logrocket"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, firebaseApp } from "./scripts/firebase"
import { segment } from "./scripts/segment"

import { setupConfig, IonApp } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"
import "typeface-roboto"
import "typeface-asap"
import "./css/index.css"
import "./css/fonts.css"
import "./css/typist.css"
import "./css/styles.css"

import Login from "./pages/Login"
import AppPage from "./pages/AppPage"
import Home from "./pages/Home"
import Welcome from "./pages/Welcome"

LogRocket.init("hjzdrl/surreal-tales")

setupConfig({
  mode: "ios",
})

interface IAuthState {
  status: string
  user?: any
  token?: string
}

const App: React.FC = () => {
  const [user] = useAuthState(auth)
  const [userToken, setUserToken] = useState<string | null>(null)

  useEffect(() => {
    if (user && user.email) {
      LogRocket.identify(user.email)
      segment.identify(user.uid, {
        displayName: user.displayName,
        email: user.email,
      })

      user.getIdTokenResult().then(idTokenResult => {
        if (idTokenResult.claims["https://hasura.io/jwt/claims"]) {
          user.getIdToken().then(token => setUserToken(token))
        } else {
          firebaseApp
            .database()
            .ref("metadata/" + user.uid + "/refreshTime")
            .on("value", async () => {
              user.getIdToken(true).then(token => setUserToken(token))
            })
        }
      })
    }
  }, [user])

  const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {}

  const client = new ApolloClient({
    uri: "https://surreal-adventures.herokuapp.com/v1/graphql",
    headers,
  })

  return (
    <ApolloProvider client={client}>
      <IonApp>
        <IonReactRouter>
          <Route
            path="/"
            render={() =>
              user ? <Redirect to="/app" /> : <Redirect to="/home" />
            }
            exact={true}
          />
          <Route path="/home" component={Home} exact={true} />
          <Route
            path="/login"
            render={() => (user ? <Redirect to="/app" /> : <Login />)}
            exact={true}
          />
          <Route path="/app" component={AppPage} />
          <Route path="/welcome" component={Welcome} />
        </IonReactRouter>
      </IonApp>
    </ApolloProvider>
  )
}

export default App

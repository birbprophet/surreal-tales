import React, { useEffect } from "react"
import { Route, Redirect } from "react-router-dom"

import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"

import LogRocket from "logrocket"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, analytics } from "./scripts/firebase"

import { setupConfig, IonApp, IonLoading } from "@ionic/react"
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
import Tabs from "./pages/Tabs"
import Home from "./pages/Home"

LogRocket.init("hjzdrl/surreal-tales")

setupConfig({
  mode: "ios",
})

const client = new ApolloClient({
  uri: "https://surreal-adventures.herokuapp.com/v1/graphql",
})

const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const [user, initialising] = useAuthState(auth)
  return (
    <Route
      {...rest}
      render={props => {
        return user || initialising ? (
          initialising ? (
            <>
              <Component {...props} />
              <IonLoading isOpen={true} translucent />
            </>
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }}
    />
  )
}

const App: React.FC = () => {
  const [user] = useAuthState(auth)

  useEffect(() => {
    analytics.logEvent("loaded_app")
    if (user && user.email) {
      LogRocket.identify(user.email)
    }
  }, [user])

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
          <ProtectedRoute path="/app" component={Tabs} />
        </IonReactRouter>
      </IonApp>
    </ApolloProvider>
  )
}

export default App

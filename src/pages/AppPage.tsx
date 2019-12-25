import React from "react"
import { Redirect, Route } from "react-router-dom"
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLoading,
} from "@ionic/react"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../scripts/firebase"

import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

import { apps, flash, send } from "ionicons/icons"

import Tab1 from "./Tab1"
import Tab2 from "./Tab2"
import Profile from "./Profile"
import Details from "./Details"

const GET_USERNAME_FROM_EMAIL = gql`
  query getUserEntry($email: String!) {
    users(where: { email: { _eq: $email } }) {
      username
    }
  }
`

const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const [user, initialising] = useAuthState(auth)
  const { loading, data } = useQuery(GET_USERNAME_FROM_EMAIL, {
    variables: { email: user ? user.email : "" },
  })

  let username: string | null
  if (!loading && data && data.users.length === 1) {
    username = data.users[0].username
  } else if (data) {
    username = null
  } else {
    username = ""
  }

  const isInitialising = initialising || loading || username === ""

  return (
    <Route
      {...rest}
      render={props => {
        return user || isInitialising ? (
          isInitialising ? (
            // if loading
            <>
              <Component {...props} />
              <IonLoading isOpen={true} translucent />
            </>
          ) : username ? (
            // if loaded and user exists
            <Component {...props} />
          ) : (
            // if loaded but user does not exist
            <Redirect
              to={{ pathname: "/welcome", state: { from: props.location } }}
            />
          )
        ) : (
          // if user is not logged in
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }}
    />
  )
}

const ReactComponent: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <ProtectedRoute path="/app/tab1" component={Tab1} exact={true} />
        <ProtectedRoute path="/app/tab2" component={Tab2} exact={true} />
        <ProtectedRoute path="/app/tab2/details" component={Details} />
        <ProtectedRoute path="/app/profile" component={Profile} />
        <Route
          path="/app"
          render={() => <Redirect to="/app/tab1" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/app/tab1">
          <IonIcon icon={flash} />
          <IonLabel>Tab One</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/app/tab2">
          <IonIcon icon={apps} />
          <IonLabel>Tab Two</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={send} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default ReactComponent

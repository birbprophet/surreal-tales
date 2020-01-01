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

import { useQuery } from "@apollo/react-hooks"

import { home, addCircle, contact } from "ionicons/icons"

import Feed from "./Feed"
import Create from "./Create"
import Profile from "./Profile"
import Settings from "./Settings"

import { GET_USERNAME_FROM_EMAIL } from "../graphql/queries"

const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const [user, initialising] = useAuthState(auth)
  const { loading: userLoading, data: userData } = useQuery(
    GET_USERNAME_FROM_EMAIL,
    {
      variables: { email: user ? user.email : "" },
    }
  )

  const isInitialising = initialising || userLoading
  const usernameExists =
    !userLoading &&
    userData &&
    userData.users &&
    userData.users.length > 0 &&
    userData.users[0].username

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
          ) : user && usernameExists ? (
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
        <ProtectedRoute path="/app/feed" component={Feed} exact={true} />
        <ProtectedRoute path="/app/create" component={Create} exact={true} />
        <ProtectedRoute path="/app/profile" component={Profile} exact={true} />
        <ProtectedRoute
          path="/app/profile/settings"
          component={Settings}
          exact={true}
        />
        <Route
          path="/app"
          render={() => <Redirect to="/app/profile" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="feed" href="/app/feed">
          <IonIcon icon={home.md} />
          <IonLabel>Feed</IonLabel>
        </IonTabButton>
        <IonTabButton tab="create" href="/app/create">
          <IonIcon icon={addCircle.md} />
          <IonLabel>Create</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={contact.md} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default ReactComponent

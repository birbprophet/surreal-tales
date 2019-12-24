import React, { useEffect } from "react"
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
import { auth, analytics } from "../scripts/firebase"

import { apps, flash, send } from "ionicons/icons"

import Tab1 from "./Tab1"
import Tab2 from "./Tab2"
import Profile from "./Profile"
import Details from "./Details"

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

const ReactComponent: React.FC = () => {
  const [user] = useAuthState(auth)

  useEffect(() => {
    analytics.logEvent("entered_app_page")
  }, [])

  useEffect(() => {
    if (user) {
      analytics.logEvent("logged_in")
    }
  }, [user])

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

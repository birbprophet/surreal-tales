import React from "react"
import { Redirect, Route } from "react-router-dom"
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react"

import { apps, flash, send } from "ionicons/icons"

import Tab1 from "./Tab1"
import Tab2 from "./Tab2"
import Tab3 from "./Tab3"
import Details from "./Details"

const ReactComponent: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/tab1" component={Tab1} exact={true} />
        <Route path="/app/tab2" component={Tab2} exact={true} />
        <Route path="/app/tab2/details" component={Details} />
        <Route path="/app/tab3" component={Tab3} />
        <Route
          path="/tabs"
          render={() => <Redirect to="/tabs/tab1" />}
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
        <IonTabButton tab="tab3" href="/app/tab3">
          <IonIcon icon={send} />
          <IonLabel>Tab Three</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default ReactComponent

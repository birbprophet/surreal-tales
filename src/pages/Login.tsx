import React, { useState, useEffect, useRef } from "react"

import { useSpring, animated } from "react-spring"
import { Link, Redirect } from "react-router-dom"

import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonLoading,
} from "@ionic/react"
import {
  auth,
  analytics,
  googleProvider,
  facebookProvider,
} from "../scripts/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import Typist from "react-typist"
import SvgLines from "react-mt-svg-lines"

import MenuIcon from "../components/MenuIcon"
import MenuOverlay from "../components/MenuOverlay"

import DreamerAnimation from "../components/assets/dreamer/DreamerAnimation"
import { ReactComponent as DreamerTraceSvg } from "../components/assets/dreamer/dreamer_trace.svg"

import { logoFacebook, logoGoogle } from "ionicons/icons"
import { segment } from "../scripts/segment"

const Page: React.FC = () => {
  const [user, initialising] = useAuthState(auth)
  const [menuOpen, setMenuOpen] = useState(false)
  const dreamerLoaded = useRef(false)

  const loginWithGoogle = () => auth.signInWithRedirect(googleProvider)
  const loginWithFacebook = () => auth.signInWithRedirect(facebookProvider)

  const loadedFadeInProps = useSpring({
    from: { opacity: 0 },
    to: async (next: any) => {
      if (!dreamerLoaded.current) {
        await next({ opacity: 1 })
        await next({ opacity: 0 })
      }
    },
    config: { duration: 4000 },
  })

  const loadedDelayFadeInProps = useSpring({
    from: { opacity: dreamerLoaded.current ? 1 : 0 },
    to: async (next: any) => {
      if (!dreamerLoaded.current) {
        await next({ opacity: 0.1 })
        await next({ opacity: 1 })
        dreamerLoaded.current = true
      }
    },
    config: { duration: 4000 },
  })

  const toggleMenuOpen = () => setMenuOpen(!menuOpen)
  const trackLogin = () => {
    segment.track("Login")
    analytics.logEvent("user_login")
  }

  useEffect(() => {
    segment.page()
  }, [])

  const isInitialising = initialising

  return isInitialising || !user ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <IonButtons slot="start">
              <div className="font-rounded font-semibold text-gray-100 text-2xl flex-1 py-4 pl-6 flex">
                <div>Surreal Tales</div>
                <Typist
                  avgTypingDelay={100}
                  startDelay={1000}
                  cursor={{
                    show: true,
                    blink: true,
                    element: "_",
                    hideWhenDone: false,
                  }}
                ></Typist>
              </div>
            </IonButtons>
          </Link>
          <IonButtons slot="end">
            <MenuIcon menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <MenuOverlay menuOpen={menuOpen} />
        <div className="text-gray-300 stroke-current relative mx-12 mt-12">
          <SvgLines animate={true} duration={4000}>
            <animated.div style={loadedFadeInProps}>
              <DreamerTraceSvg />
            </animated.div>
          </SvgLines>
          <div className="absolute top-0">
            <animated.div style={loadedDelayFadeInProps}>
              <DreamerAnimation playingState={"playing"} />
            </animated.div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 flex flex-col mb-16 mx-8">
          <IonButton
            size="large"
            onClick={() => {
              trackLogin()
              loginWithGoogle()
            }}
          >
            <IonIcon icon={logoGoogle} slot="start" />
            <div className="text-lg font-rounded font-semibold">
              LOGIN WITH GOOGLE
            </div>
          </IonButton>

          <IonButton
            size="large"
            onClick={() => {
              trackLogin()
              loginWithFacebook()
            }}
          >
            <IonIcon icon={logoFacebook} slot="start" />
            <div className="text-lg font-rounded font-semibold">
              LOGIN WITH FACEBOOK
            </div>
          </IonButton>
        </div>
        {isInitialising ? (
          <IonLoading isOpen={isInitialising} translucent />
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  ) : (
    <Redirect to="/app" />
  )
}

export default Page

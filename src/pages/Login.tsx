import React, { useState, useEffect, useRef } from "react"

import { useSpring, animated } from "react-spring"
import { Link } from "react-router-dom"

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

const Page: React.FC = () => {
  const [, initialising] = useAuthState(auth)
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

  useEffect(() => {
    analytics.logEvent("visited_login_page")
  }, [])

  return (
    <IonPage>
      {/* HOME HEADER SECTION */}
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

      {/* HOME CONTENT SECTION */}
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

        {/* SECTION ONE */}
        <div className="absolute bottom-0 inset-x-0 flex flex-col mb-16 mx-8">
          <IonButton
            size="large"
            onClick={() => {
              loginWithGoogle()
            }}
          >
            <IonIcon icon={logoGoogle} size="large" slot="start" />
            <div className="text-lg font-rounded font-semibold">
              LOGIN WITH GOOGLE
            </div>
          </IonButton>

          <IonButton
            size="large"
            onClick={() => {
              loginWithFacebook()
            }}
          >
            <IonIcon icon={logoFacebook} size="large" slot="start" />
            <div className="text-lg font-rounded font-semibold">
              LOGIN WITH FACEBOOK
            </div>
          </IonButton>
        </div>
        <IonLoading isOpen={initialising} translucent />
      </IonContent>
    </IonPage>
  )
}

export default Page

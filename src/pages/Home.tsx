import React, { useState, useEffect, useRef } from "react"

import { useSpring, animated } from "react-spring"
import useIsInViewport from "use-is-in-viewport"

import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
} from "@ionic/react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, analytics } from "../scripts/firebase"

import Typist from "react-typist"
import TypistLoop from "react-typist-loop"
import SvgLines from "react-mt-svg-lines"

import MenuIcon from "../components/MenuIcon"
import MenuOverlay from "../components/MenuOverlay"
import FloatingIconSection from "../components/FloatingIconsSection"

import OptionsAnimation from "../components/assets/options/OptionsAnimation"

import { ReactComponent as OptionsTraceSvg } from "../components/assets/options/options_trace.svg"
import { ReactComponent as ProfileTraceSvg } from "../components/assets/profile/profile_trace.svg"
import { ReactComponent as ProfileSvg } from "../components/assets/profile/profile.svg"

const Page: React.FC = () => {
  const [user] = useAuthState(auth)
  const [menuOpen, setMenuOpen] = useState(false)
  const optionsLoaded = useRef(false)

  const [sectionTwoIsInViewport, sectionTwoTargetRef] = useIsInViewport({
    threshold: 50,
  })
  const [profileTraceCompleted, setProfileTraceCompleted] = useState(false)

  const toggleMenuOpen = () => setMenuOpen(!menuOpen)

  const loadedFadeInProps = useSpring({
    from: { opacity: 0 },
    to: async (next: any) => {
      if (!optionsLoaded.current) {
        await next({ opacity: 1 })
        await next({ opacity: 0 })
      }
    },
    config: { duration: 4000 },
  })

  const loadedDelayFadeInProps = useSpring({
    from: { opacity: optionsLoaded.current ? 1 : 0 },
    to: async (next: any) => {
      if (!optionsLoaded.current) {
        await next({ opacity: 0.1 })
        await next({ opacity: 1 })
        optionsLoaded.current = true
      }
    },
    config: { duration: 4000 },
  })

  const profileSvgProps = useSpring({ opacity: profileTraceCompleted ? 1 : 0 })
  const profileTraceSvgProps = useSpring({
    opacity: profileTraceCompleted ? 0 : 1,
  })

  useEffect(() => {
    analytics.logEvent("visited_home_page")
  }, [user])

  const typistLoopTextList: string[] = [
    "Stories",
    "Crossovers",
    "Adventures",
    "Fanfics",
    "Memes",
  ]

  return (
    <IonPage>
      {/* HOME HEADER SECTION */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <div className="font-rounded font-semibold text-gray-100 text-2xl flex-1 py-4 pl-6">
              <Typist
                avgTypingDelay={100}
                startDelay={1000}
                cursor={{
                  show: true,
                  blink: true,
                  element: "_",
                  hideWhenDone: false,
                }}
              >
                Surreal <Typist.Delay ms={500} />
                Tales
              </Typist>
            </div>
          </IonButtons>
          <IonButtons slot="end">
            <MenuIcon menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* HOME CONTENT SECTION */}
      <IonContent>
        <MenuOverlay menuOpen={menuOpen} />
        <FloatingIconSection />

        {/* SECTION ONE */}
        <div className=" relative top-0 inset-x-0 flex flex-col h-full font-rounded font-bold text-gray-200 text-4xl text-left tracking-normal leading-tight">
          <div className="p-8">
            <div className="flex">
              <div className="mr-2">Create </div>
              <div>
                <TypistLoop interval={3000}>
                  {typistLoopTextList.map((text, idx) => (
                    <Typist
                      key={idx}
                      startDelay={500}
                      cursor={{
                        show: false,
                        blink: true,
                        element: "_",
                      }}
                    >
                      {text}
                      <Typist.Delay ms={4000} />
                      {Array.prototype.map.call(text, char => (
                        <Typist.Backspace key={char} count={1} delay={50} />
                      ))}
                    </Typist>
                  ))}
                </TypistLoop>
              </div>
            </div>
            <div>you never knew</div>
            <div>you wanted</div>

            <div className="text-gray-400 mt-8 text-lg font-normal">
              Generate your own unique stories by interacting with an AI via
              "choose your adventure" style prompts.
            </div>
          </div>

          <div className="flex-1" />

          <div className="text-center mx-8 mb-8 bottom-0 relative">
            <div className="text-gray-300 stroke-current">
              <SvgLines animate={true} duration={4000}>
                <animated.div style={loadedFadeInProps}>
                  <OptionsTraceSvg />
                </animated.div>
              </SvgLines>
              <div className="absolute top-0">
                <animated.div style={loadedDelayFadeInProps}>
                  <OptionsAnimation playingState={"playing"} />
                </animated.div>
              </div>
            </div>

            <div className="bg-gray-300 p-4 mt-2 text-2xl font-rounded font-semibold rounded-lg text-gray-900">
              Create Stories Now
            </div>
          </div>
        </div>

        {/* SECTION TWO */}
        <div
          ref={sectionTwoTargetRef}
          className="sticky flex flex-col h-full p-8 font-rounded font-bold text-gray-200 text-3xl text-left tracking-normal leading-tight"
        >
          <div className="mr-2 mb-4">
            Choose or create any character you want
          </div>
          <div className="text-center mb-8 mt-4 mr-10 relative">
            <div className="text-gray-300 stroke-current h-24">
              <SvgLines
                animate={
                  sectionTwoIsInViewport || profileTraceCompleted
                    ? "play"
                    : "hide"
                }
                duration={4000}
                callback={() => setProfileTraceCompleted(true)}
              >
                <animated.div style={profileTraceSvgProps}>
                  <ProfileTraceSvg />
                </animated.div>
              </SvgLines>
            </div>
            <div className="-mt-24">
              <animated.div style={profileSvgProps}>
                <ProfileSvg />
              </animated.div>
            </div>
          </div>
          <div className="flex-1" />
          <div className="text-lg font-normal">
            Start your adventure by choosing a real or fictional character, or
            create your own by writing a short bio.
          </div>
        </div>

        {/* SECTION THREE */}
        <div
          ref={sectionTwoTargetRef}
          className="relative flex flex-col h-full p-8 font-rounded font-bold text-gray-200 text-2xl text-left tracking-normal leading-tight bg-gray-900"
        >
          <div className="mr-2 mb-4">
            Choose or create
            <br />
            any character you want
          </div>
          <div className="text-center mb-8 mt-4 mr-10 relative">
            <div className="text-gray-300 stroke-current h-24">
              <SvgLines
                animate={
                  sectionTwoIsInViewport || profileTraceCompleted
                    ? "play"
                    : "hide"
                }
                duration={4000}
                callback={() => setProfileTraceCompleted(true)}
              >
                <animated.div style={profileTraceSvgProps}>
                  <ProfileTraceSvg />
                </animated.div>
              </SvgLines>
            </div>
            <div className="-mt-24">
              <animated.div style={profileSvgProps}>
                <ProfileSvg />
              </animated.div>
            </div>
          </div>
          <div className="flex-1" />

          <div className="text-lg font-normal relative bottom-0">
            Generate unique stories by interacting with an AI via "choose your
            adventure" style prompts.
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Page

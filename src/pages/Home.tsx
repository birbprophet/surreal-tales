import React, { useState, useEffect, useRef } from "react"

import { useSpring, animated } from "react-spring"
import useIsInViewport from "use-is-in-viewport"
import { Link } from "react-router-dom"

import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react"
import { auth, analytics } from "../scripts/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

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
import { ReactComponent as ChoicesTraceSvg } from "../components/assets/choices/choices_trace.svg"
import { ReactComponent as ChoicesSvg } from "../components/assets/choices/choices.svg"
import { ReactComponent as AssembleTraceSvg } from "../components/assets/assemble/assemble_trace.svg"
import { ReactComponent as AssembleSvg } from "../components/assets/assemble/assemble.svg"
import { ReactComponent as ShareTraceSvg } from "../components/assets/share/share_trace.svg"
import { ReactComponent as ShareSvg } from "../components/assets/share/share.svg"

const Page: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const optionsLoaded = useRef(false)
  const [user] = useAuthState(auth)

  const [sectionTwoIsInViewport, sectionTwoTargetRef] = useIsInViewport({
    threshold: 100,
  })
  const [sectionThreeIsInViewport, sectionThreeTargetRef] = useIsInViewport({
    threshold: 100,
  })
  const [sectionFourIsInViewport, sectionFourTargetRef] = useIsInViewport({
    threshold: 100,
  })
  const [sectionFiveIsInViewport, sectionFiveTargetRef] = useIsInViewport({
    threshold: 100,
  })

  const [profileTraceCompleted, setProfileTraceCompleted] = useState(false)
  const [choicesTraceCompleted, setChoicesTraceCompleted] = useState(false)
  const [assembleTraceCompleted, setAssembleTraceCompleted] = useState(false)
  const [shareTraceCompleted, setShareTraceCompleted] = useState(false)

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

  const choicesSvgProps = useSpring({ opacity: choicesTraceCompleted ? 1 : 0 })
  const choicesTraceSvgProps = useSpring({
    opacity: choicesTraceCompleted ? 0 : 1,
  })

  const assembleSvgProps = useSpring({
    opacity: assembleTraceCompleted ? 1 : 0,
  })
  const assembleTraceSvgProps = useSpring({
    opacity: assembleTraceCompleted ? 0 : 1,
  })

  const shareSvgProps = useSpring({ opacity: shareTraceCompleted ? 1 : 0 })
  const shareTraceSvgProps = useSpring({
    opacity: shareTraceCompleted ? 0 : 1,
  })

  useEffect(() => {
    analytics.logEvent("visited_home_page")
  }, [])

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
          <Link to="/home" style={{ textDecoration: "none" }}>
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
          </Link>
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
              <div className="text-indigo-300">
                <TypistLoop interval={0}>
                  {typistLoopTextList.map((text, idx) => (
                    <Typist
                      key={idx}
                      startDelay={1000}
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
            <IonButton
              size="large"
              expand="block"
              routerLink={user ? "/app" : "/login"}
            >
              <div className="text-lg font-rounded font-semibold">
                CREATE STORIES NOW
              </div>
            </IonButton>
          </div>
        </div>

        {/* SECTION TWO */}
        <div className="relative flex flex-col h-full p-8 font-rounded font-bold text-gray-200 text-3xl text-left tracking-normal leading-tight">
          <div className="mr-2 mb-4" ref={sectionTwoTargetRef}>
            <div className="font-rounded rounded-full bg-gray-200 text-gray-900 h-10 w-10 text-center align-middle text-3xl mb-2">
              1
            </div>
            Choose or create any character you want
          </div>
          <div className="text-center mb-8 mt-4 mr-10 relative">
            <div className="text-gray-300 stroke-current h-24">
              <SvgLines
                animate={sectionTwoIsInViewport ? "play" : false}
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
            Start your adventure by selecting an existing character, or create
            your own by writing a short bio.
          </div>
        </div>

        {/* SECTION THREE */}
        <div className="relative flex flex-col h-full p-8 font-rounded font-bold text-gray-200 text-3xl text-left tracking-normal leading-tight bg-gray-900">
          <div className="font-rounded rounded-full bg-gray-200 text-gray-900 h-10 w-10 text-center align-middle text-3xl mb-2">
            2
          </div>
          <div className="mr-2 mb-4" ref={sectionThreeTargetRef}>
            Progress by selecting AI generated options
          </div>
          <div className="text-center mb-8 mt-4 mr-10 relative">
            <div className="text-gray-300 stroke-current h-24">
              <SvgLines
                animate={sectionThreeIsInViewport ? "play" : false}
                duration={4000}
                callback={() => setChoicesTraceCompleted(true)}
              >
                <animated.div style={choicesTraceSvgProps}>
                  <ChoicesTraceSvg />
                </animated.div>
              </SvgLines>
            </div>
            <div className="-mt-24">
              <animated.div style={choicesSvgProps}>
                <ChoicesSvg />
              </animated.div>
            </div>
          </div>
          <div className="flex-1" />

          <div className="text-lg font-normal relative bottom-0">
            Based on your selected character and choices, you will be presented
            with different options to shape the story.
          </div>
        </div>

        {/* SECTION FOUR */}
        <div className="relative flex flex-col h-full p-8 font-rounded font-bold text-gray-200 text-3xl text-left tracking-normal leading-tight bg-gray-900">
          <div className="font-rounded rounded-full bg-gray-200 text-gray-900 h-10 w-10 text-center align-middle text-3xl mb-2">
            3
          </div>
          <div className="mr-2 mb-4" ref={sectionFourTargetRef}>
            Piece them together to form unique stories
          </div>
          <div className="text-center mb-8 mt-4 mr-10 relative">
            <div className="text-gray-300 stroke-current h-24">
              <SvgLines
                animate={sectionFourIsInViewport ? "play" : false}
                duration={4000}
                callback={() => setAssembleTraceCompleted(true)}
              >
                <animated.div style={assembleTraceSvgProps}>
                  <AssembleTraceSvg />
                </animated.div>
              </SvgLines>
            </div>
            <div className="-mt-24">
              <animated.div style={assembleSvgProps}>
                <AssembleSvg />
              </animated.div>
            </div>
          </div>
          <div className="flex-1" />

          <div className="text-lg font-normal relative bottom-0">
            All interactions are dynamically generated, so everyone will have
            their own unique tales to share.
          </div>
        </div>

        {/* SECTION FIVE */}
        <div className="relative flex flex-col h-full p-8 font-rounded font-bold text-gray-200 text-3xl text-left tracking-normal leading-tight bg-gray-900">
          <div className="font-rounded rounded-full bg-gray-200 text-gray-900 h-10 w-10 text-center align-middle text-3xl mb-2">
            4
          </div>
          <div className="mr-2 mb-4" ref={sectionFiveTargetRef}>
            Share your surreal tales with friends
          </div>
          <div className="text-center mb-8 mt-4 mr-10 relative">
            <div className="text-gray-300 stroke-current h-24">
              <SvgLines
                animate={sectionFiveIsInViewport ? "play" : false}
                duration={4000}
                callback={() => setShareTraceCompleted(true)}
              >
                <animated.div style={shareTraceSvgProps}>
                  <ShareTraceSvg />
                </animated.div>
              </SvgLines>
            </div>
            <div className="-mt-24">
              <animated.div style={shareSvgProps}>
                <ShareSvg />
              </animated.div>
            </div>
          </div>
          <div className="flex-1" />

          <div className="text-lg font-normal relative bottom-0">
            Save your favourite tales and share them with friends, or even
            create stories together.
          </div>
        </div>
        <div className="bg-indigo-900 text-3xl text-center font-semibold pt-12 pb-8 mt-12 font-rounded">
          <div>
            Start creating your
            <br />
            own surreal tales
            <div className="p-4 mt-6 mx-6">
              <IonButton
                size="large"
                expand="block"
                routerLink={user ? "/app" : "/login"}
              >
                <div className="text-lg font-rounded font-semibold text-indigo-900">
                  CREATE STORIES NOW
                </div>
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Page

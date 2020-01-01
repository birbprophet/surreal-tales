import React from "react"

import Typist from "react-typist"
import TypistLoop from "react-typist-loop"

const Component = (props: { isLoading: boolean }) => {
  return props.isLoading ? (
    <TypistLoop interval={0}>
      <Typist
        startDelay={0}
        cursor={{
          show: false,
          blink: true,
          element: "_",
        }}
      >
        Loading...
        <Typist.Delay ms={1000} />
        {Array.prototype.map.call("Loading...", char => (
          <Typist.Backspace key={char} count={1} delay={50} />
        ))}
      </Typist>
    </TypistLoop>
  ) : (
    <></>
  )
}

export default Component

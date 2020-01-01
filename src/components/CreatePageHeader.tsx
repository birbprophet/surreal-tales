import React from "react"
import { IonHeader, IonToolbar } from "@ionic/react"

const ReactComponent: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="relative h-12 pt-2">
          <div className="text-xl absolute text-center w-screen font-semibold font-rounded mt-1">
            Surreal Tales
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  )
}

export default ReactComponent

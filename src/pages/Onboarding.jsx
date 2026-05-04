import { useEffect, useState } from "react"
import IntentionForm from "../components/IntentionForm"

export default function Onboarding() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-8"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.9s ease" }}
    >
      <div className="w-full max-w-[430px]">
        <h2
          className="text-center mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2rem",
            fontWeight: 300,
            color: "#e8e0d0",
            letterSpacing: "0.05em",
          }}
        >
          Set Your Intention
        </h2>
        <p
          className="text-center mb-10"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8rem",
            color: "#6b6358",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
          }}
        >
          Before we begin, name what you are releasing.
        </p>

        <IntentionForm />
      </div>
    </div>
  )
}

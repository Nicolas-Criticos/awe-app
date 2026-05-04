import { useEffect, useState } from "react"

export default function Dissolved() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 1.2s ease" }}
    >
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(4rem, 18vw, 7rem)",
          letterSpacing: "0.35em",
          color: "#e8e0d0",
          fontWeight: 300,
          opacity: 0.18,
          lineHeight: 1,
          marginBottom: "2rem",
        }}
      >
        AWE
      </h1>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.8rem",
          color: "#3d3a34",
          letterSpacing: "0.1em",
          marginBottom: "1rem",
        }}
      >
        This container has closed.
      </p>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.95rem",
          fontStyle: "italic",
          color: "#2e2c28",
          letterSpacing: "0.03em",
        }}
      >
        Thank you for being here.
      </p>
    </div>
  )
}

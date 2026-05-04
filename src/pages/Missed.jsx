import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Missed() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease" }}
    >
      <div className="max-w-[430px] flex flex-col items-center gap-6">
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2.2rem",
            fontWeight: 300,
            color: "#e8e0d0",
            letterSpacing: "0.04em",
          }}
        >
          You stepped away.
        </h1>

        <div className="w-8 h-px bg-[#c2a66d]/20 my-1" />

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.85rem",
            color: "#7a7068",
            lineHeight: 1.9,
            maxWidth: "290px",
          }}
        >
          You missed 3 check-ins. The container has released you — with care.
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            fontStyle: "italic",
            color: "#5a5248",
            lineHeight: 1.7,
            maxWidth: "270px",
          }}
        >
          When you are ready to reset, a new AWE begins.
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            color: "#5a5248",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            marginTop: "1rem",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            textDecorationColor: "rgba(90,82,72,0.4)",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#c2a66d")}
          onMouseLeave={(e) => (e.target.style.color = "#5a5248")}
        >
          Return to beginning
        </button>
      </div>
    </div>
  )
}

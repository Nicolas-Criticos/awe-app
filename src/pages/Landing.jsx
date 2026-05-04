import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ConcentricCircles({ visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 2s ease",
        position: "relative",
        width: "260px",
        height: "260px",
        margin: "0 auto 2.5rem",
      }}
    >
      <svg
        viewBox="0 0 260 260"
        width="260"
        height="260"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Outer rings — faint */}
        {[120, 105, 90, 75, 60, 46, 33, 22, 13, 6].map((r, i) => (
          <circle
            key={r}
            cx="130"
            cy="130"
            r={r}
            fill="none"
            stroke={i < 4 ? "rgba(194,166,109,0.12)" : i < 7 ? "rgba(194,166,109,0.22)" : "rgba(194,166,109,0.5)"}
            strokeWidth={i < 4 ? "0.5" : i < 7 ? "0.8" : "1"}
            style={{
              animation: `pulse-ring ${3 + i * 0.4}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
        {/* Centre dot */}
        <circle cx="130" cy="130" r="3" fill="#c2a66d" opacity="0.9" />
        {/* Cross hairs — very faint */}
        <line x1="130" y1="8" x2="130" y2="252" stroke="rgba(194,166,109,0.06)" strokeWidth="0.5" />
        <line x1="8" y1="130" x2="252" y2="130" stroke="rgba(194,166,109,0.06)" strokeWidth="0.5" />
      </svg>
      <style>{`
        @keyframes pulse-ring {
          from { opacity: 0.6; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 200)
    const t2 = setTimeout(() => setStep(2), 900)
    const t3 = setTimeout(() => setStep(3), 1600)
    const t4 = setTimeout(() => setStep(4), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  const fade = (threshold) => ({
    opacity: step >= threshold ? 1 : 0,
    transition: "opacity 1.2s ease",
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">

      {/* Title */}
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(3.5rem, 16vw, 5.5rem)",
          letterSpacing: "0.45em",
          color: "#e8e0d0",
          fontWeight: 300,
          lineHeight: 1,
          marginBottom: "0.4rem",
          ...fade(1),
        }}
      >
        AW<span style={{ display: "inline-block", transform: "scaleX(-1)" }}>E</span>
      </h1>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          color: "#c2a66d",
          textTransform: "uppercase",
          marginBottom: "2.5rem",
          ...fade(1),
        }}
      >
        A 12-day digital reset
      </p>

      {/* Concentric circles — the centrepiece */}
      <ConcentricCircles visible={step >= 2} />

      {/* Tagline */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.1rem",
          color: "#6b6358",
          fontStyle: "italic",
          marginBottom: "3rem",
          maxWidth: "240px",
          lineHeight: 1.7,
          ...fade(3),
        }}
      >
        Put the phone down.<br />Come back to yourself.
      </p>

      {/* CTA */}
      <button
        onClick={() => navigate("/onboarding")}
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#c2a66d",
          border: "1px solid rgba(194,166,109,0.4)",
          background: "transparent",
          padding: "0.8rem 2.8rem",
          cursor: "pointer",
          transition: "border-color 0.3s ease, color 0.3s ease",
          ...fade(4),
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = "#c2a66d"
          e.target.style.color = "#d4b87e"
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = "rgba(194,166,109,0.4)"
          e.target.style.color = "#c2a66d"
        }}
      >
        Begin
      </button>
    </div>
  )
}

import { useEffect, useState } from "react"

export default function Complete() {
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
            fontSize: "3rem",
            fontWeight: 300,
            color: "#e8e0d0",
            letterSpacing: "0.05em",
          }}
        >
          You made it.
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            fontStyle: "italic",
            color: "#c2a66d",
            letterSpacing: "0.03em",
          }}
        >
          12 days. One step at a time.
        </p>

        <div className="w-8 h-px bg-[#c2a66d]/30 my-2" />

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.85rem",
            color: "#7a7068",
            lineHeight: 1.9,
            maxWidth: "300px",
          }}
        >
          The container is closing. What you built here belongs to you now — not to any screen.
        </p>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8rem",
            color: "#5a5248",
            letterSpacing: "0.02em",
          }}
        >
          The group reflection opens for 48 hours.
        </p>

        <button
          onClick={() => alert("The circle is open.")}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c2a66d",
            border: "1px solid rgba(194,166,109,0.5)",
            background: "transparent",
            padding: "0.75rem 2.5rem",
            cursor: "pointer",
            marginTop: "0.5rem",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.borderColor = "#c2a66d")}
          onMouseLeave={(e) => (e.target.style.borderColor = "rgba(194,166,109,0.5)")}
        >
          Enter the circle
        </button>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.65rem",
            color: "#3a3830",
            letterSpacing: "0.05em",
            marginTop: "0.5rem",
          }}
        >
          After 48 hours, everything here dissolves.
        </p>
      </div>
    </div>
  )
}

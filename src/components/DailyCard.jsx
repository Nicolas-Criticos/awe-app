import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import StreakDisplay from "./StreakDisplay"
import { mockCompletedDays } from "../data/program"

export default function DailyCard({ day }) {
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [])

  const handleComplete = () => {
    setConfirmed("complete")
    setTimeout(() => navigate("/day/4"), 1600)
  }

  const handleSkip = () => {
    setConfirmed("skip")
    setTimeout(() => navigate("/day/4"), 1600)
  }

  const streak = [...mockCompletedDays]
  if (day?.day) streak[day.day - 1] = true

  return (
    <div
      className="flex flex-col items-center w-full max-w-[430px] mx-auto px-6 py-12 min-h-screen justify-center gap-0"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      {/* Day label */}
      <p
        className="text-xs tracking-[0.2em] uppercase text-[#c2a66d]/70 mb-4"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Day {day?.day} · {day?.theme}
      </p>

      {/* Divider */}
      <div className="w-12 h-px bg-[#c2a66d]/40 mb-8" />

      {/* Quote */}
      <blockquote
        className="text-center text-[1.45rem] leading-relaxed font-light italic text-[#e8e0d0] mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        "{day?.quote}"
      </blockquote>
      <p
        className="text-xs text-[#c2a66d]/60 tracking-widest mb-10"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        — {day?.author}
      </p>

      {/* Instruction */}
      <p
        className="text-sm text-[#b0a898] leading-7 text-center max-w-sm mb-12"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {day?.instruction}
      </p>

      {/* Confirmation message */}
      {confirmed ? (
        <p
          className="text-sm tracking-widest text-[#c2a66d] mb-8 animate-pulse"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Noted.
        </p>
      ) : (
        <div className="flex gap-4 mb-12">
          <button
            onClick={handleComplete}
            className="px-6 py-2.5 bg-[#c2a66d] text-[#0a0a08] text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#d4b87e] transition-colors duration-300 cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Completed
          </button>
          <button
            onClick={handleSkip}
            className="px-6 py-2.5 border border-[#c2a66d]/40 text-[#c2a66d]/60 text-xs tracking-[0.15em] uppercase hover:border-[#c2a66d]/70 hover:text-[#c2a66d]/80 transition-colors duration-300 cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Not today
          </button>
        </div>
      )}

      {/* Streak */}
      <StreakDisplay completed={streak} />
    </div>
  )
}

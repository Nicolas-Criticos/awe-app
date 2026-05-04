import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import StreakDisplay from "./StreakDisplay"
import { supabase } from "../lib/supabase"

export default function DailyCard({ day, dayNum }) {
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(null)
  const [visible, setVisible] = useState(false)
  const [completedDays, setCompletedDays] = useState(Array(12).fill(false))

  // Get participant from localStorage (set during onboarding)
  const participantId = localStorage.getItem("awe_participant_id")

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [])

  // Load existing check-ins to build streak
  useEffect(() => {
    if (!participantId) return
    async function fetchCheckins() {
      const { data } = await supabase
        .from("check_ins")
        .select("day_number, completed")
        .eq("participant_id", participantId)
        .order("day_number")

      if (data) {
        const filled = Array(12).fill(false)
        data.forEach(({ day_number, completed }) => {
          if (day_number >= 1 && day_number <= 12) {
            filled[day_number - 1] = completed
          }
        })
        setCompletedDays(filled)
      }
    }
    fetchCheckins()
  }, [participantId])

  const handleCheckin = async (completed) => {
    setConfirmed(completed ? "complete" : "skip")

    // Save check-in if we have a participant
    if (participantId && dayNum) {
      await supabase.from("check_ins").upsert({
        participant_id: participantId,
        day_number: dayNum,
        completed,
      }, { onConflict: "participant_id,day_number" })

      // If skipped, update miss count
      if (!completed) {
        const { data: participant } = await supabase
          .from("participants")
          .select("miss_count, status")
          .eq("id", participantId)
          .single()

        if (participant) {
          const newMissCount = (participant.miss_count || 0) + 1
          if (newMissCount >= 3) {
            await supabase
              .from("participants")
              .update({ miss_count: newMissCount, status: "flagged" })
              .eq("id", participantId)
            setTimeout(() => navigate("/missed"), 1600)
            return
          } else {
            await supabase
              .from("participants")
              .update({ miss_count: newMissCount })
              .eq("id", participantId)
          }
        }
      }
    }

    // Navigate: day 12 complete → /complete, otherwise next day
    const nextDay = (dayNum || 3) + 1
    if (dayNum >= 12) {
      setTimeout(() => navigate("/complete"), 1600)
    } else {
      setTimeout(() => navigate(`/day/${nextDay}`), 1600)
    }
  }

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
      {day?.quote && (
        <>
          <blockquote
            className="text-center text-[1.45rem] leading-relaxed font-light italic text-[#e8e0d0] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "{day.quote}"
          </blockquote>
          {day?.author && (
            <p
              className="text-xs text-[#c2a66d]/60 tracking-widest mb-10"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              — {day.author}
            </p>
          )}
        </>
      )}

      {/* Instruction */}
      <p
        className="text-sm text-[#b0a898] leading-7 text-center max-w-sm mb-12"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {day?.instruction}
      </p>

      {/* Confirmation or buttons */}
      {confirmed ? (
        <p
          className="text-sm tracking-widest text-[#c2a66d] mb-8"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Noted.
        </p>
      ) : (
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => handleCheckin(true)}
            className="px-6 py-2.5 bg-[#c2a66d] text-[#0a0a08] text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#d4b87e] transition-colors duration-300 cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Completed
          </button>
          <button
            onClick={() => handleCheckin(false)}
            className="px-6 py-2.5 border border-[#c2a66d]/40 text-[#c2a66d]/60 text-xs tracking-[0.15em] uppercase hover:border-[#c2a66d]/70 hover:text-[#c2a66d]/80 transition-colors duration-300 cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Not today
          </button>
        </div>
      )}

      {/* Streak */}
      <StreakDisplay completed={completedDays} />
    </div>
  )
}

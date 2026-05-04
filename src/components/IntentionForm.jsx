import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function IntentionForm() {
  const navigate = useNavigate()
  const [releasing, setReleasing] = useState("")
  const [opening, setOpening] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Get the active cohort
    const { data: cohorts } = await supabase
      .from("cohorts")
      .select("id")
      .eq("status", "active")
      .limit(1)

    const cohortId = cohorts?.[0]?.id ?? null

    // Create participant (email optional for now — we use anon id)
    const anonEmail = `anon_${Date.now()}@awe.local`

    const { data: participant, error } = await supabase
      .from("participants")
      .insert({
        cohort_id: cohortId,
        email: anonEmail,
        intention_release: releasing,
        intention_open: opening,
      })
      .select("id")
      .single()

    if (!error && participant) {
      localStorage.setItem("awe_participant_id", participant.id)
    }

    setLoading(false)
    navigate("/day/1")
  }

  const textareaBase =
    "w-full bg-transparent border-b border-[#c2a66d]/30 text-[#e8e0d0] text-sm leading-7 py-3 px-0 resize-none outline-none placeholder-[#5a5248] focus:border-[#c2a66d] transition-colors duration-400"

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
      <div>
        <textarea
          rows={3}
          value={releasing}
          onChange={(e) => setReleasing(e.target.value)}
          placeholder="I am releasing..."
          className={textareaBase}
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      </div>

      <div>
        <textarea
          rows={3}
          value={opening}
          onChange={(e) => setOpening(e.target.value)}
          placeholder="I am opening to..."
          className={textareaBase}
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 border border-[#c2a66d]/60 text-[#c2a66d] text-xs tracking-[0.2em] uppercase hover:border-[#c2a66d] transition-all duration-300 cursor-pointer disabled:opacity-40"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {loading ? "..." : "I am ready"}
        </button>
        <p
          className="text-xs text-[#4a4640] text-center tracking-wide"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Your intention is private. It stays with you.
        </p>
      </div>
    </form>
  )
}

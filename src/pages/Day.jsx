import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import DailyCard from "../components/DailyCard"

export default function Day() {
  const { dayNumber } = useParams()
  const dayNum = dayNumber ? parseInt(dayNumber, 10) : 3

  const [day, setDay] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDay() {
      const { data, error } = await supabase
        .from("daily_content")
        .select("*")
        .eq("day_number", dayNum)
        .single()

      if (!error && data) {
        setDay({
          day: data.day_number,
          theme: data.theme,
          quote: data.quote,
          author: data.quote_author,
          instruction: data.instruction,
          phase: data.phase,
        })
      }
      setLoading(false)
    }
    fetchDay()
  }, [dayNum])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-1 h-1 rounded-full bg-[#c2a66d] opacity-60 animate-pulse" />
      </div>
    )
  }

  return <DailyCard day={day} dayNum={dayNum} />
}

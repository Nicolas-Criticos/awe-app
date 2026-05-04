import { useParams } from "react-router-dom"
import { programDays } from "../data/program"
import DailyCard from "../components/DailyCard"

export default function Day() {
  const { dayNumber } = useParams()
  const index = dayNumber ? parseInt(dayNumber, 10) - 1 : 2
  const day = programDays[index] ?? programDays[2]

  return <DailyCard day={day} />
}

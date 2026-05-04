import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Onboarding from "./pages/Onboarding"
import Day from "./pages/Day"
import Complete from "./pages/Complete"
import Dissolved from "./pages/Dissolved"
import Missed from "./pages/Missed"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/day/:dayNumber" element={<Day />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/dissolved" element={<Dissolved />} />
        <Route path="/missed" element={<Missed />} />
      </Routes>
    </BrowserRouter>
  )
}

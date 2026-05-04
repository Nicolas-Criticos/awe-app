export default function StreakDisplay({ completed }) {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {completed.map((done, i) => (
        <span
          key={i}
          className={`inline-block w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
            done
              ? "bg-[#c2a66d]"
              : "border border-[#c2a66d]/30 bg-transparent"
          }`}
          aria-label={done ? `Day ${i + 1} complete` : `Day ${i + 1} remaining`}
        />
      ))}
    </div>
  )
}

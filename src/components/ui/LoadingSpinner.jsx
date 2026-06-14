export function LoadingSpinner({ message = "Loading…", size = "md" }) {
  const dim = size === "sm" ? 20 : size === "lg" ? 48 : 32;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "40px",
      }}
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 32 32"
        fill="none"
        style={{ animation: "spin 1.2s linear infinite" }}
      >
        <circle cx="16" cy="16" r="13" stroke="#e2e8f0" strokeWidth="2.5" />
        <path
          d="M16 3 A13 13 0 0 1 29 16"
          stroke="#4a5568"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      {message && (
        <p style={{ fontSize: "0.8rem", color: "#888" }}>{message}</p>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

export default LoadingSpinner;

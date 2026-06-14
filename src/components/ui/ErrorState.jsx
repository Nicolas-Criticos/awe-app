export function ErrorState({ message = "Failed to load data.", onRetry }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "1.5rem" }}>⚠️</p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: "4px",
            padding: "8px 20px",
            background: "transparent",
            color: "#888",
            border: "1px solid #ddd",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "0.75rem",
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;

function ContentWrapper({ children }) {
  return (
    <main
      style={{
        flex: 1,
        padding: "2rem",
        background: "var(--background-color)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      {children}
    </main>
  );
}

export default ContentWrapper;

function ContentWrapper({ children }) {
  return (
    <main
      style={{
        flex: 1,
        padding: "24px",
        background: "#f5f6f8",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      {children}
    </main>
  );
}

export default ContentWrapper;

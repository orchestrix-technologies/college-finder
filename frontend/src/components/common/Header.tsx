import React from "react";

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        
        {/* Left */}
        <div style={styles.left}>
          <div style={styles.logo}>E</div>
          <h1 style={styles.title}>EduConsult</h1>
        </div>

        {/* Right */}
        <div style={styles.right}>
          <button style={styles.login}>Login</button>
          <button style={styles.signup}>Sign Up</button>
        </div>

      </div>
    </header>
  );
};

export default Header;

// ✅ Styles in same file
const styles: { [key: string]: React.CSSProperties } = {
  header: {
    width: "100%",
    backgroundColor: "#1E3A8A",
    color: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },
  logo: {
    width: "36px",
    height: "36px",
    backgroundColor: "white",
    color: "#1E3A8A",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    margin: 0,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  login: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
  },
  signup: {
    backgroundColor: "white",
    color: "#1E3A8A",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
  },
};
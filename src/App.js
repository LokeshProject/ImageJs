import React from "react";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";

const items = [
  {
    src: img1,
    text: "ମଧୁ… ପ୍ରଥମ ଦିନରୁ ମୁଁ କେବଳ ତୁମକୁ ଭଲ ପାଉଛି ❤️"
  },
  {
    src: img2,
    text: "ତୁମେ ମୋ ଜୀବନର ସେଇ ଲୋକ… ଯାହାକୁ ମୁଁ ସଦା ପାଇଁ ଚାହେଁ 💕"
  },
  {
    src: img3,
    text: "ମୋ ହୃଦୟର ପ୍ରତ୍ୟେକ ଧଡକନ… କେବଳ ତୁମ ପାଇଁ 💓"
  },
  {
    src: img4,
    text: "ତୁମେ ଥିଲେ ମୋ ସମସ୍ତ ଜଗତ ସୁନ୍ଦର ଲାଗେ ✨"
  },
  {
    src: img5,
    text: "ମଧୁ… ତୁମେ ମୋ ସ୍ୱପ୍ନ ନୁହେଁ, ତୁମେ ମୋ ସତ୍ୟ ❤️"
  },
  {
    src: img6,
    text: "ତୁମେ ମୋ ସହିତ ସଦା ପାଇଁ ରହିବାକୁ ଚାହିବ କି? 💍"
  }
];

export default function App() {
  return (
    <div style={styles.page}>
      
      <div style={styles.container}>
        
        <h1 style={styles.title}>Madhu ❤️</h1>

        <div style={styles.grid}>
          {items.map((it, i) => (
            <div key={i} style={{ ...styles.card, animationDelay: `${i * 0.4}s` }}>
            <div style={styles.glow} />
          
            <svg viewBox="0 0 200 180" style={styles.heartSvg}>
              <defs>
                <clipPath id={`heartClip${i}`}>
                  <path d="M100 30 
                           C100 -10 180 -10 180 60
                           C180 120 100 150 100 170
                           C100 150 20 120 20 60
                           C20 -10 100 -10 100 30 Z" />
                </clipPath>
              </defs>
          
              <image
                href={it.src}
                width="200"
                height="180"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#heartClip${i})`}
              />
            </svg>
          
            <div style={styles.text}>{it.text}</div>
          </div>
          ))}
        </div>

      </div>

      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0); }
        }
        `}
      </style>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "100%",
    maxWidth: 1200,
    textAlign: "center",
    padding: 20,
  },

  title: {
    fontSize: 48,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 40,
    textShadow: "0 8px 20px rgba(0,0,0,0.3)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 60,
    justifyItems: "center",
  },

  card: {
    width: 260,
    position: "relative",
    animation: "float 6s ease-in-out infinite",
  },

  glow: {
    position: "absolute",
    inset: -12,
    background: "linear-gradient(45deg,#ff6a88,#ff99ac,#ffdde1)",
    borderRadius: "50%",
    filter: "blur(25px)",
    opacity: 0.7,
    zIndex: -1,
  },

  heartWrapper: {
    width: 260,
    height: 240,
    overflow: "hidden",
    borderRadius: 24,
    boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    clipPath:
      "path('M130 40 C130 0 200 0 200 60 C200 110 130 150 130 180 C130 150 60 110 60 60 C60 0 130 0 130 40 Z')",
  },

  text: {
    marginTop: 14,
    background: "#fff",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    color: "#be185d",
    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
    textAlign: "center",
  },
};
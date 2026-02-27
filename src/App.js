import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi";
import "./App.css";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";

const items = [
  {
    src: img1,
    text: "ମଧୁ… ପ୍ରଥମ ଦିନରୁ ମୁଁ କେବଳ ତୁମକୁ ଭଲ ପାଉଛି ❤️",
  },
  {
    src: img2,
    text: "ତୁମେ ମୋ ଜୀବନର ସେଇ ଲୋକ… ଯାହାକୁ ମୁଁ ସଦା ପାଇଁ ଚାହେଁ 💕",
  },
  {
    src: img3,
    text: "ମୋ ହୃଦୟର ପ୍ରତ୍ୟେକ ଧଡକନ… କେବଳ ତୁମ ପାଇଁ 💓",
  },
  {
    src: img4,
    text: "ତୁମେ ଥିଲେ ମୋ ସମସ୍ତ ଜଗତ ସୁନ୍ଦର ଲାଗେ ✨",
  },
  {
    src: img5,
    text: "ମଧୁ… ତୁମେ ମୋ ସ୍ୱପ୍ନ ନୁହେଁ, ତୁମେ ମୋ ସତ୍ୟ ❤️",
  },
  {
    src: img6,
    text: "ତୁମେ ମୋ ସହିତ ସଦା ପାଇଁ ରହିବାକୁ ଚାହିବ କି? 💍",
  },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const active = typeof activeIndex === "number" ? items[activeIndex] : null;
  const [zoom, setZoom] = useState(1);

  const hearts = useMemo(() => {
    const count = 14;
    return Array.from({ length: count }, (_, i) => {
      const size = 12 + Math.round(Math.random() * 18);
      const left = Math.round(Math.random() * 100);
      const delay = Math.round(Math.random() * 8000);
      const duration = 9000 + Math.round(Math.random() * 9000);
      const drift = -18 + Math.round(Math.random() * 36);
      const opacity = 0.22 + Math.random() * 0.38;
      return { i, size, left, delay, duration, drift, opacity };
    });
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => {
      if (typeof i !== "number") return 0;
      return (i - 1 + items.length) % items.length;
    });
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => {
      if (typeof i !== "number") return 0;
      return (i + 1) % items.length;
    });
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (!active) return;
    setZoom(1);

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.25));
      if (e.key === "-" || e.key === "_") setZoom((z) => Math.max(1, z - 0.25));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, close, goNext, goPrev]);

  const activeLabel = useMemo(() => {
    if (!active) return "";
    return `Image ${activeIndex + 1} of ${items.length}`;
  }, [active, activeIndex]);

  return (
    <div className="page">
      <div className="bg" aria-hidden="true" />
      <div className="hearts" aria-hidden="true">
        {hearts.map((h) => (
          <span
            key={h.i}
            className="heart"
            style={{
              left: `${h.left}%`,
              fontSize: h.size,
              opacity: h.opacity,
              animationDelay: `${h.delay}ms`,
              animationDuration: `${h.duration}ms`,
              "--drift": `${h.drift}px`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <header className="topbar">
        <div className="topbar__inner">
          <div className="brand">
            <div className="brand__title">Madhu</div>
            <div className="brand__subtitle">A tiny gallery made with love.</div>
          </div>
          <div className="topbar__hint">Tip: click a card · ESC to close</div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1 className="hero__title">
            Madhu <span className="hero__spark">❤️</span>
          </h1>
          <p className="hero__tagline">
            Memories, moments, and a thousand silent “I love you” in between.
          </p>
          <div className="loveNote" aria-label="Love note">
            <div className="loveNote__pill">
              Always you. Today, tomorrow, forever. ❤️
            </div>
          </div>
        </section>

        <section className="grid" aria-label="Photo gallery">
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              className="card"
              onClick={() => setActiveIndex(i)}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="card__glow" aria-hidden="true" />
              <span className="card__media">
                <img
                  className="card__img"
                  src={it.src}
                  alt={`Memory ${i + 1}`}
                  loading="lazy"
                />
                <span className="card__badge" aria-hidden="true">
                  ❤️
                </span>
              </span>
              <span className="card__text">{it.text}</span>
            </button>
          ))}
        </section>
      </main>

      {active ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onWheel={(e) => {
            if (!e.ctrlKey) return;
            e.preventDefault();
            const delta = Math.sign(e.deltaY);
            setZoom((z) => {
              const next = z + (delta > 0 ? -0.15 : 0.15);
              return Math.min(3, Math.max(1, Math.round(next * 100) / 100));
            });
          }}
        >
          <div className="lightbox__panel">
            <button
              type="button"
              className="iconBtn iconBtn--close"
              onClick={close}
              aria-label="Close"
            >
              <FiX />
            </button>

            <button
              type="button"
              className="iconBtn iconBtn--prev"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <FiChevronLeft />
            </button>

            <button
              type="button"
              className="iconBtn iconBtn--next"
              onClick={goNext}
              aria-label="Next image"
            >
              <FiChevronRight />
            </button>

            <div className="lightbox__tools" aria-label="Viewer controls">
              <div className="lightbox__counter">{activeLabel}</div>
              <div className="lightbox__zoom">
                <button
                  type="button"
                  className="pillBtn"
                  onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                  aria-label="Zoom out"
                >
                  <FiZoomOut />
                </button>
                <div className="zoomText">{Math.round(zoom * 100)}%</div>
                <button
                  type="button"
                  className="pillBtn"
                  onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                  aria-label="Zoom in"
                >
                  <FiZoomIn />
                </button>
                <button
                  type="button"
                  className="pillBtn"
                  onClick={() => setZoom(1)}
                  aria-label="Reset zoom"
                >
                  Reset
                </button>
              </div>
            </div>

            <figure className="lightbox__figure">
              <div className="lightbox__stage">
                <img
                  className="lightbox__img"
                  src={active.src}
                  alt="Memory"
                  loading="eager"
                  style={{ transform: `scale(${zoom})` }}
                  onDoubleClick={() =>
                    setZoom((z) => (z > 1 ? 1 : 2))
                  }
                />
              </div>
              <figcaption className="lightbox__caption">
                {active.text}
              </figcaption>
            </figure>
          </div>
        </div>
      ) : null}
    </div>
  );
}
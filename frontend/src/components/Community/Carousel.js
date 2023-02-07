// Carousel.tsx
import React from "react";
import { useSnapCarousel } from "react-snap-carousel";

import {
  CircleFill,
  ChevronDoubleLeft,
  ChevronDoubleRight,
} from "react-bootstrap-icons";

const styles = {
  root: {
    position: "relative",
  },
  scroll: {
    padding: "1rem",
    position: "relative",
    display: "flex",
    overflow: "hidden",
    scrollSnapType: "x mandatory",
    listStyle: "none",
  },
  item: {
    width: "250px",
    height: "250px",
    flexShrink: 0,
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nextPrevButton: {
    background: "none",
    color: "inherit",
    border: "none",
    padding: 0,
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
  },
  nextPrevButtonDisabled: { opacity: 0.3 },
  pagination: {
    display: "flex",
  },
  paginationButton: {
    marginRight: "10px",
    background: "none",
    color: "inherit",
    border: "none",
    padding: 0,
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
  },
  paginationButtonActive: { opacity: 0.3 },
  pageIndicator: {
    display: "flex",
    justifyContent: "center",
  },
};

export const Carousel = ({ children }) => {
  const { scrollRef, pages, activePageIndex, prev, next, goTo } =
    useSnapCarousel();
  return (
    <div style={styles.root}>
      <ul style={styles.scroll} ref={scrollRef}>
        {children}
      </ul>
      <div style={styles.controls}>
        <button
          style={{
            ...styles.nextPrevButton,
            ...(activePageIndex === 0 ? styles.nextPrevButtonDisabled : {}),
          }}
          onClick={() => prev()}
        >
          <ChevronDoubleLeft
            style={{
              width: "3rem",
              height: "3rem",
              position: "absolute",
              top: "45%",
              left: "1%",
            }}
          />
        </button>
        {pages.map((_, i) => (
          <button
            style={{
              ...styles.paginationButton,
              ...(activePageIndex === i ? styles.paginationButtonActive : {}),
            }}
            onClick={() => goTo(i)}
            key={i}
          >
            <CircleFill
              style={{
                width: ".5rem",
                height: ".5rem",
              }}
            />
          </button>
        ))}
        <button
          style={{
            ...styles.nextPrevButton,
            ...(activePageIndex === pages.length - 1
              ? styles.nextPrevButtonDisabled
              : {}),
          }}
          onClick={() => next()}
        >
          <ChevronDoubleRight
            style={{
              width: "3rem",
              height: "3rem",
              position: "absolute",
              top: "45%",
              right: "1%",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export const CarouselItem = ({ children }) => (
  <li style={styles.item}>{children}</li>
);

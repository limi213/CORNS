import { React, useState, useEffect } from "react";
import { Button } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function TopBtn({}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    showButton && (
      <>
        <div
          css={css`
            position: fixed;
            right: 2%;
            bottom: 4.5%;
            z-index: 1;
          `}
        >
          <Button
            id="top"
            onClick={scrollToTop}
            type="button"
            sx={{
              fontWeight: "bold",
              fontSize: "15px",
              padding: "15px 10px",
              backgroundColor: "#FFC804",
              color: "#111",
              border: "3px solid #111",
              borderRadius: "50%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#FFA903",
              },
            }}
          >
            Top
          </Button>
        </div>
      </>
    )
  );
}

import React from "react";

export type CardTheme = "light" | "dark";

export function getCardContainerStyle(theme: CardTheme, disableCard: boolean): React.CSSProperties {
  return {
    background: disableCard ? "transparent" : theme === "dark" ? "#000000" : "#ffffff",
    borderWidth: disableCard ? 0 : "1.5px",
    borderStyle: disableCard ? "none" : "solid",
    borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.16)" : "rgba(0,0,0,0.08)",
    borderRadius: disableCard ? 0 : 16,
    boxShadow: disableCard ? "none" : (theme === "dark" ? "none" : "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)"),
    padding: disableCard ? 0 : 20,
    display: "grid",
    gap: 12,
    overflow: "hidden",
    boxSizing: "border-box",
    width: "100%",
    margin: "0",
    transition: "box-shadow 0.2s ease, transform 0.2s ease"
  };
}

export function getCardHoverStyles(theme: CardTheme) {
  return {
    hover: {
      boxShadow: theme === "dark"
        ? "0 0 0 1px rgba(255, 255, 255, 0.2)"
        : "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08)",
      transform: "translateY(-1px)"
    },
    rest: {
      boxShadow: theme === "dark"
        ? "none"
        : "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
      transform: "translateY(0)"
    }
  };
}

export function getCtaStyle(theme: CardTheme): React.CSSProperties {
  return {
    color: theme === "dark" ? "#ffffff" : "#1d1d1f",
    border: `1.5px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.16)" : "rgba(0,0,0,0.08)"}`,
    padding: "9px 18px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.875rem",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content"
  };
}

export function getCtaHoverStyles(theme: CardTheme) {
  return {
    hover: {
      backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.03)",
      borderColor: theme === "dark" ? "#ffffff" : "#1d1d1f",
      transform: "translateY(-1px)"
    },
    rest: {
      backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.16)" : "rgba(0,0,0,0.08)",
      transform: "translateY(0)"
    }
  };
}

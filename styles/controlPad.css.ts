import { style } from "@vanilla-extract/css"

export const crossBottom = style({
  backgroundColor: "#333333",
  width: "35px",
  height: "55px",
  position: "absolute",
  borderRadius: "15%",
  marginTop: "30px",
  cursor: "pointer",
});

export const crossCenter = style({
  backgroundColor: "#333333",
  width: "35px",
  height: "35px",
  margin: "24px",
});

export const crossCircle = style({
  backgroundColor: "#292929",
  width: "25px",
  height: "25px",
  position: "absolute",
  borderRadius: "100%",
  marginTop: "5px",
  marginLeft: "5px",
});

export const crossLeft = style({
  backgroundColor: "#333333",
  width: "55px",
  height: "35px",
  position: "absolute",
  borderRadius: "15%",
  marginLeft: "-50px",
  cursor: "pointer",
});

export const crossRight = style({
  backgroundColor: "#333333",
  width: "55px",
  height: "35px",
  position: "absolute",
  borderRadius: "15%",
  marginLeft: "30px",
  cursor: "pointer",
});

export const crossTop = style({
  backgroundColor: "#333333",
  width: "35px",
  height: "55px",
  position: "absolute",
  borderRadius: "15%",
  marginTop: "-50px",
  cursor: "pointer",
});
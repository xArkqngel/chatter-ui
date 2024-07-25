import { Typography } from "@mui/material";
import TryIcon from '@mui/icons-material/Try';
import router from "../../Router";

function MobileBranding() {
  return (
    <>
      <TryIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        WhatTheChat
      </Typography>
    </>
  );
}

export default MobileBranding;

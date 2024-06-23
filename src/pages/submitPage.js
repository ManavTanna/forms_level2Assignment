import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

const SubmitPage = () => {
  const location = useLocation();
  const { state } = location;

  const fontStyle = {
    fontFamily: "'Dancing Script', cursive",
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: 24,
        margin: "auto",
        maxWidth: 600,
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center",  ...fontStyle }}
        >
          Submitted Details
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
          <strong>Name:</strong> {state.fullName}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
          <strong>Email:</strong> {state.email}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
          <strong>Phone Number:</strong> {state.phone}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
          <strong>Position applied for:</strong> {state.position}
        </Typography>
        {(state.position === "Developer" || state.position === "Designer") && (
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            <strong>Relevant Experience:</strong> {state.experience}{" "}
            {state.experience === "1" ? "yr" : "yrs"}
          </Typography>
        )}
        {state.position === "Designer" && (
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            <strong>Portfolio URL:</strong> {state.portfolio}
          </Typography>
        )}
        {state.position === "Manager" && (
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            <strong>Managerial Experience:</strong> {state.managementExperience}{" "}
            {state.managementExperience === "1" ? "yr" : "yrs"}
          </Typography>
        )}
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
          <strong>Skills:</strong> {state.skills.join(", ")}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
          <strong>Interview Date and Time:</strong>{" "}
          {dayjs(state.interviewTime).format("MMMM D, YYYY h:mm A")}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SubmitPage;

import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const DashboardPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Typography variant="body1">
        This will be the hub for accessing CDL training courses, tracking
        progress, and more.
      </Typography>
    </Container>
  );
};

export default DashboardPage;

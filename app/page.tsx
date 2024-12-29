"use client";

import * as React from "react";
import { useQuery } from "react-query";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import { fetchOpportunities } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = React.useState("all");
  const {
    data: opportunities,
    isLoading,
    error,
  } = useQuery("opportunities", fetchOpportunities, {
    retry: 3,
    retryDelay: 1000,
    onError: (error) => {
      console.error("Error in useQuery:", error);
    },
  });

  function handleOpportunityClick(opportunityId: number) {
    router.push(`/opportunity/${opportunityId}`);
  }

  const filteredOpportunities = React.useMemo(() => {
    if (!opportunities) return [];
    return statusFilter === "all"
      ? opportunities
      : opportunities.filter((opp) => opp.status === statusFilter);
  }, [opportunities, statusFilter]);

  if (isLoading)
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container maxWidth="lg">
        <Alert severity="error">
          An error occurred while fetching opportunities. Please try again
          later.
          {process.env.NODE_ENV === "development" && (
            <pre>{JSON.stringify(error, null, 2)}</pre>
          )}
        </Alert>
      </Container>
    );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-filter-label">Filter by Status</InputLabel>
        <Select
          labelId="status-filter-label"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as string)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="applied">Applied</MenuItem>
          <MenuItem value="interviewing">Interviewing</MenuItem>
          <MenuItem value="offered">Offered</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {filteredOpportunities.map((opportunity) => (
          <Grid item xs={12} sm={6} md={4} key={opportunity.id}>
            <Card onClick={() => handleOpportunityClick(opportunity.id)}>
              <CardContent>
                <Typography variant="h6">{opportunity.company.name}</Typography>
                <Typography color="textSecondary">
                  Status: {opportunity.status}
                </Typography>
                <Typography>Stack: {opportunity.stack.join(", ")}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

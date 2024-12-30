"use client";

import * as React from "react";
import { useQuery, useMutation } from "react-query";
import { useParams, useRouter } from "next/navigation";
import { Typography, CircularProgress } from "@mui/material";
import OpportunityForm, {
  OpportunityFormData,
} from "@/components/OpportunityForm";
import { fetchOpportunity, updateOpportunity } from "@/lib/api";

export default function OpportunityPage() {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: opportunity,
    isLoading,
    error,
  } = useQuery(["opportunity", id], () => fetchOpportunity(Number(id)));
  const updateMutation = useMutation(updateOpportunity, {
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleSubmit = (data: OpportunityFormData) => {
    updateMutation.mutate({ id, ...data });
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography>An error occurred: {(error as Error).message}</Typography>
    );

  return (
    <OpportunityForm
      initialData={opportunity}
      onSubmit={handleSubmit}
      submitButtonText="Save Changes"
    />
  );
}

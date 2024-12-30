"use client";

import * as React from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import OpportunityForm, {
  OpportunityFormData,
} from "@/components/OpportunityForm";
import { createOpportunity } from "@/lib/api";

export default function NewOpportunityPage() {
  const router = useRouter();
  const createMutation = useMutation(createOpportunity, {
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleSubmit = (data: OpportunityFormData) => {
    createMutation.mutate(data);
  };

  return (
    <OpportunityForm
      onSubmit={handleSubmit}
      submitButtonText="Create Opportunity"
    />
  );
}

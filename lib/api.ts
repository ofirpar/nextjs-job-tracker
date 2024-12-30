import { InterviewStatus, Opportunity } from "@/app/types/opportunities";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Mock data for development purposes
const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    status: InterviewStatus.applied,
    company: {
      name: "Tech Corp",
      location: "Tel Aviv, Israel",
    },
    stack: ["React", "Node.js", "TypeScript"],
  },
  {
    id: 2,
    status: InterviewStatus.interviewing,
    company: {
      name: "Startup Inc",
      location: "Haifa, Israel",
    },
    stack: ["Vue.js", "Python", "Docker"],
  },
];

export const fetchOpportunities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/opportunities`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}. ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    // In development, return mock data instead of throwing
    if (process.env.NODE_ENV === "development") {
      console.log("Returning mock data for development");
      return mockOpportunities;
    }
    // In production, rethrow the error
    throw error;
  }
};

export const fetchOpportunity = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/opportunities/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}. ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching opportunity with id ${id}:`, error);
    if (process.env.NODE_ENV === "development") {
      console.log("Returning mock data for development");
      return mockOpportunities.find((opp) => opp.id === id) || null;
    }
    throw error;
  }
};

export const updateOpportunity = async (data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/opportunities/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}. ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating opportunity:", error);
    throw error;
  }
};

export const createOpportunity = async (data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/opportunities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}. ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating opportunity:", error);
    throw error;
  }
};

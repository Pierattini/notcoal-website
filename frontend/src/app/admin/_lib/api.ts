import { LEADS_API } from "./constants";
import { Lead } from "./types";

export async function getLeads(): Promise<Lead[]> {
  const response = await fetch(LEADS_API);

  if (!response.ok) {
    throw new Error("Unable to load leads");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function updateLeadStatus(leadId: string, status: string) {
  const response = await fetch(`${LEADS_API}/${leadId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Unable to update lead status");
  }

  return response.json();
}

export async function getCurrentUser() {
  const response = await fetch("http://localhost:4000/auth/me", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  return response.json();
}

import { LEADS_API } from "./constants";
import { Lead } from "./types";

const AUTH_API =
  process.env.NEXT_PUBLIC_AUTH_API_URL;

if (!AUTH_API) {
  throw new Error(
    "NEXT_PUBLIC_AUTH_API_URL is not configured"
  );
}

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
  const response = await fetch(`${AUTH_API}/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  return response.json();
}

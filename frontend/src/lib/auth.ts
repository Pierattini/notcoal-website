export const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL ||
  "http://localhost:4000/auth";

export type AuthUser = {
  id: string;
  name?: string | null;
  email: string;
  role: "ADMIN" | "CLIENT";
};

export async function loginUser(
  email: string,
  password: string
) {
  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid credentials");
  }

  return data.user as AuthUser;
}

export async function getAuthUser() {
  const response = await fetch(`${AUTH_API_URL}/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user as AuthUser;
}

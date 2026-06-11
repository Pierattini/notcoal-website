export const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL;

export type AuthUser = {
  id: string;
  name?: string | null;
  email: string;
  role: "ADMIN" | "CLIENT";
};

function getAuthApiUrl() {
  if (!AUTH_API_URL) {
    throw new Error(
      "NEXT_PUBLIC_AUTH_API_URL is not configured"
    );
  }

  return AUTH_API_URL;
}

export async function loginUser(
  email: string,
  password: string
) {
  const authApiUrl = getAuthApiUrl();

  const response = await fetch(`${authApiUrl}/login`, {
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
  const authApiUrl = getAuthApiUrl();

  const response = await fetch(`${authApiUrl}/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user as AuthUser;
}

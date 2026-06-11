"use client";

import { FormEvent, useState } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Login.module.css";

const AUTH_API =
  process.env.NEXT_PUBLIC_AUTH_API_URL;

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!AUTH_API) {
        throw new Error(
          "NEXT_PUBLIC_AUTH_API_URL is not configured"
        );
      }

      const response = await fetch(`${AUTH_API}/login`, {
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

      if (data.user?.role === "ADMIN") {
        router.push(searchParams.get("next") || "/admin");
        router.refresh();
        return;
      }

      // Future CLIENT role destination:
      // /my-project will show project status, files, meetings, comments and deliverables.
      router.push("/my-project");
    } catch (loginError) {
      console.error(loginError);
      setError("Email or password is not valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <span className={styles.eyebrow}>Secure access</span>
        <h1>Sign in</h1>
        <p>
          Administrative access for The Not Coal Company. Client access is
          already prepared in the architecture and will be enabled later.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.futureNote}>
          Future client accounts will access My Project with files, meetings,
          comments and deliverables. Public registration is not enabled.
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}

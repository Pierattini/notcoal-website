"use client";

import {
  FormEvent,
  useEffect,
  useState
} from "react";
import styles from "./LoginModal.module.css";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
};

export default function LoginModal({
  open,
  onClose,
  onLogin,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      closeOnEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        closeOnEscape
      );
    };
  }, [onClose, open]);

  if (!open) return null;

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onLogin(email, password);
      setPassword("");
    } catch (loginError) {
      console.error(loginError);
      setError("Email or password is not valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loginModalTitle"
      onClick={onClose}
    >
      <section
        className={styles.modal}
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close login"
        >
          ×
        </button>

        <span className={styles.eyebrow}>
          Secure access
        </span>

        <h2 id="loginModalTitle">
          Sign in
        </h2>

        <p>
          Administrative access for The Not Coal Company. Client access is
          prepared for future project portals.
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
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
      </section>
    </div>
  );
}

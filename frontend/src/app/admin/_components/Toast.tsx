import styles from "../AdminDashboard.module.css";
import { Toast as ToastType } from "../_lib/types";

type ToastProps = {
  toast: ToastType;
};

export function Toast({ toast }: ToastProps) {
  if (!toast) return null;

  return (
    <div
      className={`${styles.toast} ${
        toast.type === "success" ? styles.toastSuccess : styles.toastError
      }`}
    >
      {toast.message}
    </div>
  );
}

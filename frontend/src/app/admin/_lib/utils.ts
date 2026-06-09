export function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formatMeeting(value?: boolean) {
  return value ? "Sí" : "No";
}

export function parseJsonList(value?: string | string[] | null) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

export function sortValue(value: unknown) {
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") {
    const asDate = new Date(value).getTime();
    if (!Number.isNaN(asDate) && value.includes("-")) return asDate;
    return value.toLowerCase();
  }

  return value ?? "";
}

export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

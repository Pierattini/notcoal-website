const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not configured"
  );
}

const API_URL =
  `${API_BASE_URL}/projects`;

export async function getProjects() {
  const response =
    await fetch(API_URL);

  return response.json();
}

export async function getFeaturedProjects() {
  const response =
    await fetch(
      `${API_URL}/featured`
    );

  return response.json();
}

export async function setFeaturedProjectPosition(
  position: number,
  projectId: string
) {
  const response =
    await fetch(
      `${API_URL}/featured/${position}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          projectId: projectId || null,
        }),
      }
    );

  return response.json();
}

export async function createProject(
  data: Record<string, unknown>
) {
  const response =
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    });

  return response.json();
}

export async function updateProject(
  id: string,
  data: Record<string, unknown>
) {
  const response =
    await fetch(
      `${API_URL}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

  return response.json();
}

export async function deleteProject(
  id: string
) {
  const response =
    await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE",
      }
    );

  return response.json();
}

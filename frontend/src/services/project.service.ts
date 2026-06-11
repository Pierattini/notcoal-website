const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

function getProjectsApiUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not configured"
    );
  }

  return `${API_BASE_URL}/projects`;
}

export async function getProjects() {
  const apiUrl = getProjectsApiUrl();

  const response =
    await fetch(apiUrl);

  return response.json();
}

export async function getFeaturedProjects() {
  const apiUrl = getProjectsApiUrl();

  const response =
    await fetch(
      `${apiUrl}/featured`
    );

  return response.json();
}

export async function setFeaturedProjectPosition(
  position: number,
  projectId: string
) {
  const apiUrl = getProjectsApiUrl();

  const response =
    await fetch(
      `${apiUrl}/featured/${position}`,
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
  const apiUrl = getProjectsApiUrl();

  const response =
    await fetch(apiUrl, {
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
  const apiUrl = getProjectsApiUrl();

  const response =
    await fetch(
      `${apiUrl}/${id}`,
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
  const apiUrl = getProjectsApiUrl();

  const response =
    await fetch(
      `${apiUrl}/${id}`,
      {
        method: "DELETE",
      }
    );

  return response.json();
}

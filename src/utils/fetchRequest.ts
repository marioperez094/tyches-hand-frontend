//Request functions
export async function getRequest<T>(url: string): Promise<T> {
  const baseURL: string = import.meta.env.VITE_BASE_URL;
  const composedLink: string = `${ baseURL }${ url }`
  try {
    const headers: HeadersInit = jwtHeaders();

    const response = await fetch(composedLink, {
      method: "GET",
      credentials: "include",
      headers,
    });
    return handleErrors(response);
  } catch (error) {
    console.error(`Fetch error for ${url}:`, (error as Error).message);
    throw error;
  };
};

export async function postRequest<T>(url:string, body: object): Promise<T> {
  try {
    const headers: HeadersInit = jwtHeaders();

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(body)
    })
    return handleErrors(response);
  } catch (error) {
    console.error(`Fetch error for ${url}:`, (error as Error).message);
    throw error;
  };
};

//Helpers

function jwtHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const jwtToken = localStorage.getItem("jwt");
  if (jwtToken) {
    headers["Authorization"] = `Bearer ${ jwtToken }`;
  }

  return headers;
}

async function handleErrors(response: Response) {
  if (!response.ok) {
    try { 
      const errorData = await response.json();
      throw new Error(extractMessage(errorData.error));
    } catch {
      throw new Error(response.statusText || "Unkown error.");
    };
  };

  return response.json();
};

function extractMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  };
  if (Array.isArray(error)) {
    return error.join(", ")
  };
  if (error && typeof error === "object") {
    return readableObjectErrors(error as Record<string, unknown>);
  };
  return "Unknown Error";
};

function readableObjectErrors(object: Record<string, unknown>): string {
  return Object.keys(object)
    .map((key) => `${key} ${String(object[key])}`)
    .join(", ");
};
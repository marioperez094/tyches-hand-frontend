//Request functions
export async function getRequest<T>(url: string): Promise<T> {
  const composedLink = composeLink(url);

  try {
    const headers: HeadersInit = jwtHeaders();

    const response = await fetch(composedLink, {
      method: "GET",
      credentials: "include",
      headers,
    });
    return handleErrors(response);
  } catch (error) {
    console.error(`Fetch error for ${ url }:`, (error as Error).message);
    throw error;
  };
};

export async function postRequest<T>(url:string, body: object): Promise<T> {
  const composedLink = composeLink(url);

  try {
    const headers: HeadersInit = jwtHeaders();

    const response = await fetch(composedLink, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(body)
    });
    return handleErrors(response);
  } catch (error) {
    console.error(`Fetch error for ${ url }:`, (error as Error).message);
    throw error;
  };
};

export async function putRequest<T>(url: string, body: object): Promise<T> {
  const composedLink = composeLink(url);

  try {
    const headers: HeadersInit = jwtHeaders();

    const response = await fetch(composedLink, {
      method: "PUT",
      credentials: "include",
      headers,
      body: JSON.stringify(body)
    });
    return handleErrors(response);
  } catch (error) {
    console.error(`Fetch error for ${ url }:`, (error as Error).message);
    throw error;
  }
};

export async function deleteRequest<T>(url: string): Promise<T> {
  const composedLink = composeLink(url);

  try {
    const headers: HeadersInit = jwtHeaders();

    const response = await fetch(composedLink, {
      method: "DELETE",
      credentials: "include", 
      headers,
    })
    return handleErrors(response);
  } catch (error) {
    console.error(`Fetch error for ${ url }:`, (error as Error).message);
    throw error;
  };
};

//Helpers
function composeLink(extendedURL: string): string {
  const baseURL: string = import.meta.env.VITE_BASE_URL;
  return `${ baseURL }${ extendedURL }`
};

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
    return response.json().then((errorData) => {
      const message = extractMessage(errorData.error);

      throw new Error(message);
    });
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
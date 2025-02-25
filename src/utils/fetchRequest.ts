import { safeCredentials, handleErrors } from "./fetchHelper.js";

export function postRequest(
  link: string,
  body: {},
) {
  fetch(link, safeCredentials({
    method: "POST",
    body: JSON.stringify(body)
  }))
    .then(handleErrors)
    .catch(error => { throw error });
}
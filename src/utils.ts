/**
 * Makes a request to `url` using the form data passed into it as a body
 * @param url Url to make a POST request to
 * @param formData Object containing all the form data
 * @returns Fetch API response
 */
export async function formRequest(
  url: string,
  formData: Record<string, string>
) {
  const form = new FormData();
  Object.entries(formData).forEach(([key, value]) => form.append(key, value));
  return await fetch(url, {
    method: "POST",
    body: form,
  });
}

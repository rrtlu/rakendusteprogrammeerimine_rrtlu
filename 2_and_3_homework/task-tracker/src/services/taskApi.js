// One place for all task requests. Next lesson only this file changes:
// the URL starts pointing at the Node.js API instead of a static file.
export async function getTasks() {
  const response = await fetch(`${import.meta.env.BASE_URL}tasks.json`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

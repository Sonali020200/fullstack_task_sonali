export const deployedLink = import.meta.env.DEPLOYED_LINK;
export async function fetchNotesAPI(page: any) {
  try {
    const res = await fetch(
      `${deployedLink}/fetchAllTasks?page=${page}&limit=9`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; 
  }
}

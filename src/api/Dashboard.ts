const getApiBaseUrl = () => {
  const rawAPI = process.env.API;
  return rawAPI
    ?.trim()
    .replace(/^["']|["']$/g, "")
    .trim()
    .replace(/\/+$/, "");
};
const getDashboard = async () => {
  const token = process.env.AUTH_SECRET;
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/dashboard`, {
      headers: {
        Accept: "application/json",
        Authorization:`Bearer ${token}`
      },

      method: "GET",
    });

    const data = await response.json();
    return data.data
    
    if (!response.ok) {
      throw new Error(
         `HTTP Error: ${response.status} - ${JSON.stringify(data)}`
       );    }
  } catch (error) {
    console.error("Dashboard Error:", error);
    throw error;
  }
};
export default getDashboard;

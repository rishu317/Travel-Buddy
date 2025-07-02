const BASE_URL = "http://localhost:8080"; // Change to your backend URL in production

// Get JWT token from cookie
const getToken = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

// POST without auth
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  try {
    const response = await fetch(BASE_URL + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      alert("Invalid Email ⚠️");
      throw new Error(errorText || "Request failed");
    }

    return await response.json();
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
};

// POST with auth
export const makeAuthenticatedPOSTRequest = async (route, body) => {
  try {
    const response = await fetch(BASE_URL + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Request failed");
    }

    return await response.json();
  } catch (err) {
    console.error("Authenticated POST Error:", err.message);
    throw err;
  }
};

// GET with auth
export const makeAuthenticatedGETRequest = async (route) => {
  try {
    const response = await fetch(BASE_URL + route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Request failed");
    }

    return await response.json();
  } catch (err) {
    console.error("Authenticated GET Error:", err.message);
    throw err;
  }
};

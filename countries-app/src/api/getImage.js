const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function fetchCountryImage(countryName) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${countryName}&client_id=${ACCESS_KEY}`
    );

    const data = await response.json();

    // Asegúrate de que esto no devuelva undefined
    console.log("🔍 API response:", data);

    if (data && data.urls && data.urls.regular) {
      return data.urls.regular;
    } else {
      console.warn("⚠️ No se encontró data.urls.regular. Esto llegó:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching Unsplash image:", error);
    return null;
  }
}

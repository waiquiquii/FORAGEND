const API_BASE = "/github-config";
const CACHE_TTL = 60 * 60 * 1000; // 1 hora

export class ApiService {
  static async getDoctors() {
    const cacheKey = "doctors_cache";
    return this._fetchWithCache(
      `${API_BASE}/resources/doctors/medico-ejemplo.json`,
      cacheKey
    );
  }

  static async getSchedules() {
    const cacheKey = "schedules_cache";
    return this._fetchWithCache(
      `${API_BASE}/resources/horarios/config.json`,
      cacheKey
    );
  }

  static async _fetchWithCache(url, cacheKey) {
    // 1. Verificar cache local (sessionStorage)
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        console.log(`Usando cache local para ${cacheKey}`);
        return data;
      }
    }

    // 2. Fetch con SW (que manejará su propia cache)
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      // 3. Guardar en cache local
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      if (cached) return JSON.parse(cached).data; // Fallback a cache vencido
      throw error;
    }
  }
}

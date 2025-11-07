const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchTimings(from = '', to = '', type = '') {
  try {
    const searchParams = new URLSearchParams({
      from: from.trim(),
      to: to.trim()
    });
    
    if (type) {
      searchParams.append('type', type);
    }

    const url = `${API_BASE_URL}/routes/search?${searchParams.toString()}`;
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error('Failed to fetch routes');
    }

    const data = await res.json();
    return data.success ? data.routes : [];
    
  } catch (error) {
    console.error('Error fetching routes:', error);
    return [];
  }
}

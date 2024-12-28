import axios from 'axios';

const API_KEY = '19a97442464f46a285b7cdf96819af69'; // Replace with your News API key
const BASE_URL = 'https://newsapi.org/v2';

export const fetchTopHeadlines = async (country: string = 'us', page: number = 1): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country, // Country code (e.g., 'us', 'in', 'gb', etc.)
        apiKey: API_KEY,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

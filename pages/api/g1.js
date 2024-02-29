// pages/api/g1.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://g1.globo.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching G1 data:', error);
    res.status(500).json({ message: 'Error fetching G1 data' });
  }
}

import axios from 'axios';

export async function saveLocationToUser(userEmail, location) {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/saveLocation`,
    {
      userEmail,
      location,
    }
  );
  return response.data;
}
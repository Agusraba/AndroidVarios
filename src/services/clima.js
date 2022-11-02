import axios from 'axios';

const ApiKey = "f0798cd4815c5d5c04814989a7d56ede";

const axiosClientLogin = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/weather",
  
})

export const getClima = async (lat, lon) => {  
  try {
      const response = await axiosClientLogin.get(`?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric`);
      return response.data;
    } catch (exc) {
      throw error;
    }
  }

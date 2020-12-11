import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const google = (CEP: string) => axios.get(`https://maps.google.com/maps/api/geocode/json?key=${process.env.REACT_APP_API_KEY}&components=country:BR|postal_code:${CEP}`)

export default api;
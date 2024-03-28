import axios from "axios";

const api = axios.create({
 
  baseURL: "https://task-backend-eo54.onrender.com/api"
});
export default api; 

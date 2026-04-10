import axios from 'axios';

const api = axios.create({
  
    baseURL: "https://loyal-rebirth-production-0f47.up.railway.app/api",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
/*
const api = axios.create({
    baseURL:'http://localhost:8000/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
    */




export default api;
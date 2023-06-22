import axios from "axios";
const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}
// write middleware to add token for request

export default axios.create({
    baseURL: "http://0.0.0.0:8002/api",
    headers: {
        "Content-type": "application/json"
    }
});
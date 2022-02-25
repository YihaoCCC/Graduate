import axios from "axios";

const yhRequest = axios.create()

yhRequest.interceptors.response.use((res) => {
    console.log('axios请求')
    return res.data
})

export default yhRequest
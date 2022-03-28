import axios from "axios";

class YHRequest {
    instance
    constructor(config) {
        this.instance = axios.create(config)
        this.instance.interceptors.request.use((config) => {
            // 添加token
            // config.headers['userId'] = 'fdsafsda';
            return config
        })
        this.instance.interceptors.response.use((res) => {
            console.log('自定义axios成功拦截！')
            return res.data
        })
    }
    getInstance() {
        return this.instance
    }
}

export default YHRequest
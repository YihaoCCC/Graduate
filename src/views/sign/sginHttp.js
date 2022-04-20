import yhHttp from "../../service";

let instance = yhHttp.getInstance()

export function getAllSign() {
    return instance.get('/SignTime/getAll').then(res => res)
}
export function changeSign(sginObj) {
    return instance.post('/SignTime/update', 
        sginObj
    ).then((res) => {
        return res
    })
}
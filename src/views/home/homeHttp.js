import yhHttp from "../../service";

const instance = yhHttp.getInstance()

export function getUserStatus () {
    const id = localStorage.getItem('USERID')
    return instance.get(`/sign/getStatusByUserId/${id}`).then((res) => {
        return res
    })
}
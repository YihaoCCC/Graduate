import yhHttp from "../../service";

const instance = yhHttp.getInstance()

export function getMessage () {
    return instance.get('/message/queryAll').then((res) => {
        return res
    })
}

export function updateMessage(data) {
    return instance.put('/message/update',data).then((res) => {
        return res
    })
}

export function deleteMessage(id) {
    return instance.delete(`/message/delete/${id}`).then((res) => {
        return res
    })
}

export function addMessage(data) {
    return instance.post('/message/add', data).then((res) => {
        return res
    })
}
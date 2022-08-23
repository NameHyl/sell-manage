/**
 * 操作本地存储
 * create by peng仔
 */

const local = {
    get(key) {
        return JSON.parse(window.localStorage.getItem(key))
    },
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    clear() {
        window.localStorage.clear()
    },
    remove(key) {
        window.localStorage.removeItem(key)
    }
}

export default local;
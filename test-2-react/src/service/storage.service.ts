export class StorageService {
    static getItem(name: string) {
        try {
            return sessionStorage.getItem(name) || null
        } catch (err) {
            console.error(err)
            return null
        }
    }

    static setItem(name: string, data: string) {
        try {
            if (typeof data !== 'string') data = JSON.stringify(data)
            sessionStorage.setItem(name, data)
        } catch (err) {
            console.error(err)
        }
    }

    static clearItem(name: string) {
        try {
            sessionStorage.removeItem(name)
        } catch (err) {
            console.error(err)
        }
    }
}

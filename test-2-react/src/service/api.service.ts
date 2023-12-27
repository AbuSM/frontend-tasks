export class ApiService {
    static async post(url: string, data: any) {
        try {
            const result = await fetch(`http://localhost:4040/${url}`, {
                method: 'POST',
                ...data,
            })
            return result.json()
        } catch (err: any) {
            return new Error(err)
        }
    }
}

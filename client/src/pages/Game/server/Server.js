export default class Server {

    async requestData(url = '', method = 'GET', body = null, headers = {}) {
        try {
            const req = await fetch(url)
            const json = await req.json()            
            return json
        } catch (e) {}
    }


}
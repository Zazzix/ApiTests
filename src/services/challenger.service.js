//import { test } from '../helpers/fixtures/fixture';

//const UrlApi = 'https://apichallenges.eviltester.com';

export class ChallengerService {
    constructor(request) {
        this.request = request;
    }
    async post() {
        return await this.request.post(`/challenger`);
        //const headers = response.headers();
        //const key = headers['x-challenger'];
        //const link = `${UrlApi}${key}`;

        //console.log(link);

        //return key

    }
}
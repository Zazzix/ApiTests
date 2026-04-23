import { test } from '../helpers/fixtures/fixture';

export class ChallengesService {
    constructor(request, token) {
        this.request = request;
        this.token = token;
    }

    async get() {
        const response = await this.request.get('/challenges',
            {
                headers: {
                    'X-CHALLENGER': this.token,
                }
            }
        );
        return response;
    }
}
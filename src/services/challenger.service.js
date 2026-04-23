import { test } from '../helpers/fixtures/fixture';

export class ChallengerService {
    constructor(request) {
        this.request = request;
    }
    async post() {
        return await this.request.post(`/challenger`);
    }
}
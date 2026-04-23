import { test } from '../helpers/fixtures/fixture';

export class HeartbeatService {
    constructor(request, token) {
        this.request = request;
        this.token = token;
    }

    async methodOverride(headers = {}) {
        const response = await this.request.post('/heartbeat',
            {
                headers: {
                    'X-CHALLENGER': this.token,
                    ...headers
                }
            }
        );
        return response;
    }
}
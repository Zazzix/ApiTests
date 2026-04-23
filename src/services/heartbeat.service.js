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

    async sendDeleteMethod() {
        const response = await this.request.delete('/heartbeat',
            {
                headers: {
                    'X-CHALLENGER': this.token,
                }
            }
        );
        return response;
    }

    async sendPatchMethod() {
        const response = await this.request.patch('/heartbeat',
            {
                headers: {
                    'X-CHALLENGER': this.token,
                }
            }
        );
        return response;
    }
}
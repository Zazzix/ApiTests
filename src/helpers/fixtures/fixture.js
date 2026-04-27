import { test as base } from '@playwright/test';
import { Api } from '../../services/api.service';

let globalToken = null;

export const test = base.extend({
    api: async ({ request }, use) => {
        if (!globalToken) {
            const response = await request.post('/challenger');
            globalToken = response.headers()['x-challenger'];
        }
        
        const api = new Api(request, globalToken);
        await use(api);
    }
});
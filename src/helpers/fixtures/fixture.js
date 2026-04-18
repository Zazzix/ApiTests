import { test as base } from '@playwright/test';
import { Api } from '../../services/api.service';

export const test = base.extend({
    api: async ({ request }, use) => {
        const tempApi = new Api(request);
        const response = await tempApi.challenger.post();
        const token = response.headers()['x-challenger'];

        const api = new Api(request, token);
        //api.token = token;
        await use(api);

        /*
        const response = await request.post(`/challenger`);
        const token = response.headers()['x-challenger'];
        
        const api = new Api(request, token);
        await use(api);
        */
    }
});
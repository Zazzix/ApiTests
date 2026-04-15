import { test} from '../src/helpers/fixtures/fixture';
import { expect } from '@playwright/test';
import { Api } from '../src/services/api.service';

test('Create a new challenger session @tag("post")', async ({ api }) => {
    const UrlApi = 'https://apichallenges.eviltester.com';
    console.log(`Прогресс тут: ${UrlApi}/gui/challenges/${api.token}`);
    
    expect(api.token).toBeDefined();
    
    /*
    const api = new Api(request);
    const token = await api.challenger.post();
    const headers = token.headers();
    const key = headers['x-challenger'];
    const link = `${UrlApi}${headers.location}`;
    */
});


test('Get the list of challenges @tag("get")', async ({ api }) => {
        const UrlApi = 'https://apichallenges.eviltester.com';
    console.log(`Прогресс тут: ${UrlApi}/gui/challenges/${api.token}`);
    let response = await api.challenges.get();
    expect (response.challenges.length).toEqual(59);
    //console.log(response);
});
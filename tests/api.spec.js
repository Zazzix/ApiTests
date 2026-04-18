import { test } from '../src/helpers/fixtures/fixture';
import { expect } from '@playwright/test';
import { Api } from '../src/services/api.service';
import { TodoBuilder } from '../src/helpers/builders';
import { da } from '@faker-js/faker';


test('Create a new challenger session @tag("post")', async ({ api }) => {

    expect(api.token.length).toEqual(36);
    console.log(api.token);

    /*
    const api = new Api(request);
    const token = await api.challenger.post();
    const headers = token.headers();
    const key = headers['x-challenger'];
    const link = `${UrlApi}${headers.location}`;
    */
});


test('Get the list of challenges @tag("get")', async ({ api }) => {
    let response = await api.challenges.get();
    let data = await response.json();
    //console.log(response.challenges);
    expect(response.status()).toBe(200);
    expect(data.challenges.length).toEqual(59);
    //console.log(response);
});

test('Get Todos list @tag("get")', async ({ api }) => {

    let response = await api.todos.getTodosList();
    let data = await response.json();

    expect(response.status()).toBe(200);
    expect(typeof data.todos[0].title).toBe('string');
    expect(typeof data.todos[0].doneStatus).toBe('boolean');
    //console.log(data.todos[0]);
});

test('Get todos from wrong endpoint @tag("get")', async ({ api }) => {
    let response = await api.todos.getInvalidTodo();

    expect(response.status()).toBe(404);
});

test('Get specific todo by id @tag("get")', async ({ api }) => {
    const UrlApi = 'https://apichallenges.eviltester.com';
    console.log(`Прогресс тут: ${UrlApi}/gui/challenges/${api.token}`);
    const todoId = new TodoBuilder().withValidId().build();
    let response = await api.todos.getSpecificTodo(todoId);
    let data = await response.json();

    expect(response.status()).toBe(200);
    expect(typeof data.todos[0].title).toBe('string');
    expect(typeof data.todos[0].doneStatus).toBe('boolean');
});

test('Get nonexistent todo @tag("get")', async ({ api }) => {
    const todoId = new TodoBuilder().withInvalidId().build();

    let response = await api.todos.getSpecificTodo(todoId);
    //let data = await response.json();

    expect(response.status()).toBe(404);
});

test('Get filtered todo list @tag("get")', async ({ api }) => {
    const UrlApi = 'https://apichallenges.eviltester.com';
    console.log(`Прогресс тут: ${UrlApi}/gui/challenges/${api.token}`);
    const todo = new TodoBuilder().withTitle().withDoneStatus().build();
    await api.todos.createTodo(todo)
    let response = await api.todos.getFilteredTodo();
    let data = await response.json();
    //console.log(data);


    expect(response.status()).toBe(200);
    expect(data.todos.length).toBeGreaterThan(0);
});

test('Send head request @tag("head")', async ({ api }) => {
    const UrlApi = 'https://apichallenges.eviltester.com';
    console.log(`Прогресс тут: ${UrlApi}/gui/challenges/${api.token}`);
    let response = await api.todos.head();
    //let data = await response.json();
    console.log(response);


    expect(response.status()).toBe(200);
    //expect(data.todos.length).toBeGreaterThan(0);
});

test('Create a todo with invcalid doneStatus @tag("post")', async ({ api }) => {
    const UrlApi = 'https://apichallenges.eviltester.com';
    console.log(`Прогресс тут: ${UrlApi}/gui/challenges/${api.token}`);

    const todo = new TodoBuilder().withTitle().withInvalidDoneStatus().build();
    let response = await api.todos.createTodo(todo)
    //let data = await response.json();
    //console.log(response);


    expect(response.status()).toBe(400);
    //expect(data.todos.length).toBeGreaterThan(0);
});

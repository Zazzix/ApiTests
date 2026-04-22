import { test } from '../src/helpers/fixtures/fixture';
import { expect } from '@playwright/test';
import { Api } from '../src/services/api.service';
import { TodoBuilder } from '../src/helpers/builders/index';


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
    const todo = new TodoBuilder().withTitle().withDoneStatus().build();
    await api.todos.createTodo(todo)
    let response = await api.todos.getFilteredTodo();
    let data = await response.json();
    //console.log(data.todos[0].doneStatus);


    expect(response.status()).toBe(200);
    expect(data.todos.length).toBeGreaterThan(0);
    expect(data.todos[0].doneStatus).toBe(true);
});

test('Send head request @tag("head")', async ({ api }) => {
    let response = await api.todos.head();
    //let data = await response.json();
    console.log(response);


    expect(response.status()).toBe(200);
    //expect(data.todos.length).toBeGreaterThan(0);
});

test('Create a todo with valid data @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();
    let response = await api.todos.createTodo(todo)
    let data = await response.json();
    console.log(data);


    expect(response.status()).toBe(201);
    expect(data.title).toEqual(todo.title);
    expect(data.doneStatus).toEqual(todo.doneStatus);
    expect(data.description).toEqual(todo.description);
});

test('Create a todo with invalid doneStatus @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withInvalidDoneStatus().build();
    let response = await api.todos.createTodo(todo)
    //let data = await response.json();
    //console.log(response);


    expect(response.status()).toBe(400);
    //expect(data.todos.length).toBeGreaterThan(0);
});

test('Create a todo with long title @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withLongTitle().withDoneStatus().withDescription().build();
    let response = await api.todos.createTodo(todo)
    //let data = await response.json();
    //console.log(response);


    expect(response.status()).toBe(400);
    //expect(data.todos.length).toBeGreaterThan(0);
});

test('Create a todo with long description @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withDoneStatus().withLongDescription().build();
    let response = await api.todos.createTodo(todo)
    //let data = await response.json();
    //console.log(response);


    expect(response.status()).toBe(400);
    //expect(data.todos.length).toBeGreaterThan(0);
});

test('Create a todo with max description and title @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withMaxTitle().withDoneStatus().withMaxDescription().build();
    let response = await api.todos.createTodo(todo)
    let data = await response.json();
    //console.log(todo.title);


    expect(response.status()).toBe(201);
    expect(data.title).toEqual(todo.title);
    expect(data.doneStatus).toEqual(todo.doneStatus);
    expect(data.description).toEqual(todo.description);
});

test('Create a todo with exceeding length @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withDoneStatus().withExceedingLength().build();
    let response = await api.todos.createTodo(todo)
    //let data = await response.json();
    //console.log(response);


    expect(response.status()).toBe(413);
    //expect(data.todos.length).toBeGreaterThan(0);
});

test('Create a todo with extra field @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().withExtraField().build();
    let response = await api.todos.createTodo(todo)
    //let data = await response.json();
    //console.log(response);


    expect(response.status()).toBe(400);
    //expect(data.todos.length).toBeGreaterThan(0);
});

test('Pass the TodoID to create a todo @tag("put")', async ({ api }) => {
    const todoId = new TodoBuilder().withInvalidId().build();
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();
    let response = await api.todos.createTodoWithId(todoId, todo)
    //let data = await response.json();
    //console.log(response);


    expect(response.status()).toBe(400);
    //expect(data.todos.length).toBeGreaterThan(0);
});

test('Update an exsiting Todo using POST method @tag("post")', async ({ api }) => {
    const todoId = new TodoBuilder().withValidId().build();
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();
    let response = await api.todos.updateTodo(todoId, todo)
    let data = await response.json();
    console.log(data);


    expect(response.status()).toBe(200);
    expect(data.description).toEqual(todo.description);
});

test('Update a todo with nonexistent id @tag("post")', async ({ api }) => {
    const todoId = new TodoBuilder().withInvalidId().build();
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();
    let response = await api.todos.updateTodo(todoId, todo)
    //let data = await response.json();
    //console.log(data);


    expect(response.status()).toBe(404);
    //expect(data.description).toEqual(todo.description);
});

test('Full update an exsiting Todo using PUT method @tag("put")', async ({ api }) => {
    const todoId = new TodoBuilder().withValidId().build();
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();

    let response = await api.todos.createTodoWithId(todoId, todo)
    let data = await response.json();
    //console.log(data);


    expect(response.status()).toBe(200);
    expect(data.title).toEqual(todo.title);
    expect(data.doneStatus).toEqual(todo.doneStatus);
    expect(data.description).toEqual(todo.description);
});

test('Partial update an exsiting Todo using PUT method @tag("put")', async ({ api }) => {
    const todoId = new TodoBuilder().withValidId().build();
    const todo = new TodoBuilder().withTitle().build();

    let response = await api.todos.createTodoWithId(todoId, todo)
    let data = await response.json();
    //console.log(data);


    expect(response.status()).toBe(200);
    expect(data.title).toEqual(todo.title);
});

test('Update an exsiting Todo without title using PUT method @tag("put")', async ({ api }) => {
    const todoId = new TodoBuilder().withValidId().build();
    const todo = new TodoBuilder().withDoneStatus().withDescription().build();

    let response = await api.todos.createTodoWithId(todoId, todo)
    let data = await response.json();
    //console.log(data);


    expect(response.status()).toBe(400);
});

test('Issue a PUT request to fail to update an existing todo @tag("put")', async ({ api }) => {
    const UrlApi = 'https://apichallenges.eviltester.com';
    console.log(`Прогресс тут: ${UrlApi}/gui/challenges/${api.token}`);

    const todoId = new TodoBuilder().withValidId().build();
    const todo = new TodoBuilder().withInvalidId().withTitle().withDoneStatus().withDescription().build();

    let response = await api.todos.createTodoWithId(todoId, todo)
    let data = await response.json();
    //console.log(data);


    expect(response.status()).toBe(400);
});

test('Issue a DELETE request to successfully delete a todo @tag("delete")', async ({ api }) => {
    const todoId = new TodoBuilder().withValidId().build();

    let response = await api.todos.deleteTodo(todoId);
    let deletedTodo = await api.todos.getSpecificTodo(todoId)

    expect(response.status()).toBe(200);
    expect(deletedTodo.status()).toBe(404);
});

test('Issue a GET request to receive results in JSON format @tag("get")', async ({ api }) => {
    let response = await api.todos.getJSONHeader();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json');
});

test('Issue a GET request to receive results in XML format @tag("get")', async ({ api }) => {
    const UrlApi = 'https://apichallenges.eviltester.com';
    console.log(`Прогресс тут: ${UrlApi}/gui/challenges/${api.token}`);

    let response = await api.todos.getJSONHeader({ 'Accept': 'application/xml' });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/xml');
});
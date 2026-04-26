import { test } from '../src/helpers/fixtures/fixture';
import { expect } from '@playwright/test';
import { TodoBuilder, HeartbeatBuilder } from '../src/helpers/builders/index';


test('Create a new challenger session @tag("post")', async ({ api }) => {

    expect(api.token.length).toEqual(36);

});


test('Get the list of challenges @tag("get")', async ({ api }) => {
    let response = await api.challenges.get();
    let data = await response.json();

    expect(response.status()).toBe(200);
    expect(data.challenges.length).toEqual(59);
});

test('Get Todos list @tag("get")', async ({ api }) => {
    let response = await api.todos.getTodosList();
    let data = await response.json();

    expect(response.status()).toBe(200);
    expect(typeof data.todos[0].title).toBe('string');
    expect(typeof data.todos[0].doneStatus).toBe('boolean');
});

test('Get todos from wrong endpoint @tag("get")', async ({ api }) => {
    let response = await api.todo.getInvalidTodo();

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

    expect(response.status()).toBe(404);
});

test('Get filtered todo list @tag("get")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withDoneStatus().build();

    await api.todos.createTodo(todo)

    let response = await api.todos.getFilteredTodo();
    let data = await response.json();

    expect(response.status()).toBe(200);
    expect(data.todos.length).toBeGreaterThan(0);
    expect(data.todos[0].doneStatus).toBe(true);
});

test('Send head request @tag("head")', async ({ api }) => {
    let response = await api.todos.head();

    expect(response.status()).toBe(200);
});

test('Create a todo with valid data @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();

    let response = await api.todos.createTodo(todo)
    let data = await response.json();

    expect(response.status()).toBe(201);
    expect(data.title).toEqual(todo.title);
    expect(data.doneStatus).toEqual(todo.doneStatus);
    expect(data.description).toEqual(todo.description);
});

test('Create a todo with invalid doneStatus @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withInvalidDoneStatus().build();

    let response = await api.todos.createTodo(todo)

    expect(response.status()).toBe(400);
});

test('Create a todo with long title @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withLongTitle().withDoneStatus().withDescription().build();

    let response = await api.todos.createTodo(todo)

    expect(response.status()).toBe(400);
});

test('Create a todo with long description @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withDoneStatus().withLongDescription().build();

    let response = await api.todos.createTodo(todo)

    expect(response.status()).toBe(400);
});

test('Create a todo with max description and title @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withMaxTitle().withDoneStatus().withMaxDescription().build();

    let response = await api.todos.createTodo(todo)
    let data = await response.json();

    expect(response.status()).toBe(201);
    expect(data.title).toEqual(todo.title);
    expect(data.doneStatus).toEqual(todo.doneStatus);
    expect(data.description).toEqual(todo.description);
});

test('Create a todo with exceeding length @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withDoneStatus().withExceedingLength().build();

    let response = await api.todos.createTodo(todo)

    expect(response.status()).toBe(413);
});

test('Create a todo with extra field @tag("post")', async ({ api }) => {
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().withExtraField().build();

    let response = await api.todos.createTodo(todo)

    expect(response.status()).toBe(400);
});

test('Pass the TodoID to create a todo @tag("put")', async ({ api }) => {
    const todoId = new TodoBuilder().withInvalidId().build();
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();

    let response = await api.todos.createTodoWithId(todoId, todo)

    expect(response.status()).toBe(400);
});

test('Update an exsiting Todo using POST method @tag("post")', async ({ api }) => {
    const todoId = new TodoBuilder().withValidId().build();
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();

    let response = await api.todos.updateTodo(todoId, todo)
    let data = await response.json();


    expect(response.status()).toBe(200);
    expect(data.description).toEqual(todo.description);
});

test('Update a todo with nonexistent id @tag("post")', async ({ api }) => {
    const todoId = new TodoBuilder().withInvalidId().build();
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();
    let response = await api.todos.updateTodo(todoId, todo)

    expect(response.status()).toBe(404);
});

test('Full update an exsiting Todo using PUT method @tag("put")', async ({ api }) => {
    const todoId = new TodoBuilder().withValidId().build();
    const todo = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();

    let response = await api.todos.createTodoWithId(todoId, todo)
    let data = await response.json();

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

    expect(response.status()).toBe(200);
    expect(data.title).toEqual(todo.title);
});

test('Update an exsiting Todo without title using PUT method @tag("put")', async ({ api }) => {
    const todoId = new TodoBuilder().withValidId().build();
    const todo = new TodoBuilder().withDoneStatus().withDescription().build();

    let response = await api.todos.createTodoWithId(todoId, todo)
    let data = await response.json();

    expect(response.status()).toBe(400);
});

test('Issue a PUT request to fail to update an existing todo @tag("put")', async ({ api }) => {
    const todoId = new TodoBuilder().withValidId().build();
    const todo = new TodoBuilder().withInvalidId().withTitle().withDoneStatus().withDescription().build();

    let response = await api.todos.createTodoWithId(todoId, todo)
    let data = await response.json();

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
    let response = await api.todos.getJSONHeader({ 'Accept': 'application/xml' });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/xml');
});

test('Override a request with DELETE @tag("post")', async ({ api }) => {
    const headers = new HeartbeatBuilder().deleteOverride().build();

    let response = await api.heartbeat.methodOverride(headers);

    expect(response.status()).toBe(405);
});

test('Override a request with PATCH @tag("post")', async ({ api }) => {
    const headers = new HeartbeatBuilder().patchOverride().build();

    let response = await api.heartbeat.methodOverride(headers);

    expect(response.status()).toBe(500);
});

test('Override a request with TRACE @tag("post")', async ({ api }) => {
    const headers = new HeartbeatBuilder().traceOverride().build();

    let response = await api.heartbeat.methodOverride(headers);

    expect(response.status()).toBe(501);
});

test('Issue a DELETE request on the /heartbeat end point @tag("delete")', async ({ api }) => {
    let response = await api.heartbeat.sendDeleteMethod();

    expect(response.status()).toBe(405);
});

test('Issue a PATCH request on the /heartbeat end point @tag("patch")', async ({ api }) => {
    let response = await api.heartbeat.sendPatchMethod();

    expect(response.status()).toBe(500);
});

test('Issue a DELETE request to delete all todos @tag("delete")', async ({ api }) => {
    const UrlApi = 'https://apichallenges.eviltester.com';
    console.log(`Прогресс тут: ${UrlApi}/gui/challenges/${api.token}`);

    let todoList = await api.todos.getTodosList();
    let data = await todoList.json();

    for (const todo of data.todos) {
        await api.todos.deleteTodo(todo)

    }

    let response = await api.todos.getTodosList();
    let deletedTodos = await response.json();

    expect(response.status()).toBe(200);
    expect(deletedTodos.todos.length).toBe(0);
});
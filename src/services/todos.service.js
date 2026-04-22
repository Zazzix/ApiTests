import { test } from '../helpers/fixtures/fixture';

export class TodosService {
    constructor(request, token) {
        this.request = request;
        this.token = token;
    }
    async getTodosList() {
        const response = await this.request.get('/todos',
            {
                headers: {
                    'X-CHALLENGER': this.token,
                }
            }
        );
        return response;
    }
    async getInvalidTodo() {
        const response = await this.request.get('/todo',
            {
                headers: {
                    'X-CHALLENGER': this.token,
                }
            }
        );
        return response
    }
    async getSpecificTodo(todoId) {
        const response = await this.request.get(`/todos/${todoId.id}`,
            {
                headers: {
                    'X-CHALLENGER': this.token,
                }
            }
        );
        return response;
    }
    async getFilteredTodo() {

        const response = await this.request.get('/todos?doneStatus=true',
            {
                headers: {
                    'X-CHALLENGER': this.token,
                }
            }
        );
        return response;
    }
    async createTodo(todo) {
        const response = await this.request.post('/todos', {
            headers: {
                'X-CHALLENGER': this.token
            },
            data: todo
        });
        return response;
    }

    async head() {
        const response = await this.request.head('/todos', {
            headers: {
                'X-CHALLENGER': this.token
            },
        });
        return response;
    }
    async createTodoWithId(todoId, todo) {
        const response = await this.request.put(`/todos/${todoId.id}`,
            {
                headers: {
                    'X-CHALLENGER': this.token,
                },
                data: todo
            }
        );
        return response;
    }
    async updateTodo(todoId, todo) {
        const response = await this.request.post(`/todos/${todoId.id}`,
            {
                headers: {
                    'X-CHALLENGER': this.token,
                },
                data: {
                    'description': todo.description,
                }
            }
        );
        return response;
    }
    async deleteTodo(todoId) {
        const response = await this.request.delete(`/todos/${todoId.id}`,
            {
                headers: {
                    'X-CHALLENGER': this.token,
                },
            }
        );
        return response;
    }
}
import { test } from '../helpers/fixtures/fixture';

export class TodoService {
    constructor(request, token) {
        this.request = request;
        this.token = token;
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
}
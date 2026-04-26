import { ChallengerService, ChallengesService, TodosService, HeartbeatService, TodoService } from './index';

export class Api {
    constructor(request, token) {
        this.request = request;
        this.token = token;
        this.challenger = new ChallengerService(request);
        this.challenges = new ChallengesService(request, this.token);
        this.todos = new TodosService(request, this.token);
        this.heartbeat = new HeartbeatService(request, this.token);
        this.todo = new TodoService(request, this.token);
    }
}
import { ChallengerService, ChallengesService } from './index';

export class Api {
    constructor(request, token) {
        this.request = request;
        this.token = token;
        this.challenger = new ChallengerService(request);
        this.challenges = new ChallengesService(request, this.token);
        //this.challenges = new ChallengesService(request);
    }
}
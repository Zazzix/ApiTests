export class HeartbeatBuilder {
    constructor() {
        this.headers = {};
    }

    deleteOverride() {
        this.headers['X-HTTP-Method-Override'] = 'DELETE';
        return this;
    }

    patchOverride() {
        this.headers['X-HTTP-Method-Override'] = 'PATCH';
        return this;
    }

    traceOverride() {
        this.headers['X-HTTP-Method-Override'] = 'TRACE';
        return this;
    }

    build() {
        return { ...this.headers };
    }
}
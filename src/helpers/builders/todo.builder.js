import { faker, Faker } from "@faker-js/faker";

export class TodoBuilder {
    withValidId() {
        this.id = faker.number.int({ max: 10 });
        return this;
    }
    withInvalidId() {
        this.id = faker.number.int({ min: 11, max: 100 });
        return this;
    }
    withTitle() {
        this.title = faker.lorem.sentence(3);
        return this;
    }
    withDoneStatus() {
        this.doneStatus = true;
        return this;
    }
    withInvalidDoneStatus() {
        this.doneStatus = 'true';
        return this;
    }
    withDescription() {
        this.description = faker.lorem.sentence(5);
        return this;
    }
    build() {
        const result = { ...this };
        return result;
    }
}
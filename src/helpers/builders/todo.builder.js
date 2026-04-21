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
        this.title = faker.string.alpha({ length: { min: 1, max: 50 } });
        return this;
    }
    withLongTitle() {
        this.title = faker.string.alpha({ length: { min: 51, max: 200 } });
        return this;
    }
    withMaxTitle() {
        this.title = faker.string.alpha(50);
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
        this.description = faker.string.alpha({ length: { min: 0, max: 200 } });
        return this;
    }
    withLongDescription() {
        this.description = faker.string.alpha({ length: { min: 201, max: 300 } });
        return this;
    }
    withMaxDescription() {
        this.description = faker.string.alpha(200);
        return this;
    }
    withExceedingLength() {
        this.description = faker.string.alpha(5001);
        return this;
    }
    withExtraField() {
        this.date = faker.date.anytime();
        return this;
    }
    build() {
        const result = { ...this };
        return result;
    }
}
import { Client, Entity, Schema } from 'redis-om';

export class Visit extends Entity {
    fingerprint: string;
    product: string;
}

const schema = new Schema(Visit, {
    fingerprint: { type: 'string' },
    product: { type: 'string' },
});

export const getVisitRepository = async () => {
    const client = new Client();
    // TODO: later get this from environment
    await client.open('redis://localhost:7000');

    // @ts-ignore
    return client.fetchRepository(schema);
};

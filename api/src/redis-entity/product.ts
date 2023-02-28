import { Client, Entity, Schema } from 'redis-om';
import { Repository } from 'redis-om';

export class Product extends Entity {
    name: string;
}

export const schema = new Schema(Product, {
    name: { type: 'string' },
});

export const getProductRepository = async () => {
    const client = new Client();
    // TODO: later get this from environment
    await client.open('redis://localhost:7000');

    // @ts-ignore
    return client.fetchRepository(schema);
};

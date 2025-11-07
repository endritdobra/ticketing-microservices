import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from "mongoose";
import request from "supertest";
import {app} from "../app";

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = "test";
    process.env.NODE_ENV = "test";
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.collections;

    for (let key in collections) {
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close()
});

global.signin = async () => {
    const email = "test@test.com";
    const password = "password";
    const response = await request(app).post("/api/users/signup").send({
        email,
        password
    }).expect(201);

    const cookie = response.get("Set-Cookie");

    if (!cookie) {
        throw new Error("Failed to get cookie from response");
    }
    return cookie;
};
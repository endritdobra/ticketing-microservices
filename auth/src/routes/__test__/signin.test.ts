import request from 'supertest';
import {app} from "../../app";

it("fails when an email that does not exists is supplied", async () => {
    await request(app).post("/api/users/signin").send({
        email: "test@test.com",
        password: "password"
    }).expect(400);
});

it("fails when an invalid password is supplied", async () => {
    await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "password"
    }).expect(201);

    await request(app).post("/api/users/signin").send({
        email: "test@test.com",
        password: "testas"
    }).expect(400);
});

it("returns with a cookie when credentials are correct", async () => {
    await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: "password"
    }).expect(201);

    const response = await request(app).post("/api/users/signin").send({
        email: "test@test.com",
        password: "password"
    }).expect(200);

    expect(response.get("Set-Cookie")).toBeDefined()
});


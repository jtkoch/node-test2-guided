const supertest = require("supertest")
const server = require("../index")
const db = require("../data/config")

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async() => {
  await db.destroy()
})

describe("hobbits integration tests", () => {
  it("GET /hobbits", async () => {
    const res = await supertest(server).get("/hobbits")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body).toHaveLength(4)
    expect(res.body[0].name).toBe("sam")
    expect(res.body[1].name).toBe("frodo")
  })

  it("GET /hobbits/:id", async () => {
    const res = await supertest(server).get("/hobbits/50")
    expect(res.statusCode).toBe(404)
  })

  it("GET /hobbits/:id (not found)", async () => {
    const res = await supertest(server).get("/hobbits/2")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.name).toBe("frodo")
  })

  it("POST /hobbits", async () => {
    const data = { name: "bilbo" }
    const res = await supertest(server).post("/hobbits").send(data)
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.name).toBe("bilbo")
  })

})

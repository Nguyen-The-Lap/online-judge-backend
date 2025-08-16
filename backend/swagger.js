const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Judge API",
      version: "1.0.0",
      description: "API docs",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
            roles: {
              type: "array",
              items: { type: "string" },
            },
            refreshToken: {
              type: "array",
              items: { type: "string" },
            },
            solved: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  problemId: { type: "string" },
                  timestamp: { type: "string", format: "date-time" },
                  status: { type: "string" },
                },
              },
            },
          },
        },
        Problem: {
          type: "object",
          properties: {
            title: { type: "string" },
            difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
            tags: {
              type: "array",
              items: { type: "string" },
            },
            description: { type: "string" },
            inputFormat: { type: "string" },
            outputFormat: { type: "string" },
            constraints: { type: "string" },
            sampleInput: { type: "string" },
            sampleOutput: { type: "string" },
            explanation: { type: "string" },
            hiddenTestcases: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  input: { type: "string" },
                  output: { type: "string" },
                },
              },
            },
          },
        },
        Submission: {
          type: "object",
          properties: {
            username: { type: "string" },
            title: { type: "string" },
            lang: { type: "string" },
            code: { type: "string" },
            timestamp: { type: "string", format: "date-time" },
            status: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                pass: { type: "integer" },
                error: { type: "string" },
              },
            },
          },
        },
      },
    },
    servers: [
      {
        url: "https://online-judge-backend-8v2p.onrender.com",
      },
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/**/*.js"], // your route files with @openapi annotations
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

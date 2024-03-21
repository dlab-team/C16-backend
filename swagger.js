const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ronda API",
      version: "1.0.0",
      description: "Rest API Ronda-C16",
    },
    components: {
      schemas: {
        Resource: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            userId: {
              type: "string",
            },
            title: {
              type: "string",
            },
            content: {
              type: "string",
              maxLength: 2000,
            },
            image: {
              type: "string",
            },
            type: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
          required: ["userId", "title", "content"],
        },
        ResourceInput: {
          type: "object",
          properties: {
            userId: {
              type: "string",
            },
            title: {
              type: "string",
            },
            content: {
              type: "string",
              maxLength: 2000,
            },
            image: {
              type: "string",
            },
            type: {
              type: "string",
            },
          },
          required: ["userId", "title", "content"],
        },
        ResourcesResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Resource",
              },
            },
            currentPage: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
            totalItems: {
              type: "integer",
            },
          },
        },
        Post: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            userId: {
              type: "string",
            },
            title: {
              type: "string",
            },
            content: {
              type: "string",
              maxLength: 2000,
            },
            image: {
              type: "string",
            },
            comments: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Comment",
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
          required: ["userId", "title", "content"],
        },
        PostInput: {
          type: "object",
          properties: {
            userId: {
              type: "string",
            },
            title: {
              type: "string",
            },
            content: {
              type: "string",
              maxLength: 2000,
            },
            image: {
              type: "string",
            },
          },
          required: ["userId", "title", "content"],
        },
        PostsResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Post",
              },
            },
            currentPage: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
            totalItems: {
              type: "integer",
            },
          },
        },
        Comment: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            content: {
              type: "string",
              maxLength: 2000,
            },
            author: {
              type: "integer",
            },
            postId: {
              type: "integer",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
          required: ["content", "author", "postId"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
        Comment: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            userId: {
              type: "string",
            },
            postId: {
              type: "integer",
            },
            content: {
              type: "string",
              maxLength: 2000,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
          required: ["userId", "postId", "content"],
        },
        CommentInput: {
          type: "object",
          properties: {
            content: {
              type: "string",
              maxLength: 2000,
            },
            userId: {
              type: "string",
            },
          },
          required: ["content", "userId"],
        },
        CommentUpdateInput: {
          type: "object",
          properties: {
            content: {
              type: "string",
              maxLength: 2000,
            },
          },
          required: ["content"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            firstname: {
              type: "string",
            },
            lastname: {
              type: "string",
            },
            email: {
              type: "string",
            },
            phone: {
              type: "string",
            },
            rut: {
              type: "string",
            },
            birthday: {
              type: "string",
              format: "date",
            },
            gender: {
              type: "string",
            },
            region: {
              type: "string",
            },
            comuna: {
              type: "string",
            },
            takesCare: {
              type: "string",
            },
            photo: {
              type: "string",
            },
            completed: {
              type: "boolean",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
          required: ["id", "email"],
        },
        NewUserInput: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            firstname: {
              type: "string",
            },
            lastname: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
          required: ["id", "email"],
        },
        UserUpdateInput: {
          type: "object",
          properties: {
            firstname: {
              type: "string",
            },
            lastname: {
              type: "string",
            },
            email: {
              type: "string",
            },
            phone: {
              type: "string",
            },
            rut: {
              type: "string",
            },
            birthday: {
              type: "string",
              format: "date",
            },
            gender: {
              type: "string",
            },
            region: {
              type: "string",
            },
            comuna: {
              type: "string",
            },
            takesCare: {
              type: "string",
            },
            photo: {
              type: "string",
            },
            completed: {
              type: "boolean",
            },
          },
        },
        UsersResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
            },
            currentPage: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
            totalItems: {
              type: "integer",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
        Material: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            userId: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            materialURL: {
              type: "string",
            },
            duration: {
              type: "integer",
            },
          },
          required: [
            "userId",
            "title",
            "description",
            "materialURL",
            "duration",
          ],
        },
        MaterialInput: {
          type: "object",
          properties: {
            userId: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            materialURL: {
              type: "string",
            },
            duration: {
              type: "integer",
            },
          },
          required: [
            "userId",
            "title",
            "description",
            "materialURL",
            "duration",
          ],
        },
        MaterialsResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Material",
              },
            },
            currentPage: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
            totalItems: {
              type: "integer",
            },
          },
        },

        Role: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
          },
          required: ["id", "name"],
        },
        RoleInput: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
          required: ["name"],
        },
        RolesResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Role",
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
        MailInput: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
          },
          required: ["email"],
        },
        MailResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        }
      }, //  ---
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

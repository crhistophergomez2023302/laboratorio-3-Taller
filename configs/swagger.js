// filepath: /C:/Users/COMPUFIRE/Desktop/COPEREX/laboratorio-3-Taller/configs/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "laboratorio-3-taller-",
      version: "1.0.0",
      description: "API para gestionar la incorporacion de nuevos socios y empresas a su famosa feria Intefer",
      contact: {
        name: "Crhistopher Gómez",
        email: "crhistophergomez2007@gmail.com"
      }
    },
    servers: [
      {
        url: "http://127.0.0.1:3000/COPEREX/v1"
      }
    ],
    components: {
      schemas: {
        Company: {
          type: "object",
          required: ["name", "impactLevel", "experience"],
          properties: {
            name: {
              type: "string",
              description: "The company's name",
              maxLength: 25
            },
            impactLevel: {
              type: "string",
              description: "The company's impact level",
              enum: ["Alto", "Medio", "Bajo"]
            },
            experience: {
              type: "string",
              format: "date",
              description: "The company's experience date"
            },
            category: {
              type: "string",
              description: "The company's category",
              enum: ["AGRICULTURAL_CATEGORY", "INDUSTRIAL_CATEGORY", "COMMERCIAL_CATEGORY", "SERVICE_CATEGORY", "TECHNOLOGY_CATEGORY", "OTHER_CATEGORY"],
              default: "OTHER_CATEGORY"
            },
            status: {
              type: "boolean",
              description: "The company's status",
              default: true
            }
          }
        },
        User: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: {
              type: "string",
              description: "The user's username"
            },
            password: {
              type: "string",
              description: "The user's password"
            }
          }
        }
      }
    }
  },
  apis: ["./src/company/*.js", "./src/auth/*.js"] // Ruta a tus archivos de rutas
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };
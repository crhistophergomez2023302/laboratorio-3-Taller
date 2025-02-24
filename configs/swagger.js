import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "laboratorio-3-taller-",
            version: "1.0.0",
            description: "API para gestionar la incorporacion de nuevos socios y empresas a su famosa feria Intefer",
            contact:{
                name: "Crhistopher Gómez",
                email: "crhistophergomez2007@gmail.com"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/COPEREX/v1"
            }
        ]
    },
    apis:[

    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}
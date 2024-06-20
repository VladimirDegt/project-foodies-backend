import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Foodies API',
      version: '1.0.0',
      description:
        'Foodies API provides a comprehensive set of endpoints for managing recipes, users, categories, ingredients, ' +
        'and testimonials. This API allows developers to create, read, update, and delete resources related to ' +
        'culinary content, enabling seamless integration into food-related applications. Whether you are building a ' +
        'recipe sharing platform, a meal planning app, or a culinary blog, Foodies API offers the functionalities ' +
        'needed to power your food-based services.',
    },
    servers: [
      {
        url: 'https://foodies-ua-1497a9d7b69f.herokuapp.com/',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

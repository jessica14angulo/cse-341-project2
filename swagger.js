const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Albums Api',
        description: 'Albums Api'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

// This will generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);
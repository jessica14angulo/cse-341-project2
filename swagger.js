const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 Api',
        description: 'Albums and Books Api'
    },
    host: 'project2-zsgz.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

// This will generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);
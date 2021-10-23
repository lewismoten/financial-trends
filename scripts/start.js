process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

process.on('unhandledRejection', e => {throw e});

console.log('NODE_ENV', process.env.NODE_ENV);
console.log("BABEL_ENV", process.env.BABEL_ENV);

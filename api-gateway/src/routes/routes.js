const patientRoutes = require('./patients');

const appRouter = (app, fs) => {

  app.get('/', (req, res) => {
    res.send('API Gateway');
  });

  patientRoutes(app, fs);
};

module.exports = appRouter;
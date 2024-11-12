const express = require('express');
const app = express();
const port = 3000;

const profesoresRouter = require('./routes/profesores.js');
const alumnosRouter = require('./routes/alumnos.js');

app.use(express.json());
app.use('/alumnos', alumnosRouter);
app.use('/profesores', profesoresRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
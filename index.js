import express from 'express';
import profesoresRoute from './routes/profesores.js';
import alumnosRoute from './routes/alumnos.js';

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', alumnosRoute);
app.use('/', profesoresRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
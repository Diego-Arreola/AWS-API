const express = require('express');
const router = express.Router();
const Alumno = require('../models/alumno.js');
const validarAlumno = require('../validation/validarAlumno.js');

let alumnos = [];

router.get('/', (request, response) => {
    response.json(alumnos);
});
  
router.get('/:id', (request, response) => {
    const alumno = alumnos.find(a => a.id === parseInt(request.params.id));
    if (!alumno) return response.status(404).json({ error: 'Alumno not found' });
    response.json(alumno);
});
  
router.post('/', (request, response) => {
    const alumno = request.body;
    if (!validarAlumno(alumno)) return response.status(400).json({ error: 'Invalid data' });
    alumno.id = alumnos.length + 1;
    alumnos.push(alumno);
    response.status(201).json(alumno);
});
  
router.put('/:id', (request, response) => {
    const alumno = alumnos.find(a => a.id === parseInt(request.params.id));
    if (!alumno) return response.status(404).json({ error: 'Alumno not found' });
    const updatedAlumno = request.body;
    if (!validarAlumno(updatedAlumno)) return response.status(400).json({ error: 'Invalid data' });
    Object.assign(alumno, updatedAlumno);
    response.json(alumno);
});
  
router.delete('/:id', (request, response) => {
    const index = alumnos.findIndex(a => a.id === parseInt(request.params.id));
    if (index === -1) return response.status(404).json({ error: 'Alumno not found' });
    alumnos.splice(index, 1);
    response.status(204).send();
});

module.exports = router;
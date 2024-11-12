const express = require('express');
const router = express.Router();
const Profesor = require('../models/profesor.js');
const validarProfesor = require('../validation/validarProfesor.js');

let profesores = [];

router.get('/', (request, response) => {
    response.json(profesores);
  });
  
router.get('/:id', (request, response) => {
    const profesor = profesores.find(p => p.id === parseInt(request.params.id));
    if (!profesor) return response.status(404).json({ error: 'Profesor not found' });
    response.json(profesor);
});
  
router.post('/', (request, response) => {
    const profesor = request.body;
    if (!validarProfesor(profesor)) return response.status(400).json({ error: 'Invalid data' });
    profesor.id = profesores.length + 1;
    profesores.push(profesor);
    response.status(201).json(profesor);
});
  
router.put('/:id', (request, response) => {
    const profesor = profesores.find(p => p.id === parseInt(request.params.id));
    if (!profesor) return response.status(404).json({ error: 'Profesor not found' });
    const updatedProfesor = request.body;
    if (!validarProfesor(updatedProfesor)) return response.status(400).json({ error: 'Invalid data' });
    Object.assign(profesor, updatedProfesor);
    response.json(profesor);
});
  
router.delete('/:id', (request, response) => {
    const index = profesores.findIndex(p => p.id === parseInt(request.params.id));
    if (index === -1) return response.status(404).json({ error: 'Profesor not found' });
    profesores.splice(index, 1);
    response.status(204).send();
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Profesor = require('../models/profesor.js');
const validarProfesor = require('../validation/validarProfesor.js');

let profesores = [];

router.get('/', (request, response) => {
    response.status(200).json(profesores); 
});

router.get('/:id', (request, response) => {
    const profesor = profesores.find(p => p.id === parseInt(request.params.id));
    if (!profesor) return response.status(404).json({ error: 'Profesor not found' }); 
    response.status(200).json(profesor); 
});

router.post('/', (request, response) => {
    const { numeroEmpleado, nombres, apellidos, horasClase } = request.body;
    const id = profesores.length + 1;
    const profesor = new Profesor(id, numeroEmpleado, nombres, apellidos, horasClase); 
    if (!validarProfesor(profesor)) return response.status(400).json({ error: 'Invalid data' }); 
    profesores.push(profesor);
    response.status(201).json(profesor); 
});

router.put('/:id', (request, response) => {
    const profesor = profesores.find(p => p.id === parseInt(request.params.id));
    if (!profesor) return response.status(404).json({ error: 'Profesor not found' }); 
    const { numeroEmpleado, nombres, apellidos, horasClase } = request.body;
    const updatedProfesor = new Profesor(profesor.id, numeroEmpleado, nombres, apellidos, horasClase); 
    if (!validarProfesor(updatedProfesor)) return response.status(400).json({ error: 'Invalid data' });
    Object.assign(profesor, updatedProfesor);
    response.status(200).json(profesor); 
});

router.delete('/:id', (request, response) => {
    const index = profesores.findIndex(p => p.id === parseInt(request.params.id));
    if (index === -1) return response.status(404).json({ error: 'Profesor not found' });
    profesores.splice(index, 1);
    response.status(204).send(); 
});

module.exports = router;
import Profesor from "../models/profesor.js";
import { validarProfesor } from "../validation/validarProfesor.js";

let profesores = [];

export const getProfesores = (request, response) => {
    try{
        response.status(200).json(profesores);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getProfesor = (request, response) => {
    try{
        const profesor = profesores.find(p => p.id === parseInt(request.params.id));
        if (!profesor) return response.status(404).json({ error: 'Profesor not found' });
        response.status(200).json(profesor);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const postProfesor = (request, response) => {
    try{
        const { numeroEmpleado, nombres, apellidos, horasClase } = request.body;
        const id = profesores.length + 1;
        const profesor = new Profesor(id, numeroEmpleado, nombres, apellidos, horasClase);
        if (!validarProfesor(profesor)) return response.status(400).json({ error: 'Invalid data' });
        profesores.push(profesor);
        response.status(201).json(profesor);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const putProfesor = (request, response) => {
    try{
        const profesor = profesores.find(p => p.id === parseInt(request.params.id));
        if (!profesor) return response.status(404).json({ error: 'Profesor not found' });
        const { numeroEmpleado, nombres, apellidos, horasClase } = request.body;
        const updatedProfesor = new Profesor(profesor.id, numeroEmpleado, nombres, apellidos, horasClase);
        if (!validarProfesor(updatedProfesor)) return response.status(400).json({ error: 'Invalid data' });
        Object.assign(profesor, updatedProfesor);
        response.status(200).json(profesor);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteProfesor = (request, response) => {
    try{
        const index = profesores.findIndex(p => p.id === parseInt(request.params.id));
        if (index === -1) return response.status(404).json({ error: 'Profesor not found' });
        profesores.splice(index, 1);
        response.status(200).send();
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
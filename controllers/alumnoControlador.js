import Alumno from "../models/alumno.js";
import { validarAlumno } from "../validation/validarAlumno.js";

let alumnos = [];

export const getAlumnos = (request, response) => {
    try{
        response.status(200).json(alumnos);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getAlumno = (request, response) => {
    try{
        const alumno = alumnos.find(a => a.id === parseInt(request.params.id));
        if (!alumno) return response.status(404).json({ error: 'Alumno not found' });
        response.status(200).json(alumno);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const postAlumno = (request, response) => {
    try{
        const { id, nombres, apellidos, matricula, promedio } = request.body;
        const alumno = new Alumno(id, nombres, apellidos, matricula, promedio);
        if (!validarAlumno(alumno)) return response.status(400).json({ error: 'Invalid data' });
        alumnos.push(alumno);
        response.status(201).json(alumno);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const putAlumno = (request, response) => {
    try{
        const alumno = alumnos.find(a => a.id === parseInt(request.params.id));
        if (!alumno) return response.status(404).json({ error: 'Alumno not found' });
        const { nombres, apellidos, matricula, promedio } = request.body;
        const updatedAlumno = new Alumno(alumno.id, nombres, apellidos, matricula, promedio);
        if (!validarAlumno(updatedAlumno)) return response.status(400).json({ error: 'Invalid data' });
        Object.assign(alumno, updatedAlumno);
        response.status(200).json(alumno);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteAlumno = (request, response) => {
    try {
        const index = alumnos.findIndex(a => a.id === parseInt(request.params.id));
        if (index === -1) return response.status(404).json({ error: 'Alumno not found' });
        alumnos.splice(index, 1);
        response.status(200).send();
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}


import { prisma } from '../aws/DbConnection.js';

export const getProfesores = async (request, response) => {
    try{
        const profesores = await prisma.Profesor.findMany();
        response.status(200).json(profesores);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getProfesor = async (request, response) => {
    try {
        const profesor = await prisma.Profesor.findUnique({
            where: { id: parseInt(request.params.id) }
        });
        if (!profesor) {
            response.status(404).json({ error: 'Profesor not found' });
        } else {
            response.status(200).json(profesor);
        }
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const postProfesor = async (request, response) => {
    try{
        const profesor = await prisma.Profesor.create({
            data: {
                nombres: request.body.nombres,
                apellidos: request.body.apellidos,
                numeroEmpleado: parseInt(request.body.numeroEmpleado),
                horasClase: parseInt(request.body.horasClase),
            }
        });
        response.status(201).json(profesor);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const putProfesor = async (request, response) => {
    try {
        const { id } = request.params;
        const numericId = Number(id);
        const {nombres, apellidos, numeroEmpleado ,horasClase } = request.body;
        const profesor = await prisma.Profesor.update({
            where: {
                id: numericId
            },
            data: {
                nombres,
                apellidos,
                numeroEmpleado: parseInt(numeroEmpleado),
                horasClase: parseInt(horasClase)
            }
        });
        if (!profesor) {
            return response.status(404).json({ error: 'Profesor not found' });
        }
        response.status(200).json(profesor);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }

}

export const deleteProfesor = async (request, response) => {
    try {
        const profesor = await prisma.Profesor.findUnique({
            where: { id: parseInt(request.params.id) }
        });
        if (!profesor) return response.status(404).json({ error: 'Profesor not found' });
        await prisma.Profesor.delete({
            where: { id: parseInt(request.params.id) }
        });
        response.status(200).json({ message: 'Profesor deleted successfully' });
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
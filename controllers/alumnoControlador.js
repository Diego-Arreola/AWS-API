import { prisma } from '../aws/DbConnection.js'
import { uploadFile } from "../aws/S3Connection.js";
import { sessionLogin, sessionLogout, getSessionString } from "../aws/DynamoConnection.js";
import { snsClient } from "../aws/SNSConnection.js";
import { SNS_TOPIC_ARN } from "../aws/config.js";
import { v4 as uuidv4, v4 } from 'uuid';
import crypto from 'crypto';
import { PublishCommand } from "@aws-sdk/client-sns";

export const getAlumnos = async (request, response) => {
    try{
        const alumnos = await prisma.Alumno.findMany();
        response.status(200).json(alumnos);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getAlumno = async (request, response) => {
    try {
        const alumno = await prisma.Alumno.findUnique({
            where: { id: parseInt(request.params.id) }
        });
        if (!alumno) {
            response.status(404).json({ error: 'Alumno not found' });
        } else {
            response.status(200).json(alumno);
        }
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const postAlumno = async (request, response) => {
    try{
        const alumno = await prisma.Alumno.create({
            data: {
                nombres: request.body.nombres,
                apellidos: request.body.apellidos,
                matricula: request.body.matricula,
                promedio: request.body.promedio,
                fotoPerfilUrl: null,
                password: request.body.password
            }
        });
        response.status(201).json(alumno);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const postAlumnoFotoPerfil = async (request, response) => {
    try {
        const { id } = request.params;
        const numericId = Number(id);
        const result = await uploadFile(request.files.foto)
        response.status(200).json({ fotoPerfilUrl: result });
    
        const alumno = await prisma.Alumno.update({
            where: {
              id:  numericId
            },
            data: {
                fotoPerfilUrl: result
            }
        });

        if (!alumno) {
            return response.status(404).json({ error: 'Alumno not found' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }

}

export const putAlumno = async (request, response) => {
    try {
        const { id } = request.params;
        const numericId = Number(id);
        const { nombres, apellidos, matricula, promedio } = request.body;
        const alumno = await prisma.Alumno.update({
            where: {
                id: numericId
            },
            data: {
                nombres,
                apellidos,
                matricula,
                promedio
            }
        });
        if (!alumno) {
            return response.status(404).json({ error: 'Alumno not found' });
        }
        response.status(200).json(alumno);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }

};

export const deleteAlumno = async (request, response) => {
    try {
        const alumno = await prisma.Alumno.findUnique({
            where: { id: parseInt(request.params.id) }
        });
        if (!alumno) return response.status(404).json({ error: 'Alumno not found' });
        await prisma.Alumno.delete({
            where: { id: parseInt(request.params.id) }
        });
        response.status(200).json({ message: 'Alumno deleted successfully' });
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const loginSession = async (request, response) => {
    try {
        const alumno = await prisma.Alumno.findUnique({
            where: { id: parseInt(request.params.id) }
        });
        if (!alumno) return response.status(404).json({ error: 'Alumno not found' });
        if (request.body.password !== alumno.password) return response.status(400).json({ error: 'Invalid Credentials' });
        const sessionData = {
            id: uuidv4(),
            fecha: Math.floor(Date.now() / 1000),
            alumnoId: request.params.id,
            active: true,
            sessionString: crypto.randomBytes(64).toString('hex')
        }
        const result = await sessionLogin(sessionData);
        console.log('Session created successfully');
        console.log(sessionData)
        response.status(200).json({sessionString: sessionData.sessionString}); 
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const logoutSession = async (request, response) => {
    try {
        const { sessionString } = request.body;
        console.log("request sessionString:" + sessionString);

        const result = await sessionLogout(sessionString);
        response.status(200).json({ message: 'Session Closed' });
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getAlumnoSession = async (request, response) => {
    try {
        const {sessionString} = request.body
        console.log("request:" + sessionString);
        const session = await getSessionString(sessionString);
        if (!session)  return response.status(400).json({ error: 'Session not found' }); 
        response.status(200).json({ message: 'Session verified' });
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const snsPublish = async (request, response) => {
    
        const alumno = await prisma.alumno.findUnique({
            where: { id: parseInt(request.params.id) }
        });
        if (!alumno) return response.status(404).json({ error: 'Alumno not found' });
        
        const command = new PublishCommand({
            Message: `Alumno: ${alumno.nombres} ${alumno.apellidos}, promedio de : ${alumno.promedio}.`,
            TopicArn: SNS_TOPIC_ARN,
            protocol: 'email',
        });
        try {
            const data = await snsClient.send(command);
            response.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            response.status(500).json({ error: 'Internal Server Error' });
        }
}

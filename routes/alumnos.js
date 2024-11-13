import express from 'express';
import { getAlumnos, getAlumno, postAlumno, putAlumno, deleteAlumno } from '../controllers/alumnoControlador.js';

const router = express.Router();

router.get('/alumnos', getAlumnos);

router.get('/alumnos/:id', getAlumno);

router.post('/alumnos', postAlumno);

router.put('/alumnos/:id', putAlumno);

router.delete('/alumnos/:id', deleteAlumno);

router.route('/alumnos')
    .all((req, res) => {
        res.status(405).json({ error: "Method Not Allowed" });
    });

router.route('/alumnos/:id')
    .all((req, res) => {
        res.status(405).json({ error: "Method Not Allowed" });
    });

export default router;
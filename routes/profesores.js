import express from 'express';
import { getProfesores, getProfesor, postProfesor, putProfesor, deleteProfesor } from '../controllers/profesorControlador.js';

const router = express.Router();

router.get('/profesores', getProfesores);

router.get('/profesores/:id', getProfesor);

router.post('/profesores', postProfesor);

router.put('/profesores/:id', putProfesor);

router.delete('/profesores/:id', deleteProfesor);

router.route('/profesores')
    .all((req, res) => {
        res.status(405).json({ error: "Method Not Allowed" });
    });

router.route('/profesores/:id')
    .all((req, res) => {
        res.status(405).json({ error: "Method Not Allowed" });
    });

export default router;
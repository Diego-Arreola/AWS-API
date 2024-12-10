import express from 'express';
import { profesorDataValidatebyBody, profesorDataValidatebyParams } from '../validation/validarProfesor.js';
import { getProfesores, getProfesor, postProfesor, putProfesor, deleteProfesor } from '../controllers/profesorControlador.js';

const router = express.Router();

router.get('/profesores', getProfesores);

router.get('/profesores/:id', profesorDataValidatebyParams, getProfesor);

router.post('/profesores', profesorDataValidatebyBody, postProfesor);

router.put('/profesores/:id', profesorDataValidatebyBody, profesorDataValidatebyParams, putProfesor);

router.delete('/profesores/:id', profesorDataValidatebyParams, deleteProfesor);

router.route('/profesores')
    .all((req, res) => {
        res.status(405).json({ error: "Method Not Allowed" });
    });

router.route('/profesores/:id')
    .all((req, res) => {
        res.status(405).json({ error: "Method Not Allowed" });
    });

export default router;
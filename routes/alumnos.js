import express from 'express';
import { alumnoDataValidatebyParams, alumnoDataValidatebyBody } from '../validation/validarAlumno.js';
import { getAlumnos, getAlumno, postAlumno, putAlumno, deleteAlumno, postAlumnoFotoPerfil, loginSession, logoutSession, getAlumnoSession, snsPublish } from '../controllers/alumnoControlador.js';

const router = express.Router();

router.get('/alumnos', getAlumnos);

router.get('/alumnos/:id', alumnoDataValidatebyParams, getAlumno);

router.post('/alumnos', alumnoDataValidatebyBody, postAlumno);

router.put('/alumnos/:id', alumnoDataValidatebyParams, alumnoDataValidatebyBody, putAlumno);

router.delete('/alumnos/:id', alumnoDataValidatebyParams, deleteAlumno);

router.post('/alumnos/:id/fotoPerfil', postAlumnoFotoPerfil);

router.post('/alumnos/:id/session/login', loginSession);

router.post('/alumnos/:id/session/logout', logoutSession);

router.post('/alumnos/:id/session/verify', getAlumnoSession);

router.post('/alumnos/:id/email', snsPublish);

router.route('/alumnos')
    .all((req, res) => {
        res.status(405).json({ error: "Method Not Allowed" });
    });

router.route('/alumnos/:id')
    .all((req, res) => {
        res.status(405).json({ error: "Method Not Allowed" });
    });

export default router;
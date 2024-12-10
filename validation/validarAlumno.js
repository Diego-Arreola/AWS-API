import { body, param, validationResult } from "express-validator";

export const alumnoDataValidatebyBody = [
    body("nombres")
        .exists({ checkFalsy: true })
        .withMessage("El campo 'nombre' es requerido."),

    body("apellidos")
        .exists({ checkFalsy: true })
        .withMessage("El campo 'apellidos' es requerido."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        next();
    },
];

export const alumnoDataValidatebyParams = [
    param("id")
        .exists({ checkFalsy: true })
        .withMessage("El campo 'id' es requerido."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        next();
    },
];
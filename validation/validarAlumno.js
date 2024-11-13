export const validarAlumno = (alumno) => {
    if (!alumno.id || typeof alumno.id !== 'number') return false;
    if (!alumno.nombres || typeof alumno.nombres !== 'string') return false;
    if (!alumno.apellidos || typeof alumno.apellidos !== 'string') return false;
    if (!alumno.matricula || typeof alumno.matricula !== 'string') return false;
    if (!alumno.promedio || typeof alumno.promedio !== 'number') return false;
    return true;
}


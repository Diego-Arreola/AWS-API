function validar(alumno) {
    if (!alumno.matricula || typeof alumno.matricula !== 'string') return false;
    if (!alumno.nombres || typeof alumno.nombres !== 'string') return false;
    if (!alumno.apellidos || typeof alumno.apellidos !== 'string') return false;
    if (!alumno.carrera || typeof alumno.carrera !== 'string') return false;
    return true;
}
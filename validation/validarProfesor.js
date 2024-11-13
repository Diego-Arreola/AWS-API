export const validarProfesor = (profesor) =>{
  if (!profesor.id || typeof profesor.id !== 'number') return false;
  if (!profesor.numeroEmpleado || typeof profesor.numeroEmpleado !== 'number') return false;
  if (!profesor.nombres || typeof profesor.nombres !== 'string') return false;
  if (!profesor.apellidos || typeof profesor.apellidos !== 'string') return false;
  if (!profesor.horasClase || typeof profesor.horasClase !==  'number') return false;
  return true;
}


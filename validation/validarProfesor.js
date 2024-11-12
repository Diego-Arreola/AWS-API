function validar(profesor) {
  if (!profesor.numeroEmpleado || typeof profesor.numeroEmpleado !== 'string') return false;
  if (!profesor.nombres || typeof profesor.nombres !== 'string') return false;
  if (!profesor.apellidos || typeof profesor.apellidos !== 'string') return false;
  if (!profesor.horasClase || typeof profesor.horasClase !== 'number') return false;
  return true;
}

module.exports = validar;
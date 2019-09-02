var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado){
    var horarioDisponibles = this.horarios.filter(horario => horario !== horarioReservado);
    this.horarios = horarioDisponibles;
    return;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

function sumatoria(numeros){
    var sumatoriaTotal = 0;
    numeros.forEach(numero =>sumatoriaTotal += numero);
    return sumatoriaTotal;
} 

function promedio(numeros) {
    var suma = sumatoria(numeros);
    return Math.round((suma/numeros.length) * 10) / 10;
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
       return promedio(this.calificaciones);
    }
}


var Reserva = function (horario, cantidadDePersonas, precioPersona, codigoDescuento) {
	this.horario = horario,
	this.cantidadDePersonas = cantidadDePersonas,
	this.precioPersona = precioPersona,
	this.codigoDescuento = codigoDescuento
}

Reserva.prototype.calcularPrecioBase = function() {
	return this.cantidadDePersonas * this.precioPersona;
};

Reserva.prototype.descuentoParaGruposGrandes = function() {
	//si la cantidad de personas de la reserva está entre 4 y 6 personas, se agrega un 5% de descuento. Para grupos entre de 7 y 8 personas un 10% de descuento y para grupos de más de 8 personas un 15% de descuento
	if(this.cantidadDePersonas >= 4 && this.cantidadDePersonas <= 6){
		return this.calcularPrecioBase()*0.05;
	}
	else if(this.cantidadDePersonas >= 7 && this.cantidadDePersonas < 8){
		return this.calcularPrecioBase()*0.1;
	}
	else if(this.cantidadDePersonas >=8){
		return this.calcularPrecioBase()*0.15;
	} else{
		return 0;
	}
};

Reserva.prototype.descuentoPorCupon = function(){
	//DES15: obtiene un 15% de descuento, DES200: obtiene $200 de descuento, DES1: obtiene de descuento el valor equivalente al precio de una persona.
	if(this.codigoDescuento === 'DES15') {
        return this.calculaPrecioBase() * 0.15;
    } else if(this.codigoDescuento === 'DES200') {
        return 200;
    } else if(this.codigoDescuento === 'DES1') {
        return this.precioPersona;
    } else {
        return 0;
    };
}

Reserva.prototype.adicionalPorHorario = function() {
	//las franjas horarias de 13 a 14 y de 20 a 21 horas son muy concurridas. Se agrega un adicional del 5% si la reserva fue hecha para un horario dentro de esos rangos.
    var horarioDeReserva = this.horario.getHours();
    if((horarioDeReserva >= 13 && horarioDeReserva < 14) || (horarioDeReserva >= 20 && horarioDeReserva < 21)) {
        return this.calcularPrecioBase() * 0.05;
    } else {
        return 0;
    };
}

Reserva.prototype.adicionalPorDia = function() {
	//si la reserva fue realizada para alguno de los días del fin de semana (viernes, sábado o domingo) se le agrega un adicional del 10%.
    var diaDeReserva = this.horario.getDay();
    if(diaDeReserva >= 5 && diaDeReserva <= 7) {
        return this.calcularPrecioBase() * 0.1;
    } else {
        return 0;
    };
}

Reserva.prototype.precioFinal = function() {
    return this.calcularPrecioBase() - this.descuentoParaGruposGrandes() - this.descuentoPorCupon() + this.adicionalPorDia() + this.adicionalPorHorario();
}
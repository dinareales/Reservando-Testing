var expect = chai.expect;
var restaurant = new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7]);

describe('Testeamos la reserva de horarios', function(){
	beforeEach(function(){
		//reiniciamos los horarios disponibles
		restaurant.horarios = ["17:00", "19:00", "22:30"];
	})

	it('Dado un restaurante con el horario 17:00, al reservar ese horario, se elimina ese horario de su lista de horarios ', function() {
    	restaurant.reservarHorario("17:00");
    	expect(restaurant.horarios).to.have.members(["19:00","22:30"]);
	})
	it('Dado un horario de reserva que el restaurante no posee, se mantienen la lista de horarios del restaurante', function() {
    	restaurant.reservarHorario("15:00");
    	expect(restaurant.horarios).to.have.members(restaurant.horarios);
	})
	it('Dado un restaurante con diferentes horarios, al realizar la reserva pasando un string vacio, se mantienen la lista de horarios del restaurante', function() {
		restaurant.reservarHorario("");
		expect(restaurant.horarios).to.have.members(restaurant.horarios);
	})
})

describe('Testeamos el calculo de la puntuacion',function(){
	it('Dado un restaurante con las calificaciones [8, 8, 8, 8, 5, 7], la puntuación (que es el promedio de ellas) debe ser 7.3', function() {
		expect(restaurant.obtenerPuntuacion()).to.equal(7.3);
    })

	it('Dado un restaurante sin calificaciones, su puntuación promedio es 0 ', function() {
		restaurant.calificaciones = [];
		expect(restaurant.obtenerPuntuacion()).to.equal(0);
    })
})

describe('Testeamos que al realizar una calificación, se ingrese un valor correcto.', function(){
    beforeEach(function(){
        // Reiniciamos las calificaciones originales
        restaurant.calificaciones = [8, 8, 8, 8, 5, 7];
    })

    it('Dado un restaurante con 6 calificaciones, al agregrar una calificación válida entre 0 y 9, se agrega correctamente', function() {
    	restaurant.calificar(9);
    	expect(restaurant.calificaciones).to.eql([8, 8, 8, 8, 5, 7, 9]);
    })
    it('Dado un restaurante con 6 calificaciones, al agregrar una calificación inválida negativa, no se agrega correctamente', function() {
    	restaurant.calificar(-2);
    	expect(restaurant.calificaciones).to.eql([8, 8, 8, 8, 5, 7]);
    })
    it('Dado un restaurante con 6 calificaciones, al agregrar una calificación inválida con numeros decimales entre 0 y 9, no se agrega correctamente', function() {
    	restaurant.calificar(4.5);
    	expect(restaurant.calificaciones).to.eql([8, 8, 8, 8, 5, 7]);
    })
    it('Dado un restaurante con 6 calificaciones, al agregrar una calificación inválida mayor a 9, no se agrega correctamente', function() {
    	restaurant.calificar(10);
    	expect(restaurant.calificaciones).to.eql([8, 8, 8, 8, 5, 7]);
    })
    it('Dado un restaurante con 6 calificaciones, al agregrar una calificación vacia, no se agrega correctamente', function() {
    	restaurant.calificar();
    	expect(restaurant.calificaciones).to.eql([8, 8, 8, 8, 5, 7]);
    })
})

describe('Buscar un restaurante', function() {
	// el listado de los restaurantes va desde el id 1 al 24
    it('Dado un listado de restaurantes, al buscar el restaurante con id 1, se obtiene el restaurante correcto', function() {
        var restaurant = listado.buscarRestaurante(1)
        expect(restaurant.id).to.equal(1);
    })
    it('Dado un listado de restaurantes, al buscar el restaurante con id 0, no se encuentra ningun restaurante', function() {
        var restaurant = listado.buscarRestaurante(0)
        expect(restaurant).to.equal('No se ha encontrado ningún restaurant');
    })
    it('Dado un listado de restaurantes, al buscar el restaurante con id negativo,  no se encuentra ningun restaurante', function() {
        var restaurant = listado.buscarRestaurante(-4)
        expect(restaurant).to.equal('No se ha encontrado ningún restaurant');
    })
    it('Dado un listado de restaurantes, al buscar el restaurante con id decimal,  no se encuentra ningun restaurante', function() {
        var restaurant = listado.buscarRestaurante(7.6)
        expect(restaurant).to.equal('No se ha encontrado ningún restaurant');
    })
    it('Dado un listado de restaurantes, al buscar el restaurante con id mayor a 24,  no se encuentra ningun restaurant', function() {
        var restaurant = listado.buscarRestaurante(25)
        expect(restaurant).to.equal('No se ha encontrado ningún restaurant');
    })
})

describe('Filtrar el listado de restaurantes', function() {
    it('Dado un listado con 24 restaurantes, si no se aplica ningún filtro, se obtiene como resultado 24 restaurantes', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, null, null)
        expect(restaurantesFiltrados.length).to.equal(24);
    })
})
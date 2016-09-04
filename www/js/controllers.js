var app = angular.module('controllers', []);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
});

//Inicializar datos
app.factory('Datos', function() {
  datos = {};
  datos.equipos_num = '';
  datos.equipos = []; //array de equipos, cada uno contendrá un nombre y la puntuación
	datos.turno_actual = 0; //numero del equipo (clave del array)
	datos.total_cartas = 2; //TODO: cambiar a 40!
	datos.restantes = datos.total_cartas;
	datos.ronda = 1;
	datos.ronda_desc = ['Descripción', 'Una palabra', 'Mímica', 'Pose'];
	datos.tiempo = 5;
	datos.pasar = true;
	datos.ver_puntos = true;
	datos.ver_restantes = true;
	datos.ver_descripciones = true;
	//datos.cartas = ['Tom cruise', 'Miliki', 'Michael Knight']; //TODO: sacar 40 aleatoriamente de los mazos seleccionados
	datos.cartas = ['Miliki', 'Michael Knight']; //TODO: sacar 40 aleatoriamente de los mazos seleccionados

  return datos;
});

//Toasts
app.controller('MainCtrl', function($ionicPlatform, $scope, $cordovaToast) {
	$scope.data = {
		texto : 'A futuro',
		duracion : 'long',
		posicion : 'bottom',
	};
  $ionicPlatform.ready(function() {
    $scope.showToast = function() {
			//todo: probar si va sin englobar los datos en data
			//en el primer intento no funcionó
      $cordovaToast.show($scope.data.texto, $scope.data.duracion, $scope.data.posicion);
    }
  });
});

app.controller('EquiposNumCtrl', function($ionicPlatform, $scope, Datos) {
	$scope.datos = Datos;
	$scope.datos.equipos_num = 2;

	function timePickerCallback(val){
		if(val != undefined){
			$scope.datos.equipos_num = val;
		}
	};

	//código del numberpicker (estaría bien que ionic trajera algo asi de serie, pero sin popup)
  $ionicPlatform.ready(function() {
		$scope.numberPickerObject = {
	    inputValue: $scope.datos.equipos_num, //Optional
	    minValue: 2,
	    maxValue: 5,
	    //precision: 0,  //Optional
	    decimalStep: 1,  //Optional
	    format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
	    titleLabel: 'Elegir número de jugadores',  //Optional
	    setLabel: 'Aceptar',  //Optional
	    closeLabel: 'Cancelar',  //Optional
	    //setButtonType: 'button-positive',  //Optional
	    closeButtonType: 'hidden',  //Optional
	    callback: function (val) {    //Mandatory
	    	timePickerCallback(val);
	  	}
		};
  });
});

app.controller('EquiposNombreCtrl', function($ionicPlatform, $scope, Datos) {
	$scope.datos = Datos;

	for(i in range(1, $scope.datos.equipos_num)){
		i = parseInt(i) + 1; //por alguna razon el rango empieza en 0 en vez de en 1...
		$scope.datos.equipos[i] = new Object();
		$scope.datos.equipos[i].nombre = 'Equipo ' + i;
		$scope.datos.equipos[i].puntos = [0, 0, 0, 0, 0];
	}
	$scope.datos.equipos.splice(0, 1); //al no haber creado la posicion 0, esta es undefined, se quita

  $ionicPlatform.ready(function() {

  });

	//TODO: comprobar que no se repitan los nombres!
});

app.controller('TurnoEmpezarCtrl', function($ionicPlatform, $scope, Datos) {
	$scope.datos = Datos;

  $ionicPlatform.ready(function() {

  });
});

app.controller('TurnoCtrl', function($ionicPlatform, $scope, $location, $interval, Datos) {
	$scope.datos = Datos;
	$scope.tiempo = $scope.datos.tiempo;
	$scope.datos.acertadas = [];

	intervalo = $interval(function(){
		$scope.tiempo -= 1;
		if($scope.tiempo <= 0){
			$interval.cancel(intervalo);
			//cambiar a pantalla de acertadas
      $location.path('/acertadas');
		}
	}, 1000);

	$scope.pasar = function(){
		alert('pasar');
		//TODO: eliminar del array y ponerla en un array de descartes. Al terminar el turno, los nombres descartados se añaden al final del mazo
	};

	$scope.acertar = function(){
		//añadir punto al equipo
		$scope.datos.equipos[$scope.datos.turno_actual].puntos[$scope.datos.ronda] += 1;
		//mover carta del mazo a acertadas //TODO: cambiar por eliminar del array, ahora se copia
		$scope.datos.acertadas.push($scope.datos.cartas[$scope.datos.total_cartas - $scope.datos.restantes]);
		//bajar en uno la variable "restantes"
		$scope.datos.restantes -= 1;

		if($scope.datos.restantes == 0){
			$interval.cancel(intervalo);
			//cambiar a pantalla de acertadas
      $location.path('/acertadas');
		}
	};

  $ionicPlatform.ready(function() {

  });
});

app.controller('AcertadasCtrl', function($ionicPlatform, $scope, Datos) {
	$scope.datos = Datos;

	//cambio de turno
	if($scope.datos.turno_actual < $scope.datos.equipos_num - 1)
		$scope.datos.turno_actual += 1 ;
	else
		$scope.datos.turno_actual = 0 ;
	//cambio de ronda
	if($scope.datos.restantes == 0)
		$scope.datos.ronda += 1 ;

	//siguiente pantalla
	if($scope.datos.restantes > 0)
		$scope.siguiente_pantalla = 'turno_empezar';
	else{
		$scope.siguiente_pantalla = 'fin_ronda';
		$scope.datos.restantes = $scope.datos.total_cartas;
	}

  $ionicPlatform.ready(function() {

  });
});

app.controller('FinRondaCtrl', function($ionicPlatform, $scope, Datos) {
	$scope.datos = Datos;
	//TODO: comporbar entre quienes se ha producido el empate
	//al comprobar el maxPoints, si son iguales ya se sabe que es empate. Guardar
	//un array con esas posiciones
	//una vez hecho esto, quitar lo del lastindexof

	//si aun quedan rondas, volver a empezar turno
	if( (datos.ronda - 1) < 3 ){
		$scope.siguiente_pantalla = 'turno_empezar';
	}
	else{
		//sumar total de puntos por equipo
		$scope.totales = [];
		$scope.datos.ganador = 0;
		$scope.maxPoints = 0;
		//for(i in range(1, $scope.datos.equipos_num)){
		for(i = 0; i < $scope.datos.equipos_num; i++){
			$scope.totales.push(0);
			for(j = 1; j <= $scope.datos.ronda - 1; j++){
				$scope.totales[i] += $scope.datos.equipos[i].puntos[j];
			}
			if($scope.totales[i] > $scope.maxPoints){
				$scope.maxPoints = $scope.totales[i];
				$scope.datos.ganador = i;
			}
		}
		console.log($scope.totales);
		//comprobar si hay algun empate
		for(i = 0; i < $scope.totales.length; i++){
			$scope.datos.empate = ($scope.totales.lastIndexOf($scope.totales[i]) != i) ? true : false;
			if($scope.datos.empate){
				break;
			}
		}
		if($scope.datos.empate){
			//empate y ronda 4
			$scope.siguiente_pantalla = 'empate';
		}
		else{
			//si no hay empate, a pantalla de ganador
			$scope.siguiente_pantalla = 'ganador';
		}
	}

  $ionicPlatform.ready(function() {

  });
});

app.controller('EmpateCtrl', function($ionicPlatform, $scope, Datos) {
	$scope.datos = Datos;

  $ionicPlatform.ready(function() {

  });
});

app.controller('GanadorCtrl', function($ionicPlatform, $scope, Datos) {
	$scope.datos = Datos;

	if(!$scope.datos.empate){
		$scope.texto = '¡Los ganadores son ' + $scope.datos.equipos[$scope.datos.ganador].nombre + '!';
	}
	else{
		$scope.texto = '¡Empate entre' + '' + '!'; //TODO: meter los nombres del array de empates
	}

  $ionicPlatform.ready(function() {

  });
});

app.controller('AjustesCtrl', function($ionicPlatform, $scope, Datos) {
	$scope.datos = Datos;

  $ionicPlatform.ready(function() {

  });
});

app.controller('MazosCtrl', function($ionicPlatform, $scope, Datos) {
	$scope.datos = Datos;

  $ionicPlatform.ready(function() {

  });
});

function range(start, count) {
  return Array.apply(0, Array(count)).map(function (element, index) {
  	return index + start;
	});
}

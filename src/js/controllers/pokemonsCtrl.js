const pokemonsCtrl = pokemon.controller('pokemonsCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {

	const vm = this;
	const baseUrl = 'http://pokeapi.co/api/v1/';

	$http
		.get(baseUrl + "pokemon/?limit=12").success(function(data) {
			console.log('data', data);
			vm.pokemons = data.objects;
		})
		.then(function() {
			vm.favorites.forEach(function(fav) {
				vm.pokemons.forEach(function(pok) {
					if (pok.pkdx_id == fav.pkdx_id) {
						pok.favorite = true;
					}
				});
			});
		})

	vm.favorites = $localStorage.favorites || [];

}])

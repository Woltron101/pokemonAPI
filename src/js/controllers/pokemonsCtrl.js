const pokemonsCtrl = pokemon.controller('pokemonsCtrl', ['$http', '$localStorage',
	function($http, $localStorage) {

		const vm = this;
		const baseUrl = 'http://pokeapi.co/api/v1/';
		vm.preloader = true;
		vm.favorites = $localStorage.favorites || [];



		$http
			.get(baseUrl + "pokemon/?limit=" + 12).success(function(data) {
				vm.pokemons = data.objects;
			})
			.then(function() {
				compareFavorites();
				vm.preloader = false;
			}, function() {
				$http.get('./js/beckup.json').success(function(data) {
					vm.pokemons = data;
				})
				vm.preloader = false;
				vm.error = true;
			});

		function compareFavorites() {
			vm.favorites.forEach(function(fav) {
				vm.pokemons.forEach(function(pok) {
					if (pok.pkdx_id == fav.pkdx_id) {
						pok.favorite = true;
					}
				});
			});
		}
	}
])

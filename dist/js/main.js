const pokemon = angular.module('pokemon', [
		'ui.router',
		'ngStorage'
	])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('pokemons', {
					url: '/pokemons',
					templateUrl: 'templates/pokemons.html',
					conteroller: 'pokemonsCtrl'

				})
				.state('favorites', {
					url: '/pokemons/favorites',
					templateUrl: 'templates/favorites.html',
					controller: 'favoritesCtrl'

				});
			$urlRouterProvider.otherwise('/pokemons');
		}
	])

const mainCtrl = pokemon.controller('mainCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
	const vm = this;
	vm.options = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Ice", "Dragon", "Dark", "Fairy", "Unknown", "Shadow", "Psychic"];
	vm.type = "";
	vm.favorites = $localStorage.favorites || [];

	vm.addToFavorites = function(pokemon) {
		pokemon.favorite = true;
		vm.favorites.push(pokemon);
		$localStorage.favorites = vm.favorites;
	}

	vm.removeFromFavorites = function(pokemon) {
		pokemon.favorite = false;

		vm.favorites.forEach(function(element, index) {
			if (element.pkdx_id == pokemon.pkdx_id) {
				vm.favorites.splice(index, 1);
			}
		});

		$localStorage.favorites = vm.favorites;
	}

	vm.showModal = function(pokemon) {
		vm.modal = pokemon;
		vm.modal.active = true;
	}

	vm.hideModal = function(e) {
		var target = angular.element(e.target);

		if (target.hasClass('popup-wrap') || target.hasClass('close')) {
			vm.modal.active = false;
		}
	}

	vm.selectItems = function(pokemons) {
		return pokemons.forEach(function(element) {
			if (element.types.name == vm.type) {
				return pokemon;
			} else {
				return false;
			}
		});
	};

	vm.selectType = function(type) {
		vm.type = type;
	}
}])

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

const favoritesCtrl = pokemon.controller('favoritesCtrl', ['$scope', '$localStorage', function($scope, $localStorage) {

	const vm = this;

	vm.pokemons = $localStorage.favorites || [];
}])

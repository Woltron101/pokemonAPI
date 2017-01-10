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
					controller: 'pokemonsCtrl',
					controllerAs: 'pokemons'
				})
				.state('favorites', {
					url: '/pokemons/favorites',
					templateUrl: 'templates/favorites.html',
					controller: 'favoritesCtrl',
					controllerAs: 'pokemons'
				});

			$urlRouterProvider.otherwise('/pokemons');
		}
	])

const mainCtrl = pokemon.controller('mainCtrl', ['$scope', '$rootScope', '$http', '$localStorage', function($scope, $rootScope, $http, $localStorage) {
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
		if (target.hasClass('modal-wrap') || target.hasClass('close') || e.keyCode === 27) {
			vm.modal.active = false;
		}
	}

	vm.selectType = function(type) {
		vm.type = type;
	}

	$rootScope.$on('$stateChangeSuccess', resetType());

	function resetType() {
		vm.type = "";
	}
}])

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

const favoritesCtrl = pokemon.controller('favoritesCtrl', ['$localStorage', function($localStorage) {

	const vm = this;

	vm.pokemons = $localStorage.favorites || [];
}])

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

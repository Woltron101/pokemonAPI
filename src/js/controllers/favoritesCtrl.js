const favoritesCtrl = pokemon.controller('favoritesCtrl', ['$localStorage', function($localStorage) {

	const vm = this;

	vm.pokemons = $localStorage.favorites || [];
}])

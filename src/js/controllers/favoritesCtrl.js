const favoritesCtrl = pokemon.controller('favoritesCtrl', ['$scope', '$localStorage', function($scope, $localStorage) {

	const vm = this;

	vm.pokemons = $localStorage.favorites || [];
}])

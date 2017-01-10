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

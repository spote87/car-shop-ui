angular.module('carShopUIApp')
  .service('AppService', function () {
    var vm = this;
    vm.shoppingCart = [];

    vm.addToCart = function (item) {
      if (item) {
        console.log(vm.shoppingCart);
        vm.shoppingCart.push(item);
        console.log(vm.shoppingCart);
      }
    };

    vm.setShoppingCart = function (items) {
      vm.shoppingCart = items ? items : [];
    };

    vm.getShoppingCartItems = function () {
      return vm.shoppingCart;
    };
  });

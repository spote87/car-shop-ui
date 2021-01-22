angular.module('carShopUIApp')
  .service('AppService',  function () {
    var vm = this;
    vm.shoppingCart = [];

    vm.addToCart = function (item) {
      if(item) {
        vm.shoppingCart.push(item);
      }
    };

    vm.setShoppingCart = function (items) {
        vm.shoppingCart = items | [];
    };

    vm.getShoppingCartItems = function () {
      return vm.shoppingCart;
    };
});

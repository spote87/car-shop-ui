angular.module('carShopUIApp')
  .controller('ShoppingCartController', ['$http','AppService','ConfigurationService', function ($http,AppService,ConfigurationService) {
    var vm = this;
    vm.items = [];
    vm.totalAmount = 0;
    vm.checkedOut = false;
    vm.usernameTxt=false;

    vm.checkOut = function () {
      vm.usernameTxt =true;
    };

    vm.submitOrder = function (){

      var data = {
        username:vm.username,
        items : vm.items,
        totalAmount: vm.totalAmount
      };
      console.log(JSON.stringify(data));
      $http.post(ConfigurationService.SERVICE_URI + '/order',JSON.stringify(data)).then(function (response){
        vm.items = [];
        vm.checkedOut = true;
        AppService.setShoppingCart();
        vm.orderId = response.data.orderId;
      }).catch(function (error){
        console.log('Failed to place order'+error);
      });
    };

    function loadCartItems() {
      var items = AppService.getShoppingCartItems();
      if(items) {
        items.forEach(function (item) {
          vm.items.push({
            model: item.model,
            price: item.price,
            warehouseId: item.warehouseId,
            carId:item.carId
          });
          vm.totalAmount += item.price;
        });
      }
    }

    loadCartItems();


  }]);

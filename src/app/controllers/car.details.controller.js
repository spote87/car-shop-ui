angular.module('carShopUIApp')
  .controller('CarDetailsController', ['$uibModalInstance', '$http', 'ConfigurationService', 'selectedItem',
    function ($uibModalInstance, $http, ConfigurationService, selectedItem) {
      var vm = this;
      loadCarDetails(selectedItem);

      function loadCarDetails(item) {
        $http.get(ConfigurationService.SERVICE_URI + '/warehouse/' + item.wareHouseId + '/car/' + item.carId)
          .then(function (response) {
            vm.seletedCar = response.data;
          }).catch(function (error) {
          console.log('Failed to read car details' + error);
        });
      }

      vm.ok = function () {
        $uibModalInstance.close(selectedItem);
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

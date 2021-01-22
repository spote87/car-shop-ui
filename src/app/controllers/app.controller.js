angular.module('carShopUIApp')
  .controller('AppController',
    ['$http', '$uibModal', 'ConfigurationService', 'AppService',
      function ($http, $uibModal, ConfigurationService, AppService) {
        var vm = this;
        vm.allCars = [];
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        // Selection
        vm.selected = undefined;


        vm.carHeaders = [
          {id: 'name', label: 'Car Name'},
          {id: 'model', label: 'Car Model'},
          {id: 'dateAdded', label: 'Date Added'},
          {id: 'licenced', label: 'Licence Available'}];


        vm.sortColumn = function (key) {
          vm.orderByField = key;
          vm.sortByDescending = !vm.sortByDescending;
        };

        vm.showCarDetails = function (selectedCar) {
          vm.selected = selectedCar;
          if (!vm.selected || vm.selected.licenced == 'NO'){
            return;
          }
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'Car Details',
            ariaDescribedBy: 'Car Details',
            templateUrl: 'app/views/carDetails.html',
            controller: 'CarDetailsController',
            controllerAs: 'carDetailsCtrl',
            resolve: {
              selectedItem: function () {
                return vm.selected;
              },
            },
          });
          // Modal Instance
          modalInstance.result.then(
            function (selected) {
              //vm.selected = selected;
              AppService.addToCart(selected);
            },
            function () {
              console.log('closing modal');
            }
          );
        };

        function loadCars() {
          $http.get(ConfigurationService.SERVICE_URI + '/cars').then(function (response) {
            //vm.allCars = response.data;
            response.data.map(function (item) {
              var wareHouseId = item._id;
              item.cars.vehicles.forEach(function (car) {
                vm.allCars.push(
                  {
                    'name': car.make,
                    'model': car.model,
                    'dateAdded': car.date_added,
                    'licenced': car.licensed?'YES':'NO',
                    'wareHouseId': wareHouseId,
                    'carId': car._id
                  });
              });
            });
          }).catch(function (error) {
            console.log('Failed to read cars', error);
          });
        }

        function init() {
          vm.sortByDescending = false;
          vm.orderByField = 'dateAdded';
          loadCars();
        }

        init();
      }])
;

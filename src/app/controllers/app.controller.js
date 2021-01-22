angular.module('carShopUIApp')
.controller('AppController', ['$http', 'ConfigurationService', function ($http, ConfigurationService) {
    var _this = this;

  _this.allCars=[];
  function loadCars() {
      $http.get(ConfigurationService.SERVICE_URI + '/cars').then(function (response) {
        //_this.allCars = response.data;
        response.data.map(function (item) {
          item.cars.vehicles.forEach(function (car) {
            _this.allCars.push({'name': car.make, 'model': car.model, 'dateAdded': car.date_added});
          });
        });
      }).catch(function (error) {
        console.log('Failed to read cars', error);
      });

    }

    _this.carHeaders = [
      {id: 'name', label: 'Car Name'},
      {id: 'model', label: 'Car Model'},
      {id: 'dateAdded', label: 'Date Added'}];


    _this.currentPage = 1;
    _this.itemsPerPage = 10;
    // Selection
    _this.selected = undefined;

    _this.sortColumn = function (key) {
      _this.orderByField = key;
      _this.sortByDescending = !_this.sortByDescending;
    };

    function init() {
      loadCars();
    }

    init();

  }]);

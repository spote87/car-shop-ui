'use strict';
angular.module('carShopUIAppMock', ['ngMockE2E']).run(function ($httpBackend) {

  $httpBackend.whenGET(/\.html/).passThrough();

  var contentTypeJson = {"content-type": "application/json"};

  var SERVICE_URI = 'http://localhost:8000/carshopapi';

  $httpBackend.whenGET(SERVICE_URI + '/cars').respond(200, carsData, contentTypeJson);
  $httpBackend.whenGET(function (url){
    return SERVICE_URI+'/warehouse/'+/^\d+$/+'/car/'+/^\d+$/.test(url);
  }).respond(200, singleCarDetail, contentTypeJson);
});

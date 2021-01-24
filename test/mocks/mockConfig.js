'use strict';
angular.module('carShopUIAppMock', ['ngMockE2E']).run(function ($httpBackend) {

  $httpBackend.whenGET(/\.html/).passThrough();

  var contentTypeJson = {"content-type": "application/json"};

  var SERVICE_URI = 'http://localhost:8080/carshopapi';

  $httpBackend.whenGET(SERVICE_URI + '/warehouses').respond(200, carsData, contentTypeJson);
  $httpBackend.whenGET(function (url){
    return SERVICE_URI+'/warehouse/'+/^\d+$/+'/car/'+/^\d+$/.test(url);
  }).respond(200, singleCarDetail, contentTypeJson);
  $httpBackend.whenPOST(SERVICE_URI+'/order').respond(200,{orderId:100},contentTypeJson);
});

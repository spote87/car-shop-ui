'use strict';
angular.module('carShopUIAppMock', ['ngMockE2E']).run(function ($httpBackend) {

  $httpBackend.whenGET(/\.html/).passThrough();

  var contentTypeJson = {"content-type": "application/json"};

  var SERVICE_URI = 'http://localhost:8000/carshopapi';

  $httpBackend.whenGET(SERVICE_URI + '/cars').respond(200, carsData, contentTypeJson);
  // $httpBackend.whenGET('/fares\/BBI\/BBA').respond(statusOk, faresData, contentTypeJson);
  // $httpBackend.whenGET('/appStatistics').respond(statusOk, metricsData, contentTypeJson);
});

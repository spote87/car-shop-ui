app.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "index.html",
        controller: "AppController"
      })
      .otherwise({
        redirectTo: "/"
      });
  }]);

app.constant('ConfigurationService', getAppConstants());

function getAppConstants() {
  return {
    APP_NAME: 'carShopUIApp',
    SERVICE_URI: 'http://localhost:8000/carshopapi',
    LABEL_CLIENT_ERROR: "Total Client Errors (4xx)",
    LABEL_SERVER_ERROR: "Total Server Errors (4xx)",
    LABEL_RESPONSE_OK: "Total Responses OK (200)",
  };
}

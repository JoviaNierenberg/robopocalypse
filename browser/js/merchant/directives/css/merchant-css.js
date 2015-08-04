app.directive("merchantCustomCss", function () {
	return {
		restrict: "E",
		templateUrl: "js/merchant/directives/css/merchant-css.html",
		controller: "MerchantCssCtrl",
		scope: {
			merchant: "=merchant"
		}
	}
});



app.controller("MerchantCssCtrl", function ($scope, $http) {
	$scope.customScss = "";
	$scope.submitStyle = function() {
		$http.post("/api/store/customTheme/" + $scope.merchant.storeURL + "/", {scss: $scope.customScss}).success(function (){
			console.log("successful scss update!");
		}).error(function (){
			console.log("failure");
		})
	};
});
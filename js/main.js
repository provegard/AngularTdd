(function() {

    function ngQuoteDirective() {
        return {
            restrict: "A",
            link: function (scope, element, attr) {
                scope.$watch(attr.ngQuote, function (quoteValue) {
                    var value = quoteValue || "";
                    element
                        .html(value)
                        .css("color", value.indexOf("Confucius") >= 0 ? "red" : "blue");
                });
            }
        }
    }

    function mainControllerFunc($scope, $http) {
        $scope.todoItems = [];
        $scope.addTodo = function () {
            $scope.todoItems.push($scope.todoItem);
            $scope.todoItem = "";
        };

        $scope.hasThingsToDo = function () {
            return $scope.todoItems.length > 0;
        };

        function setQuoteInScope(response) {
            $scope.quote = response.data;
        }

        $scope.$watch(function () {
            return $scope.todoItems.length;
        }, function (length) {
            if (length && length % 5 == 0) {
                $http.get("http://localhost:3000/quote").then(setQuoteInScope);
            }
        })
    }

    mainControllerFunc.$inject = ["$scope", "$http"];

    angular
        .module("myApp", [])
        .controller("Main", mainControllerFunc)
        .directive("ngQuote", ngQuoteDirective);

})();

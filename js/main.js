(function(exports) {

    function TodoList() {
        this._items = [];
    }

    TodoList.prototype.isEmpty = function() { return this._items.length === 0; };

    TodoList.prototype.add = function (item) { this._items.push(item); };

    TodoList.prototype.items = function () { return this._items; };

    exports.TodoList = TodoList;
})(window.MyApp = (window.MyApp || {}));

(function() {

    function mainControllerFunc($scope, $http) {
        $scope.todoItems = [];
        $scope.addTodo = function () {
            $scope.todoItems.push($scope.todoItem);
            $scope.todoItem = "";
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
        .controller("Main", mainControllerFunc);

})();
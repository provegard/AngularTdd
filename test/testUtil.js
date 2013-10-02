
(function (exports) {

    function MainPage(scope) {
        this.scope = scope;
    }

    MainPage.prototype.addTodo = function (item) {
        this.scope.todoItem = item;
        this.scope.addTodo();
        this.scope.$digest();
    };

    exports.MainPage = MainPage;
})(window.TestUtil = (window.TestUtil || {}));
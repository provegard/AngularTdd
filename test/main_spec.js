describe("The main controller", function () {
    var scope, controller, httpBackend;

    beforeEach(module("myApp"));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        controller = $controller;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();
    });

    function createController() {
        controller("Main", {
            $scope: scope
        });
        scope.$digest();
    }

    it("should set an empty TODO list in the scope", function () {
        createController();
        expect(scope.todoItems).toEqual([]);
    });

    it("should state that there is nothing to do when the TODO list is empty", function () {
        createController();
        expect(scope.hasThingsToDo()).toBe(false);
    });

    it("should accept new items", function () {
        createController();
        scope.todoItem = "Code better TODO app...";
        scope.addTodo();
        scope.$digest();
        expect(scope.todoItems).toEqual(["Code better TODO app..."]);
    });

    it("should state that are things to do after adding an item", function () {
        createController();
        scope.todoItem = "Code better TODO app...";
        scope.addTodo();
        scope.$digest();
        expect(scope.hasThingsToDo()).toBe(true);
    });

    it("should clear the TODO item after adding", function () {
        createController();
        scope.todoItem = "Code better TODO app...";
        scope.addTodo();
        scope.$digest();
        expect(scope.todoItem).toBe("");
    });

    it("should fetch a quote set in scope for every 5th added todo item", function () {
        httpBackend.expectGET("http://localhost:3000/quote").respond(200, "Quote of the day!");
        createController();
        for (var i = 0; i < 5; i++) {
            scope.todoItem = "Do stuff #" + (i + 1);
            scope.addTodo();
            scope.$digest();
        }
        httpBackend.flush();
        expect(scope.quote).toBe("Quote of the day!");
    });
});

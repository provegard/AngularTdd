describe("The quote directive", function () {
    var compileAndLink, scope;

    beforeEach(module("myApp"));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        compileAndLink = function (html) {
            return $compile(html)(scope);
        };
    }));

    it("should render a quote in the scope", function () {
        scope.quote = "Hello";
        var e = compileAndLink("<div ng-quote='quote'></div>");
        scope.$digest();
        expect(e.text()).toEqual("Hello");
    });

    it("should support HTML when rendering", function () {
        scope.quote = "<p>Hello</p>";
        var e = compileAndLink("<div ng-quote='quote'></div>");
        scope.$digest();
        expect(e.html()).toEqual("<p>Hello</p>");
    });

    it("should color Confucius quotes in red", function () {
        scope.quote = "Brush your teeth - Confucius";
        var e = compileAndLink("<div ng-quote='quote'></div>");
        scope.$digest();
        expect(e.css("color")).toEqual("red");
    });

    it("should color non-Confucius quotes in blue", function () {
        scope.quote = "Hello";
        var e = compileAndLink("<div ng-quote='quote'></div>");
        scope.$digest();
        expect(e.css("color")).toEqual("blue");
    });

});
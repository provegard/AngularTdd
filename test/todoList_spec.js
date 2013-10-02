describe("The TodoList class", function () {

    it("should be empty initially", function () {
        var list = new MyApp.TodoList();
        expect(list.isEmpty()).toBe(true);
    });

    it("should have no items initially", function () {
        var list = new MyApp.TodoList();
        expect(list.items()).toEqual([]);
    });

    it("should support adding an item", function () {
        var list = new MyApp.TodoList();
        list.add("foo");
        expect(list.items()).toEqual(["foo"]);
    });

    it("should not be empty after adding an item", function () {
        var list = new MyApp.TodoList();
        list.add("foo");
        expect(list.isEmpty()).toBe(false);
    });

});

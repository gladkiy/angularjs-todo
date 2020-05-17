var ToDoListApp = angular.module('ToDoListApp', ['firebase']);

ToDoListApp.controller('ToDoCtrl', function ($scope, angularFire) {

    var fireData = new Firebase('https://todolist1.firebaseio.com/');
    angularFire(fireData, $scope, 'todos');

    //Initialize list of todos
    $scope.todos = [];

    //Function to add new todo
    $scope.add = function () {
        var newTodo = {
            done: false,
            text: $scope.todoText
        };
        if ($scope.todoText === '' || $scope.todoText === undefined)
            return;
        $scope.todos.push(newTodo);
        $scope.todoText = '';
    };

    //Function to delete todo
    $scope.remove = function (start) {
        $scope.todos.splice(start, 1);
    };

    //Function to move item
    $scope.move = function (index, direction) {
        //Handle moving up
        if (direction === 'up') {
            if(index === 0) {
                return;
            }
            index--;
        }

        //Handle moving down
        if (direction === 'down') {
            if(index === $scope.todos.length - 1) {
                return;
            }
        }

        var todo = $scope.todos[index];
        $scope.todos.splice(index + 2, 0, todo);
        $scope.todos.splice(index, 1);
    };
});
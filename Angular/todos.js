
// Angular custom JS file
function TodoCtrl($scope) {
    $scope.totalTodos = 4;
    $scope.todos = [
	    {text: 'Learn AngularJS',done: false }, 
	    {text: 'Build an app',done: false},
	    {text: 'Execute Program',done: false},
	    {text: 'Close Program',done: false}
    ];

    $scope.getTotalTodos = function(){
    	return $scope.todos.length;
    };

    $scope.clearCompleted = function(){
    	$scope.todos=_.filter($scope.todos, function (todo){
    		return !todo.done;
    	})
    };

    $scope.addTodo = function(){
    	$scope.todos.push({text:$scope.formTodoText,done:false});
    	$scope.formTodoText="";
    };
}

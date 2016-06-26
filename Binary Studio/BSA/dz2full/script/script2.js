var Application = { };
(function(Application,$){
    var _document,
        _$container,
        id = 0;
    Application.init = function(document){
        _document = document;
        _$container = $('#todo-container');
        this.addTaskContainer(_$container);
        _$container.on('click','[data-action="addTask"]',$.proxy(this.onAddTask, this));
        _$container.on('click','[data-action="clearTask"]',$.proxy(this.onClearTask, this));
        _$container.on('click','[data-action="removeTask"]',$.proxy(this.onTaskDelete, this));
    };
    
   Application.addTaskContainer = function($baseNode, subTask){
          var id = this.nextId();
          
      $baseNode.append($('<ul id="'+id+'"></ul>'));
       
        $baseNode.append($('<button data-action="addTask" data-task-container-id="'+id+'">Add</button>'+(subTask)));
          
         $baseNode.append($('<button data-action="clearTask" data-task-container-id="'+id+'">Clear</button>'+(subTask)));
    };
    
    Application.nextId = function(){
        return 'id'+id++;
    };
    
    Application.onClearTask = function(evt){ 
    $('#'+$(evt.target).attr('data-task-container-id')).empty(); 
 };
    Application.onAddTask = function(evt){
        var $taskContainer = $('#'+$(evt.target).attr('data-task-container-id')),
            newTaskId = this.nextId(),
            $newTask = $('<li id="'+newTaskId+'"></li>');
        
        $newTask.append('<input name="task'+newTaskId+'" />');
        $newTask.append('<button data-action="removeTask" data-task-id="'+newTaskId+'">DeleteTask</button>');
        this.addTaskContainer($newTask,true);
        $taskContainer.append($newTask);
    };
    
    Application.onTaskDelete = function(evt){
        $('#'+$(evt.target).attr('data-task-id')).remove();
        };
    
    Application.proxy = function(handler, owner){
        return handler.bind(owner);
    }
}
)(Application,jQuery);
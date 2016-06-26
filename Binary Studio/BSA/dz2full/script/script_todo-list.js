var Application = { };
(function(Application, $) {
    var _document,
        _$container,
        id = 0;
    Application.init = function(document){
        _document = document;
        _$container = $('#todo-container');      this.addTaskContainer(_$container,false);
        _$container.on('click','[data-action="addTask"]',$.proxy(this.onAddTask, this));
        _$container.on('click','[data-action="removeTask"]',$.proxy(this.onTaskDelete, this));	_$container.on('click','#deleteAll',function(){
	  		var container = $('#id0');			
			container.empty();
		});
		_$container.on('click','#checkAll',function(){
			var allCheckBox = $('[type="checkbox"]');
			allCheckBox.attr("checked","checked");
			container.empty();
		});
    };
	
   Application.addTaskContainer = function($baseNode, subTask){
          var id = this.nextId();    
       if(subTask){
               $baseNode.append($('<button data-action="addTask" data-task-container-id="'+id+'">+</button>'+(subTask)));  
          
       }else{
           $baseNode.append($('<button data-action="addTask" data-task-container-id="'+id+'">+Add new task</button>'+(subTask)));
       }
       $baseNode.append($('<ul id="'+id+'"></ul>'));
    };
    
    Application.nextId = function(){
        return 'id'+id++;
    };
   
    Application.onAddTask = function(evt){
        var $taskContainer = $('#'+$(evt.target).attr('data-task-container-id')),
            newTaskId = this.nextId(),
            $newTask = $('<li class="editing" id="'+newTaskId+'"></li>'); 
        $newTask.append('<input type="checkbox" name="task'+newTaskId+'" /><label for="'+newTaskId+'" class="todo"> <input type="text" class="input-todo" id="input-todo'+newTaskId+'" value="new task"/></label>');
		
        $newTask.append('<button data-action="removeTask" data-task-id="'+newTaskId+'">X</button>');
		
        this.addTaskContainer($newTask,true);
        $taskContainer.append($newTask);
        
  $('#input-todo'+newTaskId).focus();
	$('#input-todo'+newTaskId+'').enterKey(function(){
    $(this).trigger('enterEvent');
  });
		$('#input-todo'+newTaskId+'').keydown(function(e){
		if(e.which == '27'){
			$(this).parent().parent().remove();
		}
	});
	$('#input-todo'+newTaskId+'').on('blur enterEvent',$.proxy(this.leaveInput,this));
		$(".todo").dblclick($.proxy(this.editTask,this));
    };
  Application.editTask = function(evt){
	  var $parent = $(evt.target).parent(),
		  parentId = $parent.get(0).id,
		  $thisElement = $(evt.target),
	  $thisValue = $thisElement.get(0).innerHTML;
		  $newTextInput = $('<label for="'+parentId+'" class="todo"><input type="text" class="input-todo"id="input-todo'+parentId+'" value="'+$thisValue+'"/></label>');
	  $thisElement.before($newTextInput);
	  $thisElement.remove();
	  $('#input-todo'+parentId).focus();
	$('#input-todo'+parentId+'').enterKey(function(){
    $(this).trigger('enterEvent');
  });
	$('#input-todo'+parentId+'').keydown(function(e){
		if(e.which == '27'){
			$(this).parent().parent().remove();
		}
	});
	$('#input-todo'+parentId+'').on('blur enterEvent',$.proxy(this.leaveInput,this));
	  $(".todo").dblclick($.proxy(this.editTask,this));  
  };
    Application.onTaskDelete = function(evt){
        $('#'+$(evt.target).attr('data-task-id')).remove();
        };
    Application.proxy = function(handler, owner){
        return handler.bind(owner);
    };
	Application.leaveInput = function(evt){
    var inputId = $(evt.target).parent().parent().get(0).id,
		todoTitle = $('#input-todo'+inputId+'').val();
    var todoTitleLength = todoTitle.length;
    if (todoTitleLength > 0) {
     $(evt.target).before(todoTitle);
      $(evt.target).parent().parent().removeClass('editing');
     
      $(evt.target).remove();
      $('[data-action="removeTask"]').click(function(){
        var parentItem = $(this).parent();
        parentItem.animate({
          left:"-30%",
          height:0,
          opacity:0
        },200);
        setTimeout(function(){ $(parentItem).remove(); }, 1000);
      });
    }
    else {
      setTimeout(function(){
        $('.editing').remove()
      },400)
    }
  }; 
    $.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
				
                fnc.call(this, ev);
            };
        })
    })
};
}
)(Application,jQuery);
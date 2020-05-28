(function () {
  const todos = [];
  const addTodoBtn = document.getElementById("add-todo-btn");
  addTodoBtn.addEventListener("click", createTodo);

  function createTodo() {
     function changeTodoState() {
      if (buttonState.textContent === "working") {
        buttonState.textContent = "completed";
      } else if (buttonState.textContent === "completed") {
        buttonState.textContent = "working";
      }
    }

    function cheackTodoContent() {
      if (inputContent === "") return false;
      todoInput.value = "";
      return inputContent
    }

    function addAttrTodo() {
      trTodo.setAttribute("class", "todo");
      tdContent.setAttribute("class", "content");
      buttonState.setAttribute("class", "state");
      buttonRemove.setAttribute("class", "remove");
    }

    function buildTodo() {
      tdID.textContent = todoElement.length + 1;
      tdContent.textContent = inputContent;
      buttonState.textContent = "working";
      buttonRemove.textContent = "remove";
      // 要素の挿入
      todoBody.appendChild(trTodo);
      trTodo.appendChild(tdID);
      trTodo.appendChild(tdContent);
      trTodo.appendChild(tdState);
      trTodo.appendChild(tdRemove);
      tdState.appendChild(buttonState);
      tdRemove.appendChild(buttonRemove);
      //イベントの登録
      buttonState.addEventListener("click", changeTodoState);
      
      const todo = {
        id: todoElement.length + 1,
        content: inputContent,
        state: buttonState,
        remove: buttonRemove
      }
      todos.push(todo);
    }

    const todoInput = document.getElementById("todo-input");
    const inputContent = todoInput.value;
    cheackTodoContent(inputContent);
    const trTodo = document.createElement("tr");
    const tdID = document.createElement("td");
    const tdContent = document.createElement("td");
    const tdState = document.createElement("td");
    const tdRemove = document.createElement("td");
    const buttonState = document.createElement("button");
    const buttonRemove = document.createElement("button");
    const todoElement = document.querySelectorAll("#todo-body .todo");
    const todoBody = document.getElementById("todo-body");
    addAttrTodo();
    buildTodo();    
  }
})();
const mainTodoElem=document.querySelector(".container");
        const inputValue=document.getElementById("todo");
      

        const getTodoLsitFromLocal=()=>{
            return JSON.parse(localStorage.getItem('todolist'));
        };

        const addTodoListLocalStorage=(localTodoLists)=>{
            return localStorage.setItem('todolist',JSON.stringify(localTodoLists));

        };

        let localTodoLists=getTodoLsitFromLocal() || [];

       const addTodoDynamicElement=(curElem)=>{
        const divElement=document.createElement("div");
           divElement.classList.add("todo-list");
           divElement.innerHTML=` <li> ${curElem} </li> <button class="del">Delete</button>`; 
           mainTodoElem.append(divElement);

       };

        

        const addTodoList=(e)=>{
           e.preventDefault(); 
           
           const todoListValue=inputValue.value.trim();
           inputValue.value="";
           if(todoListValue!="" && !localTodoLists.includes(todoListValue)){

           

           localTodoLists.push(todoListValue);
           localTodoLists=[...new Set(localTodoLists)];
           localStorage.setItem('todolist',JSON.stringify(localTodoLists));


        
            addTodoDynamicElement(todoListValue);
           }
        };


        const showTodoList=()=>{

            localTodoLists.forEach((curElem)=>{
                addTodoDynamicElement(curElem);
            })

        };
        showTodoList();

        const removeTodoElem=(e)=>{
            
            const todoToRemove=e.target;
            let todoListContent=todoToRemove.previousElementSibling.innerText;
            let parentElem=todoToRemove.parentElement;
            console.log(todoListContent);

           localTodoLists= localTodoLists.filter((curTodo)=>{
                return curTodo!=todoListContent.toLowerCase();
            });


            addTodoListLocalStorage(localTodoLists);
            parentElem.remove();
            console.log(localTodoLists);

        };

        mainTodoElem.addEventListener('click',(e)=>{
            e.preventDefault();
            if(e.target.classList.contains("del")){
            removeTodoElem(e);
            }
        });

        document.querySelector('.btn').addEventListener('click',(e)=>{
            
            addTodoList(e);
        });

//* ======================================================
//*                     TODO APP
//* ======================================================

//?Selectors
const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

// todos dizisini localStorage'daki veriler ile guncelle
// Updating todos array with data from localStorage
//! eger localStroge'de todos adinda bir item bulunmaz ise bos array atamasi yap.
// If there is no item named todos in localStorage, assign an empty array.

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
// console.log(todos);

const renderSavedTodos = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};

renderSavedTodos();

addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("Please enter new todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      checked: false,
      text: todoInput.value,
    };

    //! yeni bir li elementi olusturup bunu DOM'a bas
    // create a new li element and press it into the DOM
    createListElement(newTodo);

    //?Yeni olusturulan todo'yu diziye sakla
    // Save newly created todo to array

    todos.push(newTodo);

    localStorage.setItem("TODOS", JSON.stringify(todos));
    // console.log(todos);
    todoInput.value = "";
  }
});

function createListElement(newTodo) {
  const { id, checked, text } = newTodo; //! destr.

  //? yeni bir li elementi olustur ve bu elemente obje icerisindeki
  //? id degerini ve completed class'ini ata
  // Create a new li element and assign it id value
  // and checked class in the object

  const li = document.createElement("li");
  //   li.id = newTodo.id;
  li.setAttribute("id", id);

  //   newTodo.checked ? li.classList.add("checked") : null;
  checked && li.classList.add("checked");

  //? check ikonu olustur ve li elementine bagla
  // create check icon and bind to li element

  const checkIcon = document.createElement("i");
  checkIcon.setAttribute("class", "fas fa-check");
  li.appendChild(checkIcon);

  //? todo basligi icin bir p elementi ve yazi dugumu olusturarak li'ye bagla
  // Create a p element and a post node for the todo header and bind
  // it to the li element

  const p = document.createElement("p");
  const pTextNode = document.createTextNode(text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  //? delete ikonu olustur (trash) ve li elementine bagla
  // create delete icon and bind to li element

  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  //   console.log(li);
  //? meydana gelen li elementini ul'ye child olarak ata
  // Assign the occurring li element to ul as child
  todoUl.appendChild(li);
}

//! Ul elementinin cocuklarindan herhangi birisinden bir event gelirse
//! bunu tespit et ve gerekini yap. (Capturing)
// If an event comes from any of the element's children
// detect it and take action. (Capturing)

todoUl.addEventListener("click", (e) => {
  //   console.log(e.target);

  const id = e.target.parentElement.getAttribute("id");
  //! event, bir delete butonundan geldi ise
  // if the event came from a delete button

  if (e.target.classList.contains("fa-trash")) {
    //? delete butonunun parent'ini DOM'dan sil
    // delete parent of delete button from DOM

    e.target.parentElement.remove();

    //? Dizinin ilgili elementini sil
    // Delete related element of array in LocalStorage

    todos = todos.filter((todo) => todo.id !== Number(id));

    //? todos dizisinin son halini localStorage'e sakla
    // store the final version of the todos array in LocalStorage

    localStorage.setItem("TODOS", JSON.stringify(todos));
  }

  //! event, bir check butonundan geldi ise
  // If the event came from an check button

  if (e.target.classList.contains("fa-check")) {
    //? ilgili li elementinde checked adinda bir class'i varsa bunu sil
    //?  aksi takdirde DOM 'a ekle (DOM)
    // If the related li element has a class called checked, delete it
    // otherwise add to DOM

    e.target.parentElement.classList.toggle("checked");

    // todos dizisindeki ilgili elementin checked kismini guncelle
    // Update checked part of related element in todos array

    todos.map((todo, index) => {
      if (todo.id == id) {
        todos[index].checked = !todos[index].checked;
      }
    });
    // console.log(todos);

    //?todos dizisinin son halini localStorage'e sakla
    // store the final version of the todos array in LocalStorage
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }
});

//? Enter tusu ile ekleme mumkun olsun
// Make it possible to add with the enter key

todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

//? Baslangicta input aktif olsun
// Let the input be active at startup

window.onload = function () {
  todoInput.focus();
};

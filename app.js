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
    createListElement(newTodo);
    todoInput.value = "";
  }
});

const createListElement = (newTodo) => {
  const { id, checked, text } = newTodo; // destr.

  //? yeni bir li elementi olustur ve bu elemente obje icerisindeki
  //? id degerini ve completed class'ini ata
  const li = document.createElement("li");
  //   li.id = newTodo.id;
  li.setAttribute("id", id);

  //   newTodo.checked ? li.classList.add("checked") : null;
  checked && li.classList.add("checked");

  //? check ikonu olustur ve li elementine bagla
  const checkIcon = document.createElement("i");
  checkIcon.setAttribute("class", "fas fa-check");
  li.appendChild(checkIcon);

  //? todo basligi icin bir p elementi ve yazi dugumu olusturarak li'ye bagla
  const p = document.createElement("p");
  const pTextNode = document.createTextNode(text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  //? delete ikonu olustur ve li elementine bagla
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  //   console.log(li);
  //? meydana gelen li elementini ul'ye child olarak ata
  todoUl.appendChild(li);
};

//! Ul elementinin cocuklarindan herhangi birisinden bir event gelirse
//! bunu tespit et ve gerekini yap. (Capturing)
todoUl.addEventListener("click", (e) => {
  //   console.log(e.target);

  //! event, bir delete butonundan geldi ise
  if (e.target.classList.contains("fa-trash")) {
    //? delete butonunun parent'ini DOM'dan sil
    e.target.parentElement.remove();
  }

  //! event, bir okey butonundan geldi ise
  if (e.target.classList.contains("fa-check")) {
    //? ilgili li elementinde checked adinda bir class'i varsa bunu sil
    //?  aksi takdirde ekle (DOM)
    e.target.parentElement.classList.toggle("checked");
  }
});

//? Enter tusu ile ekleme mumkun olsun
todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

//? Baslangicta input aktif olsun
window.onload = function () {
  todoInput.focus();
};

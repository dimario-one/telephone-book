let table = document.querySelector("#table tbody");
let btn = document.getElementById("button");
let modal = new bootstrap.Modal(document.querySelector("#basicModal"));
let editModal = new bootstrap.Modal(document.querySelector("#editModal"));
let home = document.getElementById("home");
let street = document.getElementById("street");
let name = document.getElementById("name");
let room = document.getElementById("room");
let comment = document.getElementById("comment");
let saveBtn = document.getElementById("save");
let saveEditName = document.getElementById("edit-save");
let editName = document.getElementById("edit-name");
let editStreet = document.getElementById("edit-street");
let editHome = document.getElementById("edit-home");
let editRoom= document.getElementById("edit-room");
let editComment = document.getElementById("edit-comment");
let find = document.getElementById("find");
let findModal = new bootstrap.Modal(document.querySelector("#findModal"));
let findSave = document.getElementById("find-save");
let findName = document.getElementById("find-name");
let message = document.getElementById("message");
let ID;

// Для проверки логики страницы
let array = [
  {
    id: 1,
    name: "Иванов Иван Иванович",
    street: "пр.Королева",
    home: 5,
    room: 14,
    comment: "не забыть выслать платежку",
  },
  {
    id: 2,
    name: "Петров Иван Петрович",
    street: "пр.Мира",
    home: 7,
    room: 20,
    comment: "не забыть выслать платежку",
  },
  {
    id: 3,
    name: "Сидоров Иван Васильевич",
    street: "пр.Культуры",
    home: 14,
    room: 18,
    comment: "не забыть выслать платежку",
  },
  {
    id: 4,
    name: "Краснов Иван Иванович",
    street: "ул. Красный Путь",
    home: 15,
    room: 114,
    comment: "не забыть выслать платежку",
  },
  {
    id: 5,
    name: "Лаптев Иван Радионович",
    street: "ул.70 лет Октября",
    home: 5,
    room: 141,
    comment: "не забыть выслать платежку",
  },
];

// Функция заполнения таблицы
function showTable(array) {
  resetCellValue();
  let data;
  // Отрисовка таблицы
  // Ячейки таблицы
  for (let i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    let row = document.createElement("tr");
    let row_cell = document.createElement("td");
    let row_cell_1 = document.createElement("td");
    let row_cell_2 = document.createElement("td");
    let row_cell_3 = document.createElement("td");
    let row_cell_4 = document.createElement("td");
    let row_cell_5 = document.createElement("td");
    let row_cell_6 = document.createElement("td");

    let deleteBtn = document.createElement("button");

    // Заполнение идет рядами так что это порядковый номер.
    row_cell.innerHTML = `${i + 1}`;
    row_cell.classList.add("cell", "cell_min", "findCell");
    row_cell.setAttribute("id", `number-row-${i}-cell`);
    // Заполняем таблицу
    data = array[i];
    // Запоняем ячейки имя
    row_cell_1.innerHTML = `${data.name}`;
    row_cell_1.classList.add("cell", "cell_big", "findCell");
    row_cell_1.setAttribute("id", `name-row-${i}-cell`,"name");
    // Запоняем ячейки улица
    row_cell_2.innerHTML = `${data.street}`;
    row_cell_2.classList.add("cell", "cell_big", "findCell");
    row_cell_2.setAttribute("id", `street-row-${i}-cell`);

    // Заполняем ячейку дом
    row_cell_3.innerHTML = `${data.home}`;
    row_cell_3.classList.add("cell", "findCell");
    row_cell_3.setAttribute("id", `home-row-${i}-cell`);
    // Заполняем ячейку квартира
    row_cell_4.innerHTML = `${data.room}`;
    row_cell_4.classList.add("cell", "cell_big", "findCell");
    row_cell_4.setAttribute("id", `room-row-${i}-cell`);
    // Заполняем ячейку Примечания
    row_cell_5.innerHTML = `${data.comment}`;
    row_cell_5.classList.add("cell", "findCell");
    row_cell_5.setAttribute("id", `comment-row-${i}-cell`);

    // Заполняем ячейку delete
    deleteBtn.classList.add("cell", "btn", "btn-close");
    row_cell_6.setAttribute("id", `cellDeleteButton-row-${i}-cell`);
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("aria-label", "Close");
    row_cell_6.appendChild(deleteBtn);

    // Вставка в Dom
    row.appendChild(row_cell);
    row.appendChild(row_cell_1);
    row.appendChild(row_cell_2);
    row.appendChild(row_cell_3);
    row.appendChild(row_cell_4);
    row.appendChild(row_cell_5);
    row.appendChild(row_cell_6);
    table.appendChild(row);
    row.addEventListener("click", () => {
      console.log(row);
    });
  }
}

// Функция добавления абонента
function addUser() {
  let obj = {
    name: name.value,
    street: street.value,
    home: home.value,
    room: room.value,
    comment: comment.value,
  };
  array.push(obj);
  showTable(array);
}

// Функция удаления элемента из таблицы
function deleteRow(index) {
  let newArr = [];
  for (i = 0; i < array.length; i++) {
    if (index !== `${i}`) {
      newArr.push(array[i]);
    }
  }
  array = newArr;
  showTable(newArr);
}

// Функция открытия модального окна
function popupOpen() {}

// Функция очистки таблицы
function resetCellValue() {
  table.innerHTML = "";
}

//
function getRow(id) {
  let allCell = document.querySelectorAll(".findCell");
  let cell;
  let arr;
  let row = [];
  let elem = id.split("-");
  for (i = 0; i < allCell.length; i++) {
    cell = allCell[i].getAttribute("id");
    arr = cell.split("-");
    if (elem[1] === arr[1] && elem[2] === arr[2]) {
      row.push(allCell[i]);
    }
  }
  setValueRow(row);
}

// Функция заполнения ряда таблицы
function setValueRow(row) {
    let elem;
    let attribute;
  for(i=0;i<row.length;i++){
    attribute= row[i].getAttribute("id");
   let id = attribute.split("-");
    elem=document.getElementById(`${attribute}`);
    for(a=0;a<id.length;a++){
        switch (id[a]) {
            case "name":
                elem.innerHTML= editName.value;
                break;
            case "street":
                elem.innerHTML= editStreet.value;
                break;
            case "home":
                elem.innerHTML= editHome.value;
                break;
            case "room":
                elem.innerHTML= editRoom.value;
                break;
            case "comment":
                elem.innerHTML= editComment.value;
                break;
            default:
                console.log("что то пошло не так в функции setValueRow")
                break;
        }
    }

  }

}

// Функция поиска абонента
function  findUser(){
   let name= findName.value;
 for(i=0;i<array.length;i++){
     if(name === array[i].name){
        message.classList.remove("d-none");
        message.classList.add("d-block");
        message.innerText = `Абонент ${array[i].name} проживает по адресу ${array[i].street} дом ${array[i].home} кв ${array[i].room}`
     }
 }
}

showTable(array);
// Слушатель
findSave.addEventListener("click", function() {
    findUser();
});

find.addEventListener("click", function() {
  findModal.show();
});

saveEditName.addEventListener("click", function () {
  getRow(ID);
  editModal.hide();
});

saveBtn.addEventListener("click", function () {
  addUser();
  modal.hide();
});

btn.addEventListener("click", function () {
  modal.show();
});

document.addEventListener("click", function (event) {
  let td = event.target.closest("td");
  if (!td) {
    return;
  } else {
    let id = td.getAttribute("id");
    let type = id.split("-");
    let name = type[0];
    if (name === "name") {
      ID = id;
      editModal.show();
    } else {
      if (name === "cellDeleteButton") {
        deleteRow(type[2]);
      }
    }
  }
});

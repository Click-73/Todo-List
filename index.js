const tasks = [
  { text: "Buy milk", done: false, data: Date.now() - 1 },
  {
    text: "Pick up Tom from airport",
    done: false,
    data: Date.now() - 2,
  },
  {
    text: "Visit party",
    done: false,
    data: Date.now() - 3,
  },
  {
    text: "Visit doctor",
    done: true,
    data: Date.now() - 4,
  },
  { text: "Buy meat", done: true, data: Date.now() - 5 },
];

const listElem = document.querySelector(".list");

const renderListItems = (listItems) => {
  const listItemsElems = listItems
    .sort((a, b) => a.done - b.done || b.data - a.data) // сортируем масив сначало по true/false после уже по дате добавления
    .map(({ text, done, data }) => {
      // в аргумент кол бека принимаем обект ключей ( каждого обьекта масива  ) ИНАЧЕ MAP не видит
      const listItemElem = document.createElement("li");
      listItemElem.classList.add("list__item");
      if (done) {
        listItemElem.classList.add("list__item_done");
      }
      const checkboxElem = document.createElement("input");
      checkboxElem.setAttribute("type", "checkbox");
      checkboxElem.setAttribute("data-data", data);
      checkboxElem.checked = done; // чекбокс возвращает true/false (и соответсвенно мы можем записать в него true/false)
      checkboxElem.classList.add("list__item-checkbox");
      listItemElem.append(checkboxElem, text); // пушим в элемент списка чекбокс и текст с массива

      return listItemElem;
    });

  listElem.innerHTML = ""; // исключение ( чтобы не вызывать данную функцию при каждом клике )
  listElem.append(...listItemsElems); // пушим в наш лист все созданые элементы с их атрибутами
};

// <<-------------------->>
const additionListTasks = () => {
  const inputTaskElem = document.querySelector(".task-input");
  const inputTask = inputTaskElem.value; // Получаем данные с поля ввода
  const dataNum = Date.now(); // созданая задача будет иметь Date.now  больше и поєтому отсортируеться в начало
  if (inputTask === "") {
    // исключение при пустой строке
    return;
  }

  tasks.push({
    // пушим новый обьект в наш масив обьектов
    text: inputTask,
    done: false,
    data: dataNum,
  });
  inputTaskElem.value = ""; // очищаем поле ввода
  renderListItems(tasks); // возращаем наш новый массив обьектов
};

const buttonElem = document.querySelector(".btn");
buttonElem.addEventListener("click", additionListTasks);

const changeCompletedTask = (event) => {
  const isCheckbox = event.target.classList.contains("list__item-checkbox"); // true or false есть ли этот клас

  if (!isCheckbox) {
    return; // если нету такого класа выходим с функции
  }

  const chosenCheckbox = event.target.dataset.data; // в переменную закидываем ЧИСЛО DATE чеккбокса на который кликнули
  const chosenTask = tasks.find((el) => el.data === +chosenCheckbox); // перебираем масив и если находим элемент с таким же ЧИСЛОМ в поле  DATE  записываем в переменную
  chosenTask.done = event.target.checked; // в этом элементе меняем done на булевое checked
  chosenTask.data = Date.now(); // даем выбраному нами ЧЕКБОКСУ новое время
  renderListItems(tasks);
};

listElem.addEventListener("click", changeCompletedTask);

renderListItems(tasks);

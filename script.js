const btn = document.getElementById("btn");
let todayCount = 0;
let futureCount = 0;
let completeCount = 0;

btn.addEventListener('click', function showdata() {
    const dat = new Date();
    let day = dat.getDate().toString().padStart(2, '0');
    let month = (dat.getMonth() + 1).toString().padStart(2, '0');
    let year = dat.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    let text = document.getElementById("texting");
    let date = document.getElementById("dating");
    let dropdown = document.getElementById("selecting");
    let todays = document.getElementById("todaylist");
    let future = document.getElementById("futurelist");
    let complete = document.getElementById("completelist");

    if (text.value === '' || date.value === '' || dropdown.value === 'Priority') {
        alert("Please fill out all fields");
        return;
    }

    let inputDate = new Date(date.value);
    let inputDay = inputDate.getDate().toString().padStart(2, '0');
    let inputMonth = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    let inputYear = inputDate.getFullYear();
    let formattedInputDate = `${inputDay}-${inputMonth}-${inputYear}`;

    // Prevent duplicate items
    if (isDuplicate(todays, text.value, formattedInputDate) || isDuplicate(future, text.value, formattedInputDate)) {
        alert("This item already exists in the list");
        return;
    }

    let todoItem = document.createElement("div");
    todoItem.className = "todo-item";

    let serialNumber = document.createElement("div");
    serialNumber.setAttribute("id", "serial");

    let textData = document.createElement("div");
    textData.innerText = text.value;

    let dateData = document.createElement("div");
    dateData.innerText = formattedInputDate;

    let selected = document.createElement("div");
    selected.innerText = dropdown.value;

    let choose = document.createElement("div");
    choose.innerHTML = `<img src="https://surjeet-todo-list.netlify.app/img/check-circle%201.png" style="width:50px;height:30px;padding-right:20px;"><img src="https://surjeet-todo-list.netlify.app/img/trash%201.png" style="width:30px;height:30px;">`;

    choose.children[0].addEventListener('click', function () {
        todoItem.remove();
        textData.style.color = 'black';
        dateData.style.color = 'black';
        selected.style.color = 'black';
        serialNumber.style.color = 'black';

        let delet = document.createElement("div");
        delet.innerHTML = `<img src="https://surjeet-todo-list.netlify.app/img/2.png" style="width:50px;height:30px;padding-right:20px;">`;
        complete.style = 'border:2px solid black;border-radius:10px;padding:15px 0px';
        choose.children[0].remove();
        todoItem.appendChild(delet);
        complete.appendChild(todoItem);
        completeCount++;
        updateSerialNumbers(complete);

        delet.addEventListener('click', function () {
            todoItem.remove();
            completeCount--;
            updateSerialNumbers(complete);
        });
    });

    choose.children[1].addEventListener('click', function () {
        todoItem.remove();
        if (formattedInputDate === currentDate) {
            todayCount--;
            updateSerialNumbers(todays);
        } else if (new Date(inputDate) > new Date(dat)) {
            futureCount--;
            updateSerialNumbers(future);
        }
    });

    todoItem.appendChild(serialNumber);
    todoItem.appendChild(textData);
    todoItem.appendChild(dateData);
    todoItem.appendChild(selected);
    todoItem.appendChild(choose);

    if (formattedInputDate === currentDate) {
        todayCount++;
        todays.appendChild(todoItem);
        updateSerialNumbers(todays);
    } else if (new Date(inputDate) > new Date(dat)) {
        futureCount++;
        future.appendChild(todoItem);
        updateSerialNumbers(future);
    } else {
        alert("You cannot enter a past date");
        return;
    }

    text.value = '';
    date.value = '';
    dropdown.selectedIndex = 0;
    updateCounts();
});

function updateSerialNumbers(listElement) {
    let items = listElement.getElementsByClassName('todo-item');
    for (let i = 0; i < items.length; i++) {
        items[i].children[0].innerText = `${i + 1}.`;
    }
}

function isDuplicate(listElement, text, date) {
    let items = listElement.getElementsByClassName('todo-item');
    for (let item of items) {
        if (item.children[1].innerText === text && item.children[2].innerText === date) {
            return true;
        }
    }
    return false;
}

function updateCounts() {
    document.getElementById("today-count").innerText = `Today's Tasks: ${todayCount}`;
    document.getElementById("future-count").innerText = `Future Tasks: ${futureCount}`;
    document.getElementById("complete-count").innerText = `Completed Tasks: ${completeCount}`;
}
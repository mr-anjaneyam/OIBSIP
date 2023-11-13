let input = document.querySelector('input[type="text"]');
let notcontainer = document.querySelector(".not");
let donecontainer = document.querySelector(".done");
let button = document.querySelector('input[type="button"]');
let arroftasks = [];
let code = 0;
let Reg = /\S/ig;

if (localStorage.getItem("task")) {
    arroftasks = JSON.parse(localStorage.getItem("task"));
    createmylist(arroftasks);
}

input.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        butto();
    }
});

button.addEventListener("click", butto);

function butto() {
    code = arroftasks.length + 1;
    if (Reg.test(input.value)) {
        arrayoftasks(input.value);
        input.value = "";
    }
}

function arrayoftasks(tasks) {
    const taskobj = {
        id: code,
        task: tasks,
        completed: false,
    };
    arroftasks.push(taskobj);
    createmylist(arroftasks);
    addtolocalstorage(arroftasks);
}

function createmylist(arroftasks) {
    notcontainer.innerHTML = "";
    donecontainer.innerHTML = "";
    arroftasks.forEach((task) => {
        if (!task.completed) {
            let notcompleted = document.createElement("div");
            notcompleted.className = "not-completed";
            let para1 = document.createElement("p");
            para1.textContent = task.task;
            notcompleted.appendChild(para1);
            let icon = document.createElement("div");
            icon.classList.add("icon");
            let check = document.createElement("i");
            check.classList.add("fa-solid", "fa-check");
            let trash = document.createElement("i");
            trash.classList.add("fa-solid", "fa-trash-can", "trash");
            icon.appendChild(check);
            icon.appendChild(trash);
            notcompleted.appendChild(icon);
            notcompleted.setAttribute("data-id", task.id);
            notcontainer.appendChild(notcompleted);
        } else {
            let completed = document.createElement("div");
            completed.className = "completed";
            let para2 = document.createElement("p");
            para2.textContent = task.task;
            completed.appendChild(para2);
            let trash = document.createElement("i");
            trash.classList.add("fa-solid", "fa-trash-can", "trash");
            completed.setAttribute("data-id", task.id);
            completed.appendChild(trash);
            donecontainer.appendChild(completed);
        }
    });
}

function addtolocalstorage(task) {
    let data = JSON.stringify(task);
    window.localStorage.setItem("task", data);
}

notcontainer.onclick = function (e) {
    if (e.target.classList.contains("trash")) {
        let removing = e.target.parentElement.parentElement;
        let id = removing.dataset.id;
        removefromlocalstorge(id);
        removing.remove();
        addtolocalstorage(arroftasks);
    } else if (e.target.classList.contains("fa-check")) {
        let done = e.target.parentElement.parentElement;
        let id = done.dataset.id;
        editatlocalstorge(id);
        createmylist(arroftasks);
        addtolocalstorage(arroftasks);
    }
};

donecontainer.onclick = function (e) {
    if (e.target.classList.contains("trash")) {
        let removefromcompleted = e.target.parentElement;
        let id = removefromcompleted.dataset.id;
        removefromlocalstorge(id);
        removefromcompleted.remove();
        addtolocalstorage(arroftasks);
    }
};

function editatlocalstorge(id) {
    for (let i = 0; i < arroftasks.length; i++) {
        if (arroftasks[i].id == id) {
            arroftasks[i].completed = true;
        }
    }
    addtolocalstorage(arroftasks);
}

function removefromlocalstorge(id) {
    for (let i = 0; i < arroftasks.length; i++) {
        if (arroftasks[i].id == id) {
            arroftasks.splice(i, 1);
        }
    }
    addtolocalstorage(arroftasks);
}

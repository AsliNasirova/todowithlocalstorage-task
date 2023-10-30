const enter = document.getElementById("enter");
const list = document.getElementById("list");
const DeleteAll = document.getElementById("DeleteAll");

function commonPart() {
    const text = JSON.parse(localStorage.getItem("text"));
    text.forEach(addToList);
}
// for edit
function addToList(taskText) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const editButton = document.createElement("button");
    editButton.classList.add("editButton")
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
        enter.value = taskText;
        enter.focus();
        add.textContent = "Edit"
        add.addEventListener("click", function () {
            list.removeChild(taskItem)
        })
    });


    // for button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton")
    deleteButton.addEventListener("click", () => {
        list.removeChild(taskItem);
        removeFromLocalStorage(taskText);
    });

    // append edirem
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    list.appendChild(taskItem);
}

function saveTasks(text) {
    localStorage.setItem("text", JSON.stringify(text));
}

function removeFromLocalStorage(taskText) {
    const text = JSON.parse(localStorage.getItem("text"));
    const updatedTasks = text.filter(enter => enter !== taskText);
    saveTasks(updatedTasks);
}

add.addEventListener("click", () => {
    const taskText = enter.value.trim();

    if (taskText) {
        addToList(taskText);
        saveTasks([...(JSON.parse(localStorage.getItem("text")) || []), taskText]);
        enter.value = "";
    }
});
// for enter
enter.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        add.click();
    }
});
// for DeleteAll part
DeleteAll.addEventListener("click", () => {
    list.innerHTML = "";
    localStorage.removeItem("text");
});

commonPart();
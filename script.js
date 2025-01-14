
// Get elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const priorityInput = document.getElementById('priority');
const todayTasksContainer = document.getElementById('today-tasks');
const futureTasksContainer = document.getElementById('future-tasks');
const completedTasksContainer = document.getElementById('completed-tasks');

// Function to create a task element
function createTaskElement(task, date, priority, id, isCompleted = false) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.id = id;
    taskItem.innerHTML = `
<p class="task-name">${task} (${date}) <span class="priority-${priority}">${priority}</span></p>
<div class="task-actions">
  ${isCompleted ? '' : '<i class="fa fa-check-circle" aria-hidden="true" onclick="approveTask(\'' + id + '\')"></i>'}
  <i class="fa fa-trash-alt" aria-hidden="true" onclick="deleteTask('${id}')"></i>
</div>
`;
    return taskItem;
}

// Function to approve a task (move to completed tasks)
function approveTask(id) {
    const taskItem = document.getElementById(id);
    completedTasksContainer.appendChild(taskItem);
    taskItem.classList.add('approved');
    updateLocalStorage();
}

// Function to delete a task
function deleteTask(id) {
    const taskItem = document.getElementById(id);
    taskItem.remove();
    updateLocalStorage();
}

// Function to add a task to the correct section
function addTask() {
    const task = taskInput.value;
    const date = dateInput.value;
    const priority = priorityInput.value;

    if (task && date) {
        const taskId = `task-${Date.now()}`;
        const taskElement = createTaskElement(task, date, priority, taskId);

        // If the task date is today, add to today's tasks, else future tasks
        const today = new Date().toISOString().split('T')[0];
        if (date === today) {
            todayTasksContainer.appendChild(taskElement);
        } else {
            futureTasksContainer.appendChild(taskElement);
        }

        // Save task to localStorage
        updateLocalStorage();

        // Clear input fields
        taskInput.value = '';
        dateInput.value = '';
        priorityInput.value = 'low';
    }
}

// Function to update localStorage
function updateLocalStorage() {
    const todayTasks = Array.from(todayTasksContainer.children).map(task => task.id);
    const futureTasks = Array.from(futureTasksContainer.children).map(task => task.id);
    const completedTasks = Array.from(completedTasksContainer.children).map(task => task.id);

    localStorage.setItem('todayTasks', JSON.stringify(todayTasks));
    localStorage.setItem('futureTasks', JSON.stringify(futureTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const todayTasks = JSON.parse(localStorage.getItem('todayTasks')) || [];
    const futureTasks = JSON.parse(localStorage.getItem('futureTasks')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    todayTasks.forEach(taskId => {
        const taskElement = createTaskElement('Task', '2025-01-01', 'low', taskId); // Placeholder data
        todayTasksContainer.appendChild(taskElement);
    });
    futureTasks.forEach(taskId => {
        const taskElement = createTaskElement('Task', '2025-01-01', 'medium', taskId); // Placeholder data
        futureTasksContainer.appendChild(taskElement);
    });
    completedTasks.forEach(taskId => {
        const taskElement = createTaskElement('Task', '2025-01-01', 'high', taskId, true); // Placeholder data
        completedTasksContainer.appendChild(taskElement);
    });
}

// Event listener for Add Task button
addTaskBtn.addEventListener('click', addTask);

// Load tasks from localStorage when the page loads
window.onload = loadTasks;

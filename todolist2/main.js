document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    const saveTasksToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasksFromLocalStorage = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    };

    const addTask = (taskTextFromLoad, completed = false) => {
        const textValue = taskTextFromLoad || taskInput.value.trim();
        
        if (!textValue) return;

        const li = document.createElement('li');
        if (completed) li.classList.add('completed'); 

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
            <span>${textValue}</span>
            <div class="task-buttons">
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed', checkbox.checked); 
            saveTasksToLocalStorage();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            saveTasksToLocalStorage();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        saveTasksToLocalStorage();
    };

    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        addTask();
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    loadTasksFromLocalStorage();
});
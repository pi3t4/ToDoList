document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const categoryTitle = document.getElementById('category-title');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        if (todos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    No todos yet. Add one above to get started!
                </div>
            `;
            return;
        }

        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.innerHTML = `
                <span>${todo.text}</span>
                <button class="delete-btn" data-index="${index}">✕</button>
            `;
            todoList.appendChild(todoItem);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });
        });
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    addBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text });
            todoInput.value = '';
            saveTodos();
            renderTodos();
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    renderTodos();
});
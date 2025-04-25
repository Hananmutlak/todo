//  Definiera Todo-gränssnittet för att definiera formen på uppgiftsobjektet.
interface Todo {
  task: string;
  completed: boolean;
  priority: number;
}
//  Skapa en TodoList-klass för att hantera uppgifter
class TodoList {
  private todos: Todo[];
// Konstruktor Initiera klassen vid skapandet
  constructor() {
    this.todos = [];
    this.loadFromLocalStorage();// Ladda sparade uppgifter vid start
  }
//  Lägg till ny uppgiftsfunktion
  addTodo(task: string, priority: number): boolean {
    if (task.trim() === '' || priority < 1 || priority > 3) return false;// Validera inmatning
    this.todos.push({ task, completed: false, priority });// Lägg till en ny uppgift
    this.saveToLocalStorage();// Spara ändringar till lokal lagring
    return true;
  }
// Växlingsfunktion för slutförandestatus
  markTodoCompleted(index: number): void {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index].completed = !this.todos[index].completed;
      this.saveToLocalStorage();// Spara ändringar
      renderTodos(); // Uppdataera gränssnittet
    }
  }
// fFunktion för att hämta alla uppgifter
  getTodos(): Todo[] {
    return this.todos;
  }
// En specialfunktion för att spara uppgifter till LocalStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): void {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) this.todos = JSON.parse(storedTodos);
  }
}
// Skapa ett huvudobjekt för klassen
const todoList = new TodoList();

document.getElementById('todoForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('task') as HTMLInputElement;// Hämta DOM-element
  const priorityInput = document.getElementById('priority') as HTMLSelectElement;
  const errorMessage = document.getElementById('errorMessage');

  const task = taskInput.value.trim();//  hämta   värden från fält
  const priority = parseInt(priorityInput.value, 10);

  if (todoList.addTodo(task, priority)) {
    taskInput.value = '';
    priorityInput.value = '1';
    errorMessage!.textContent = '';
    renderTodos();
  } else {
    errorMessage!.textContent = 'Vänligen ange en giltig uppgift och prioritet (1–3).';
  }
});
// Funktion för att visa uppgiFter in gränssnittet
function renderTodos() {
  const todosContainer = document.getElementById('todosContainer');
  if (!todosContainer) return;

  todosContainer.innerHTML = '';
  
  todoList.getTodos().forEach((todo, index) => {
    const todoDiv = document.createElement('div');
    todoDiv.className = `todo ${todo.completed ? 'completed' : ''} priority-${todo.priority}`; 
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = todo.task;

    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = `Prioritet: ${todo.priority}`;

    const completeButton = document.createElement('button');
    completeButton.textContent = todo.completed ? 'Ångra' : 'Klar';
    completeButton.addEventListener('click', () => {  todoList.markTodoCompleted(index); });

    todoDiv.appendChild(taskSpan);

    todoDiv.appendChild(prioritySpan);

    todoDiv.appendChild(completeButton);

    todosContainer.appendChild(todoDiv);
  });
}

renderTodos();
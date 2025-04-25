
=======
# Todo App

## # Syfte 
Denna applikation är utvecklad för att:
- Praktisera objektorienterad programmering (OOP) i TypeScript
- Demonstrera användning av interfaces och typer
- Implementera lokal lagring med LocalStorage
- Utveckla en responsiv webbapplikation

---

## # Funktioner som Uppfyller Laborationskrav 

### ### Obligatoriska Krav
 **Lägga till uppgifter**  
   - Textfält + prioritetsväljare (1-3)
   - Validering av tomma fält/ogiltig prioritet

 **Markera uppgifter som klara**  
   - Toggle-funktionalitet med "Klar/Ångra"
   - Visuell feedback (genomstruken text)

 **LocalStorage-integration**  
   - Automatisk sparning vid alla ändringar
   - Laddning vid appstart

 **Responsiv Design**  

   - Media queries för alla

---

## # Teknisk 

### ### Huvudkomponenter

#### #### 1. Todo Interface
```typescript
interface Todo {
    task: string;
    completed: boolean;
    priority: 1 | 2 | 3; // Union type för strikt validering
   
}
#### TodoList-klass
typescript
class TodoList {
    private todos: Todo[];

    constructor() {
        this.todos = [];
        this.loadFromLocalStorage(); 
    }

    addTodo() { ... }
    markTodoCompleted() { ... }
}
####  LocalStorage-hantering
typescript
private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
}
### Förutsättningar
1_ node.js
2_ npm 
### Åtgärdssteg
1_ Klona repot
git clone https://github.com/Hananmutlak/todo.git
# Testning och Validering 
### Testfall
Ogiltig Input

Försök lägga till tom uppgift → felmeddelande visas

Prioritet utanför 1-3 → blockeras

LocalStorage

Stäng och öppna app → data ska finnas kvar

Incognito-läge → ingen data sparas
>>>>>>> 9e99099ec0ca3f64b6d86b32495c8a83dc3311cd

// Szülő osztály
class Task {
    constructor(text) {
      this.text = text;
    }
  
    render() {
      const li = document.createElement("li");
      li.textContent = this.text;
  
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.style.marginLeft = "10px";
      delBtn.onclick = () => li.remove();
  
      li.appendChild(delBtn);
      return li;
    }
  }
  
  // Leszármazott osztály
  class HighlightedTask extends Task {
    constructor(text) {
      super(text);
    }
  
    render() {
      const li = super.render();
      li.style.backgroundColor = "#fffae6";
      return li;
    }
  }
  
  document.getElementById("addBtn").addEventListener("click", () => {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (!taskText) return;
  
    const task = taskText.startsWith("!") 
      ? new HighlightedTask(taskText) 
      : new Task(taskText);
  
    document.getElementById("taskList").appendChild(task.render());
    input.value = "";
  });
  
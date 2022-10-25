const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');



form.addEventListener('submit', e => {
        e.preventDefault();
        if(itTask.value != ""){
            createTask(itTask.value);
            itTask.value = ""
            renderTasks()
        }
});

const createTask = (value) => {
    
    const newTask = {
        id : (Math.random()*100).toString(36).slice(2),
        title : value,
        completado : false,
    };

    tasks.unshift(newTask)
}

const renderTasks = () => {
    const html = tasks.map(task => {
      return  `
                <div class="task">
                    <div class="completed">${task.completado ? `<span class="done">Done</span>` : `<button class = "start-button" data-id="${task.id}">Start</button>` }</div>
                    <div class="title">${task.title}</div>
                </div>
              `
    });
    
    const taskContainer = document.querySelector("#tasks");
    taskContainer.innerHTML = html.join("");

    const startButton = document.querySelectorAll('.task .start-button')

    startButton.forEach((button) => {
        button.addEventListener('click', e => {
            if(!timer){
                const id = button.getAttribute("data-id")
                startButtonHandle(id);
                button.textContent = 'In progress...'
            }
        });
    });
} 

const startButtonHandle = (id) => {
    time = 5;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    taskName.textContent = tasks[taskIndex].title;
    timer = setInterval(() => {
        timeHandler(id)
    }, 1000)    
}

const timeHandler = (id) => {
    time --;
    renderTime();

    if(time === 0){
        clearInterval(timer);
        markComplete(id);
        timer = null;
        renderTasks();
        startBreak ();
    }
}

const startBreak = () =>{
    time = 5;
    taskName.textContent = "Break";
    timerBreak = setInterval(()=> {
        timerBreakHandler()
    }, 1000)
} 

const timerBreakHandler = () => {
    time --;
    renderTime();

    if(time === 0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = ""
        renderTasks();
        
    }
}

const renderTime = () => {
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time/60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? 0 : ""} ${minutes} :${seconds < 10 ? 0 : ""}${seconds}`;
}

const markComplete = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completado = true
}
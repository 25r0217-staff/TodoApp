// // ===================================================
// // TODOアプリ メインスクリプト
// // ===================================================

// // DOM要素の取得
// const addBtn = document.getElementById('add-btn');
// const todoInput = document.getElementById('todo-input');
// const todoList = document.getElementsById('todo-list'); // BUG 1
// const taskCount = document.getElementById('task-count');

// // TODOリストを管理する配列
// let todos = [];

// // 初期化（LocalStorageから前回保存したタスクを読み込んで表示）
// loadTodos();
// render();

// // --- イベントリスナーの登録 ---

// // 追加ボタンクリック時
// addBtn.addEventListener('clik', function () { // BUG 2
//   const text = todoInput.value.trim();
//   if (text !== '') {
//     addTodo(text);
//     todoInput.value = '';
//   }
// });

// // --- 関数定義 ---

// // LocalStorageから前回保存したデータを読み込む関数
// function loadTodos() {
//   const saved = localStorage.getItem('saveTask'); // BUG 3
//   if (saved) {
//     todos.push(saved);
//   }
// }

// // LocalStorageに最新タスクを保存する関数
// function saveTodos() {
//   if (todos.length > 0) {
//     const latestTask = todos[todos.length - 1];
//     localStorage.setItem('savedTask', latestTask);
//   }
// }

// // TODOを追加する関数
// function addTodo(text) {
//   todos.push(text);
//   saveTodos();
//   render();
// }

// // TODOを削除する関数
// function deleteTodo(index) {
//   // 指定したインデックス以外の要素を残す
//   todos.filter((_, i) => i !== index); // BUG 4
//   saveTodos();
//   render();
// }

// // 画面を描画する関数
// function render() {
//   todoList.innerHTML = '';

//   todos.forEach((todoText, index) => {
//     const li = document.createElement('li');
//     li.className = 'todo-item';

//     const span = document.createElement('span');
//     span.className = 'task-text';
//     span.textContent = todoText;

//     const deleteBtn = document.createElement('button');
//     deleteBtn.className = 'delete-btn';
//     deleteBtn.text = '削除'; // BUG 5
//     deleteBtn.addEventListener('click', () => deleteTodo(index));

//     li.appendChild(span);
//     li.appendChild(deleteBtn);
//     todoList.appendChild(li);
//   });

//   // 全タスク数の更新
//   taskCount.textContent = `全タスク: ${todos.length}件`;
// }



// DOM要素の取得
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list'); // 修正1: getElementById
const taskCount = document.getElementById('task-count');

let todos = [];

loadTodos();
render();

addBtn.addEventListener('click', function () { // 修正2: click
  const text = todoInput.value.trim();
  if (text !== '') {
    addTodo(text);
    todoInput.value = '';
  }
});

function loadTodos() {
  const saved = localStorage.getItem('savedTask'); // 修正5: キー名を統一
  if (saved) {
    // 簡易版のため1つだけ読み込む仕様を維持
    todos = [saved]; 
  }
}

function saveTodos() {
  if (todos.length > 0) {
    const latestTask = todos[todos.length - 1];
    localStorage.setItem('savedTask', latestTask);
  } else {
    localStorage.removeItem('savedTask');
  }
}

function addTodo(text) {
  todos.push(text);
  saveTodos();
  render();
}

function deleteTodo(index) {
  todos = todos.filter((_, i) => i !== index); // 修正3: 結果を代入
  saveTodos();
  render();
}

function render() {
  todoList.innerHTML = '';
  todos.forEach((todoText, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = todoText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除'; // 修正4: textContent
    deleteBtn.addEventListener('click', () => deleteTodo(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
  taskCount.textContent = `全タスク: ${todos.length}件`;
}
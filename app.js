const { useState, useEffect } = React;

// Icon components
function Plus({ size = 20 }) { return React.createElement("svg",{width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},React.createElement("line",{x1:12,y1:5,x2:12,y2:19}),React.createElement("line",{x1:5,y1:12,x2:19,y2:12})); }
function Check({ size = 20 }) { return React.createElement("svg",{width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},React.createElement("polyline",{points:"20 6 9 17 4 12"})); }
function Trash2({ size = 20 }) { return React.createElement("svg",{width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},React.createElement("polyline",{points:"3 6 5 6 21 6"}),React.createElement("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}),React.createElement("line",{x1:10,y1:11,x2:10,y2:17}),React.createElement("line",{x1:14,y1:11,x2:14,y2:17})); }
function Edit2({ size = 20 }) { return React.createElement("svg",{width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},React.createElement("path",{d:"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"})); }
function X({ size = 20 }) { return React.createElement("svg",{width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},React.createElement("line",{x1:18,y1:6,x2:6,y2:18}),React.createElement("line",{x1:6,y1:6,x2:18,y2:18})); }
function Tag({ size = 20 }) { return React.createElement("svg",{width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},React.createElement("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}),React.createElement("line",{x1:7,y1:7,x2:7.01,y2:7})); }
function Calendar({ size = 20 }) { return React.createElement("svg",{width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},React.createElement("rect",{x:3,y:4,width:18,height:18,rx:2,ry:2}),React.createElement("line",{x1:16,y1:2,x2:16,y2:6}),React.createElement("line",{x1:8,y1:2,x2:8,y2:6}),React.createElement("line",{x1:3,y1:10,x2:21,y2:10})); }
function AlertCircle({ size = 20 }) { return React.createElement("svg",{width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2},React.createElement("circle",{cx:12,cy:12,r:10}),React.createElement("line",{x1:12,y1:8,x2:12,y2:12}),React.createElement("line",{x1:12,y1:16,x2:12.01,y2:16})); }

function TodoApp() {
  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState('');
  const [category,setCategory] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [priority,setPriority] = useState('medium');
  const [filter,setFilter] = useState('all');
  const [editingId,setEditingId] = useState(null);
  const [editText,setEditText] = useState('');

  const categories = ['Work','Personal','Shopping','Health','Other'];
  const priorities = ['low','medium','high'];

  useEffect(()=>{const saved=JSON.parse(localStorage.getItem('todos')||'[]');setTodos(saved);},[]);
  useEffect(()=>{localStorage.setItem('todos',JSON.stringify(todos));},[todos]);

  const addTodo=()=>{if(!input.trim())return;setTodos([...todos,{id:Date.now(),text:input,completed:false,category:category||'Other',dueDate:dueDate,priority:priority}]);setInput('');setCategory('');setDueDate('');setPriority('medium');};
  const toggleTodo=id=>setTodos(todos.map(t=>t.id===id?{...t,completed:!t.completed}:t));
  const deleteTodo=id=>setTodos(todos.filter(t=>t.id!==id));
  const startEdit=todo=>{setEditingId(todo.id);setEditText(todo.text);};
  const saveEdit=id=>{if(editText.trim()){setTodos(todos.map(t=>t.id===id?{...t,text:editText}:t));}setEditingId(null);setEditText('');};
  const cancelEdit=()=>{setEditingId(null);setEditText('');};
  const handleKeyPress=e=>{if(e.key==='Enter')addTodo();};
  const getPriorityColor=p=>({high:'text-red-600 bg-red-50 border-red-200',medium:'text-yellow-600 bg-yellow-50 border-yellow-200',low:'text-green-600 bg-green-50 border-green-200'}[p]||'text-gray-600 bg-gray-50 border-gray-200');
  const isOverdue=d=>d&&new Date(d)<new Date()&&new Date(d).toDateString()!==new Date().toDateString();

  const clearCompleted = ()=>setTodos(todos.filter(t=>!t.completed));
  const clearAll = ()=>{if(confirm("Are you sure you want to delete all tasks?")) setTodos([]);};

  const filteredTodos = todos.filter(t=>filter==='active'?!t.completed:filter==='completed'?t.completed:true)
                            .sort((a,b)=>({high:0,medium:1,low:2}[a.priority]-{high:0,medium:1,low:2}[b.priority]));

  const activeTodos=todos.filter(t=>!t.completed).length;
  const completedTodos=todos.filter(t=>t.completed).length;

  return React.createElement("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8"},
    React.createElement("div",{className:"max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8"},
      React.createElement("h1",{className:"text-4xl font-bold text-gray-800 mb-2"},"Get S**t Done!"),
      React.createElement("div",{className:"flex gap-4 text-sm text-gray-500 mb-6"},
        React.createElement("span",null,`${activeTodos} active`),
        React.createElement("span",null,"•"),
        React.createElement("span",null,`${completedTodos} completed`),
        React.createElement("span",null,"•"),
        React.createElement("span",null,`${todos.length} total`)
      ),
      React.createElement("div",{className:"bg-gray-50 rounded-xl p-4 mb-6 space-y-3"},
        React.createElement("input",{type:"text",value:input,onChange:e=>setInput(e.target.value),onKeyPress:handleKeyPress,placeholder:"Add a new task...",className:"w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"}),
        React.createElement("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-3"},
          React.createElement("div",null,
            React.createElement("label",{className:"block text-xs font-medium text-gray-600 mb-1"},"Category"),
            React.createElement("select",{value:category,onChange:e=>setCategory(e.target.value),className:"w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"},
              React.createElement("option",{value:""},"Select..."),
              categories.map(cat=>React.createElement("option",{key:cat,value:cat},cat))
            )
          ),
          React.createElement("div",null,
            React.createElement("label",{className:"block text-xs font-medium text-gray-600 mb-1"},"Due Date"),
            React.createElement("input",{type:"date",value:dueDate,onChange:e=>setDueDate(e.target.value),className:"w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"})
          ),
          React.createElement("div",null,
            React.createElement("label",{className:"block text-xs font-medium text-gray-600 mb-1"},"Priority"),
            React.createElement("select",{value:priority,onChange:e=>setPriority(e.target.value),className:"w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"},
              priorities.map(p=>React.createElement("option",{key:p,value:p},p.charAt(0).toUpperCase()+p.slice(1)))
            )
          )
        ),
        React.createElement("button",{onClick:addTodo,className:"w-full bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"},
          React.createElement(Plus,{size:20}),
          "Add Task"
        )
      ),
      React.createElement("div",{className:"flex gap-2 mb-6 flex-wrap"},
        ['all','active','completed'].map(f=>
          React.createElement("button",{key:f,onClick:()=>setFilter(f),className:`px-4 py-2 rounded-lg transition-colors ${filter===f?'bg-indigo-500 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`},
            f.charAt(0).toUpperCase()+f.slice(1),
            ' ',
            f==='all'?`(${todos.length})`:f==='active'?`(${activeTodos})`:`(${completedTodos})`
          )
        ),
        React.createElement("button",{onClick:clearCompleted,className:"px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"},"Clear Completed"),
        React.createElement("button",{onClick:clearAll,className:"px-4 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800 transition-colors"},"Clear All")
      ),
      React.createElement("div",{className:"space-y-2"},
        filteredTodos.length===0?
          React.createElement("p",{className:"text-center text-gray-400 py-12"},filter==='all'?"No tasks yet. Add one to get started!":`No ${filter} tasks.`)
        :
          filteredTodos.map(todo =>
            React.createElement("div",{key:todo.id,className:"p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"},
              React.createElement("div",{className:"flex items-start gap-3"},
                React.createElement("button",{onClick:()=>toggleTodo(todo.id),className:`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all mt-1 ${todo.completed?'bg-indigo-500 border-indigo-500':'border-gray-300 hover:border-indigo-400'}`},
                  todo.completed && React.createElement(Check,{size:16,className:"text-white"})
                ),
                React.createElement("div",{className:"flex-1 min-w-0"},
                  editingId===todo.id?
                    React.createElement("div",{className:"flex gap-2"},
                      React.createElement("input",{type:"text",value:editText,onChange:e=>setEditText(e.target.value),onKeyPress:e=>e.key==='Enter'&&saveEdit(todo.id),className:"flex-1 px-3 py-1 border-2 border-indigo-500 rounded focus:outline-none",autoFocus:true}),
                      React.createElement("button",{onClick:()=>saveEdit(todo.id),className:"text-green-600 hover:text-green-700"},React.createElement(Check,{size:20})),
                      React.createElement("button",{onClick:cancelEdit,className:"text-red-600 hover:text-red-700"},React.createElement(X,{size:20}))
                    )
                  :
                    React.createElement(React.Fragment,null,
                      React.createElement("div",{className:"flex items-start justify-between gap-2"},
                        React.createElement("span",{className:`text-gray-700 break-words ${todo.completed?'line-through text-gray-400':''}`},todo.text),
                        React.createElement("div",{className:"flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"},
                          React.createElement("button",{onClick:()=>startEdit(todo),className:"text-blue-500 hover:text-blue-600"},React.createElement(Edit2,{size:16})),
                          React.createElement("button",{onClick:()=>deleteTodo(todo.id),className:"text-red-500 hover:text-red-600"},React.createElement(Trash2,{size:16}))
                        )
                      ),
                      React.createElement("div",{className:"flex flex-wrap gap-2 mt-2"},
                        React.createElement("span",{className:`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border ${getPriorityColor(todo.priority)}`},React.createElement(AlertCircle,{size:12}),todo.priority),
                        React.createElement("span",{className:"inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-purple-50 text-purple-600 border border-purple-200"},React.createElement(Tag,{size:12}),todo.category),
                        todo.dueDate && React.createElement("span",{className:`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border ${isOverdue(todo.dueDate) && !todo.completed?'bg-red-50 text-red-600 border-red-200':'bg-blue-50 text-blue-600 border-blue-200'}`},
                          React.createElement(Calendar,{size:12}),
                          new Date(todo.dueDate).toLocaleDateString(),
                          isOverdue(todo.dueDate) && !todo.completed ? ' (Overdue)' : null
                        )
                      )
                    )
                )
              )
            )
          )
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(TodoApp));

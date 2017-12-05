webpackJsonp([1],[,,,,,,,,,,,,,function(t,e,s){"use strict";var o=s(7),a=s.n(o),n=s(102),i=s(93),r=s.n(i),c=s(90),d=s.n(c),l=s(89),u=s.n(l);a.a.use(n.a),e.a=new n.a({routes:[{path:"/",name:"Boards",component:d.a},{path:"/boards/:id",name:"Board",component:u.a},{path:"/login",name:"Login",component:r.a}]})},,,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";var o=s(38),a=s.n(o),n=s(7),i=s.n(n),r=s(104),c=s(13),d=a.a.create({baseURL:"/api/",timeout:2e3,withCredentials:!0}),l=a.a.create({baseURL:"/",timeout:2e3,withCredentials:!0});i.a.use(r.a);var u=new r.a.Store({state:{boards:[],activeBoard:{},lists:[],tasks:{},comments:{},error:{},activeUser:{}},mutations:{setBoards:function(t,e){t.boards=e},handleError:function(t,e){t.error=e},setActiveUser:function(t,e){t.activeUser=e},setActiveBoard:function(t,e){t.activeBoard=e,console.log("activeBoard: ",t.activeBoard)},setLists:function(t,e){t.lists=e},setTasks:function(t,e){i.a.set(t.tasks,e.listId,e.data)},setComments:function(t,e){console.log("payload in setComments: ",e),i.a.set(t.comments,e.taskId,e.data)}},actions:{addNewUser:function(t,e){var s=t.commit;t.dispatch;l.post("register",e).then(function(t){console.log("Response to addNewUser: ",t),s("setActiveUser",t.data.data),c.a.push({name:"Boards"})}).catch(function(t){s("handleError",t)})},login:function(t,e){var s=t.commit;t.dispatch;l.post("login",e).then(function(t){console.log("Response to login: ",t),t.data.error||(s("setActiveUser",t.data.data),c.a.push({name:"Boards"}))}).catch(function(t){s("handleError",t)})},logout:function(t){var e=t.commit;t.dispatch;l.delete("logout").then(function(t){console.log("Response to logout: ",t),e("setActiveUser",{}),e("setActiveBoard",{}),c.a.push({name:"Login"})}).catch(function(t){e("handleError",t)})},authenticate:function(t){var e=t.commit;t.dispatch;l("authenticate").then(function(t){console.log("Response to authenticate: ",t),e("setActiveUser",t.data.data),c.a.push({name:"Boards"})}).catch(function(t){c.a.push({name:"Login"}),e("handleError",t)})},getBoards:function(t){var e=t.commit;t.dispatch;d("userboards").then(function(t){e("setBoards",t.data.data)}).catch(function(t){e("handleError",t)})},getBoard:function(t,e){var s=t.commit,o=t.dispatch;console.log("get board in store"),d("boards/"+e).then(function(t){console.log("res to get board: ",t),o("getLists",e),s("setActiveBoard",t.data.data)}).catch(function(t){s("handleError",t)})},createBoard:function(t,e){var s=t.commit,o=t.dispatch;d.post("boards/",e).then(function(t){console.log("res to create board: ",t),o("getBoards")}).catch(function(t){s("handleError",t)})},removeBoard:function(t,e){var s=t.commit,o=t.dispatch;d.delete("boards/"+e._id).then(function(t){o("getBoards")}).catch(function(t){s("handleError",t)})},getLists:function(t,e){var s=t.commit;t.dispatch;d("boards/"+e+"/lists").then(function(t){console.log("response to getLists: ",t),s("setLists",t.data.data)}).catch(function(t){s("handleError",t)})},createList:function(t,e){var s=t.commit,o=t.dispatch;e.list.boardId=e.id,console.log("list: ",e.list),d.post("lists/",e.list).then(function(t){o("getLists",e.list.boardId),console.log("response to createList: ",t)}).catch(function(t){s("handleError",t)})},removeList:function(t,e){var s=t.commit,o=t.dispatch;d.delete("lists/"+e._id).then(function(t){o("getLists",e.boardId)}).catch(function(t){s("handleError",t)})},getTasks:function(t,e){var s=t.commit;t.dispatch;d("boards/"+e.boardId+"/lists/"+e.listId+"/tasks").then(function(t){console.log("response to getTasks: ",t),s("setTasks",{data:t.data.data,listId:e.listId})}).catch(function(t){s("handleError",t)})},createTask:function(t,e){var s=t.commit,o=t.dispatch;e.task.listId=e.listId,e.task.boardId=e.boardId,console.log("task: ",e.task),d.post("tasks/",e.task).then(function(t){o("getTasks",{listId:e.listId,boardId:e.boardId}),console.log("response to createTask: ",t)}).catch(function(t){s("handleError",t)})},moveTask:function(t,e){var s=t.commit,o=t.dispatch;console.log("old list id: ",e.task.listId),e.task.listId=e.newListId,console.log("new list id: ",e.task.listId),console.log("task to move: ",e.task),d.put("tasks/"+e.task._id,e.task).then(function(t){o("getTasks",{listId:e.listId,boardId:e.boardId}),o("getTasks",{listId:e.newListId,boardId:e.boardId}),console.log("response to moveTask: ",t)}).catch(function(t){s("handleError",t)})},removeTask:function(t,e){var s=t.commit,o=t.dispatch;d.delete("tasks/"+e.task._id).then(function(t){o("getTasks",{listId:e.task.listId,boardId:e.boardId})}).catch(function(t){s("handleError",t)})},getComments:function(t,e){var s=t.commit;t.dispatch;d("boards/"+e.boardId+"/lists/"+e.listId+"/tasks/"+e.taskId+"/comments").then(function(t){console.log("response to getComments: ",t),s("setComments",{data:t.data.data,taskId:e.taskId})}).catch(function(t){s("handleError",t)})},createComment:function(t,e){var s=t.commit,o=t.dispatch;e.comment.taskId=e.taskId,e.comment.listId=e.listId,e.comment.boardId=e.boardId,console.log("comment: ",e.comment),d.post("comments/",e.comment).then(function(t){o("getComments",{listId:e.listId,boardId:e.boardId,taskId:e.taskId}),console.log("response to createComment: ",t)}).catch(function(t){s("handleError",t)})},removeComment:function(t,e){var s=t.commit,o=t.dispatch;d.delete("comments/"+e.comment._id).then(function(t){console.log(t),o("getComments",{listId:e.listId,boardId:e.boardId,taskId:e.comment.taskId}),console.log("response to removeComment: ",t)}).catch(function(t){s("handleError",t)})},handleError:function(t,e){var s=t.commit;t.dispatch;s("handleError",e)}}});e.a=u},,function(t,e,s){s(76);var o=s(3)(s(56),s(96),null,null);t.exports=o.exports},,,,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(91),a=s.n(o);e.default={name:"app",components:{Error:a.a},mounted:function(){this.$store.dispatch("authenticate")},methods:{logout:function(){this.$store.dispatch("logout")}},computed:{activeUser:function(){return this.$store.state.activeUser}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(92),a=s.n(o);e.default={name:"board",data:function(){return{newList:{}}},mounted:function(){this.$store.dispatch("getBoard",this.$route.params.id)},methods:{createList:function(t){this.$store.dispatch("createList",{id:t,list:this.newList}),this.newList={}},getLists:function(t){this.$store.dispatch("getLists",t)},removeList:function(t){this.$store.dispatch("removeList",t)},logout:function(){this.$store.dispatch("logout")}},computed:{board:function(){return this.$store.state.activeBoard},lists:function(){return this.$store.state.lists}},components:{list:a.a}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"boards",data:function(){return{newBoard:{}}},mounted:function(){this.$store.dispatch("getBoards")},computed:{boards:function(){return this.$store.state.boards},activeBoard:function(){return this.$store.state.activeBoard},lists:function(){return this.$store.state.lists}},methods:{createBoard:function(){this.$store.dispatch("createBoard",this.newBoard),this.newBoard={}},removeBoard:function(t){this.$store.dispatch("removeBoard",t)},getBoard:function(t){console.log("get board in compnent"),this.$store.dispatch("getBoard",t)},logout:function(){this.$store.dispatch("logout")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"error",computed:{error:function(){return this.$store.state.error}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(94),a=s.n(o);e.default={name:"list",props:["name","description","listId","boardId"],data:function(){return{newTask:{},destinationList:{}}},mounted:function(){this.$store.dispatch("getTasks",{listId:this.listId,boardId:this.boardId}),console.log("tasks ref: ",this.$store.state.tasks[this.listId]),console.log("list-Id: ",this.listId)},methods:{createTask:function(t,e){this.$store.dispatch("createTask",{listId:t,boardId:e,task:this.newTask}),this.newTask={}},removeTask:function(t,e){this.$store.dispatch("removeTask",{task:t,boardId:e})},moveTask:function(t,e,s){var o=this.destinationList._id;this.$store.dispatch("moveTask",{task:t,listId:e,boardId:s,newListId:o})},logout:function(){this.$store.dispatch("logout")}},computed:{tasks:function(){return this.$store.state.tasks[this.listId]},lists:function(){return this.$store.state.lists}},components:{task:a.a}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"login",data:function(){return{loginFormActive:!0,newUser:{},returningUser:{}}},methods:{toggleFormState:function(){this.loginFormActive=!this.loginFormActive},addNewUser:function(){this.$store.dispatch("addNewUser",this.newUser),this.newUser={}},login:function(){this.$store.dispatch("login",this.returningUser),this.returningUser={}},logout:function(){this.$store.dispatch("logout")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"comment",props:["name","description","taskId","boardId","listId"],data:function(){return{newComment:{}}},mounted:function(){this.$store.dispatch("getComments",{taskId:this.taskId,boardId:this.boardId,listId:this.listId}),console.log("listId:",this.listId)},methods:{createComment:function(t,e,s){this.$store.dispatch("createComment",{taskId:t,listId:e,boardId:s,comment:this.newComment}),this.newComment={}},removeComment:function(t,e,s){this.$store.dispatch("removeComment",{comment:t,boardId:e,listId:s})},logout:function(){this.$store.dispatch("logout")}},computed:{comments:function(){return this.$store.state.comments[this.taskId]}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(7),a=s.n(o),n=s(35),i=s.n(n),r=s(13),c=s(34),d=(s.n(c),s(33));new a.a({el:"#app",store:d.a,router:r.a,template:"<App/>",components:{App:i.a}})},,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,,,function(t,e,s){s(79);var o=s(3)(s(57),s(99),"data-v-5337eb44",null);t.exports=o.exports},function(t,e,s){s(75);var o=s(3)(s(58),s(95),"data-v-0c6e3af6",null);t.exports=o.exports},function(t,e,s){s(78);var o=s(3)(s(59),s(98),"data-v-49c58c80",null);t.exports=o.exports},function(t,e,s){s(77);var o=s(3)(s(60),s(97),"data-v-32eec754",null);t.exports=o.exports},function(t,e,s){s(80);var o=s(3)(s(61),s(100),"data-v-60b1dd3e",null);t.exports=o.exports},function(t,e,s){s(81);var o=s(3)(s(62),s(101),"data-v-7de155bd",null);t.exports=o.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-offset-3 col-xs-6"},[s("div",{staticClass:"add-board-form"},[s("form",{attrs:{type:"submit"},on:{submit:function(e){e.preventDefault(),t.createBoard(e)}}},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.name,expression:"newBoard.name"}],staticClass:"form-control",attrs:{name:"name",type:"text",placeholder:"Name"},domProps:{value:t.newBoard.name},on:{input:function(e){e.target.composing||(t.newBoard.name=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.description,expression:"newBoard.description"}],staticClass:"form-control",attrs:{name:"description",type:"text",placeholder:"Description"},domProps:{value:t.newBoard.description},on:{input:function(e){e.target.composing||(t.newBoard.description=e.target.value)}}})]),t._v(" "),t._m(0)])])])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-6"},[s("h2",[t._v("My Boards")]),t._v(" "),s("div",{staticClass:"row"},t._l(t.boards,function(e){return s("div",{staticClass:"col-xs-12"},[s("router-link",{staticClass:"linked-text",attrs:{to:"/boards/"+e._id}},[s("h4",[s("span",{on:{mouseover:function(s){t.getBoard(e._id)},click:function(s){t.getBoard(e._id)}}},[t._v(t._s(e.name))])])]),t._v(" "),s("span",{staticClass:"glyphicon glyphicon-remove-circle",on:{click:function(s){t.removeBoard(e)}}})],1)}))]),t._v(" "),s("div",{staticClass:"col-xs-6"},[s("h2",[t._v("Preview Board")]),t._v(" "),t.activeBoard.hasOwnProperty("name")?s("div",[s("h3",[t._v(t._s(t.activeBoard.name))]),t._v(" "),s("p",[t._v("Lists: "+t._s(t.lists.length))]),t._v(" "),s("p",[t._v("Created: "+t._s(new Date(Number(t.activeBoard.created)).getMonth()+1)+"/"+t._s(new Date(Number(t.activeBoard.created)).getDate())+"/"+t._s(new Date(Number(t.activeBoard.created)).getFullYear())+"\n        ")])]):s("div",[s("p",[t._v("Mouse over a board to preview.")])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-default navbar-btn",attrs:{type:"submit"}},[t._v("Create Board")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[t.activeUser.hasOwnProperty("name")?s("div",{staticClass:"text-right logout-bar"},[s("button",{staticClass:"btn btn-default",on:{click:t.logout}},[t._v("Logout")])]):t._e(),t._v(" "),s("h1",{staticClass:"main-title"},[t._v("KANBAN")]),t._v(" "),s("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"flex text-wrap"},[s("h1",[t._v(t._s(t.name))])]),t._v(" "),s("div",{staticClass:"flex text-wrap"},[s("p",[t._v(t._s(t.description))])]),t._v(" "),s("div",{staticClass:"add-task-form"},[s("form",{attrs:{type:"submit"},on:{submit:function(e){e.preventDefault(),t.createTask(t.listId,t.boardId)}}},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.name,expression:"newTask.name"}],staticClass:"form-control",attrs:{name:"name",type:"text",placeholder:"Name"},domProps:{value:t.newTask.name},on:{input:function(e){e.target.composing||(t.newTask.name=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.description,expression:"newTask.description"}],staticClass:"form-control",attrs:{name:"description",type:"text",placeholder:"Description"},domProps:{value:t.newTask.description},on:{input:function(e){e.target.composing||(t.newTask.description=e.target.value)}}})]),t._v(" "),t._m(0)])]),t._v(" "),t._l(t.tasks,function(e){return s("div",{staticClass:"task"},[s("span",{staticClass:"glyphicon glyphicon-remove-circle pull-right",on:{click:function(s){t.removeTask(e,t.boardId)}}}),t._v(" "),s("task",{attrs:{name:e.name,description:e.description,taskId:e._id,boardId:t.boardId,listId:t.listId}}),t._v(" "),s("div",{staticClass:"move-task-form"},[s("form",{on:{submit:function(s){s.preventDefault(),t.moveTask(e,t.listId,t.boardId)}}},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.destinationList,expression:"destinationList"}],attrs:{required:""},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.destinationList=e.target.multiple?s:s[0]},function(s){t.moveTask(e,t.listId,t.boardId)}]}},[s("option",{attrs:{value:"",selected:"",disabled:""}},[t._v("Move To:")]),t._v(" "),t._l(t.lists,function(e){return s("option",{domProps:{value:e}},[t._v(t._s(e.name))])})],2)])])],1)})],2)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group text-left"},[s("button",{staticClass:"btn btn-success navbar-btn",attrs:{type:"submit"}},[t._v("+ Task")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.error.message?s("div",[t._v("\n  Error: "+t._s(t.error.message)+"\n")]):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-offset-3 col-xs-6"},[s("router-link",{staticClass:"linked-text",attrs:{to:"/"}},[s("p",[t._v("Back to All Boards")])]),t._v(" "),s("h1",[t._v(t._s(t.board.name))]),t._v(" "),s("p",[t._v(t._s(t.board.description))]),t._v(" "),s("div",{staticClass:"add-list-form"},[s("form",{attrs:{type:"submit"},on:{submit:function(e){e.preventDefault(),t.createList(t.board._id)}}},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newList.name,expression:"newList.name"}],staticClass:"form-control",attrs:{name:"name",type:"text",placeholder:"Name"},domProps:{value:t.newList.name},on:{input:function(e){e.target.composing||(t.newList.name=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newList.description,expression:"newList.description"}],staticClass:"form-control",attrs:{name:"description",type:"text",placeholder:"Description"},domProps:{value:t.newList.description},on:{input:function(e){e.target.composing||(t.newList.description=e.target.value)}}})]),t._v(" "),t._m(0)])])],1)]),t._v(" "),s("div",{staticClass:"row lists-row"},t._l(t.lists,function(e){return s("div",{staticClass:"col-xs-4 list"},[s("span",{staticClass:"glyphicon glyphicon-remove-circle pull-right",on:{click:function(s){t.removeList(e)}}}),t._v(" "),s("list",{attrs:{name:e.name,description:e.description,listId:e._id,boardId:t.board._id}})],1)}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-success navbar-btn",attrs:{type:"submit"}},[t._v("+ List")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[t.loginFormActive?s("div",{staticClass:"login-form col-sm-offset-3 col-sm-6"},[s("form",{attrs:{type:"submit"},on:{submit:function(e){e.preventDefault(),t.login(e)}}},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.returningUser.email,expression:"returningUser.email"}],staticClass:"form-control",attrs:{name:"email",type:"text",placeholder:"Email"},domProps:{value:t.returningUser.email},on:{input:function(e){e.target.composing||(t.returningUser.email=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.returningUser.password,expression:"returningUser.password"}],staticClass:"form-control",attrs:{name:"password",type:"password",placeholder:"Password"},domProps:{value:t.returningUser.password},on:{input:function(e){e.target.composing||(t.returningUser.password=e.target.value)}}})]),t._v(" "),t._m(0)]),t._v(" "),s("a",{staticClass:"toggle-link",on:{click:t.toggleFormState}},[t._v("Not a user? Sign up here.")])]):s("div",{staticClass:"signup-form col-sm-offset-3 col-sm-6"},[s("form",{attrs:{type:"submit"},on:{submit:function(e){e.preventDefault(),t.addNewUser(e)}}},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.email,expression:"newUser.email"}],staticClass:"form-control",attrs:{name:"email",type:"text",placeholder:"Email"},domProps:{value:t.newUser.email},on:{input:function(e){e.target.composing||(t.newUser.email=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.name,expression:"newUser.name"}],staticClass:"form-control",attrs:{name:"name",type:"text",placeholder:"Name"},domProps:{value:t.newUser.name},on:{input:function(e){e.target.composing||(t.newUser.name=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.password,expression:"newUser.password"}],staticClass:"form-control",attrs:{name:"password",type:"password",placeholder:"Password"},domProps:{value:t.newUser.password},on:{input:function(e){e.target.composing||(t.newUser.password=e.target.value)}}})]),t._v(" "),t._m(1),t._v(" "),s("a",{staticClass:"toggle-link",on:{click:t.toggleFormState}},[t._v("Already a user? Log in here.")])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-default navbar-btn",attrs:{type:"submit"}},[t._v("Login")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-default navbar-btn",attrs:{type:"submit"}},[t._v("Sign Up")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"flex text-wrap"},[s("h1",{staticClass:"text-left"},[t._v(t._s(t.name))])]),t._v(" "),s("div",{staticClass:"flex text-wrap"},[s("p",{staticClass:"text-left"},[t._v(t._s(t.description))])]),t._v(" "),s("div",{staticClass:"add-comment-form"},[s("form",{attrs:{type:"submit"},on:{submit:function(e){e.preventDefault(),t.createComment(t.taskId,t.listId,t.boardId)}}},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newComment.text,expression:"newComment.text"}],staticClass:"form-control",attrs:{name:"name",type:"text",placeholder:"Comment"},domProps:{value:t.newComment.text},on:{input:function(e){e.target.composing||(t.newComment.text=e.target.value)}}})]),t._v(" "),t._m(0)])]),t._v(" "),t._l(t.comments,function(e){return s("div",{staticClass:"comment flex v-top h-space-between"},[s("div",{staticClass:"flex text-wrap"},[s("p",{staticClass:"text-left"},[t._v(t._s(e.text))])]),t._v(" "),s("div",{staticClass:"flex v-center h-center"},[s("span",{staticClass:"glyphicon glyphicon-remove-circle",on:{click:function(s){t.removeComment(e,t.boardId,t.listId)}}})])])})],2)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group text-left"},[s("button",{staticClass:"btn btn-success navbar-btn",attrs:{type:"submit"}},[t._v("+ Comment")])])}]}},,,,,,function(t,e){}],[63]);
//# sourceMappingURL=app.5239870ad7a8ee3caf9d.js.map
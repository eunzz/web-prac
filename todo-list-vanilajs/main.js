/* todolist*/

function updateItemStatus(){
  var chId = this.id.replace('cb_','');
  var itemText = document.getElementById('item_'+chId);

  if (this.checked){
    itemText.className = 'checked';
  } else {
    itemText.className = '';
  }
}

/*
function editItem(){
  var newItemText = prompt("new text");
  this.innerText = newItemText;
}*/

function editItem(){
  var edId = this.id.replace('editbtn_','');
  var itemText = document.getElementById('item_'+edId);
  var newItemText = prompt("new text");
  itemText.innerText = newItemText;
}

function removeItem(){
  var delId = this.id.replace('delbtn_','');
  var delItem = document.getElementById('li_'+delId);
  var parentElementId = delItem.parentElement.id;
  if (parentElementId == 'todolist')
    document.getElementById('todolist').removeChild(delItem);
  else
    document.getElementById('donelist').removeChild(delItem);
}

function moveItem(){
  var parentElementId = this.parentElement.id;
  if (parentElementId == 'todolist'){
    document.getElementById('todolist').removeChild(this);
    document.getElementById('donelist').appendChild(this);
  } 
  else {
    document.getElementById('donelist').removeChild(this);
    document.getElementById('todolist').appendChild(this);
  }
}

function mouseover(){
  var edbtnId = this.id.replace('li_','');
  var editbtn = document.getElementById('editbtn_'+edbtnId);
  var delbtn = document.getElementById('delbtn_'+edbtnId);
  editbtn.style.visibility = 'visible';
  delbtn.style.visibility = 'visible';
}
function mouseout(){
  var edbtnId = this.id.replace('li_','');
  var editbtn = document.getElementById('editbtn_'+edbtnId);
  var delbtn = document.getElementById('delbtn_'+edbtnId);
  editbtn.style.visibility = 'hidden';
  delbtn.style.visibility = 'hidden';
}

function addNewItem(list, itemText){
  var date = new Date();
  var id = "" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

  var listItem = document.createElement('li');
  listItem.id = 'li_'+id;
  // dblclick하면 remove Item
  //listItem.ondblclick = removeItem; 
  // dblclick하면 move to donelist
  listItem.ondblclick = moveItem;
  // list에 moseover시 EDIT 버튼 나타나게 하기
  listItem.addEventListener('mouseover',mouseover);
  listItem.addEventListener('mouseout', mouseout);
  /*
  var checkBox = document.createElement('input');
  checkBox.type='checkbox';
  checkBox.id = 'cb_'+id;
  // checkbox click하면 className checked로 변경
  checkBox.onclick = updateItemStatus;
  */
  
  var span = document.createElement('span');
  span.id = 'item_'+id;
  span.innerText = itemText;
  // click하면 list item 수정
  //span.onclick = editItem;

  var editbtn = document.createElement('button');
  editbtn.id = 'editbtn_'+id;
  //editbtn.className = 'editbtn';
  editbtn.innerText = 'EDIT';
  editbtn.onclick = editItem;

  var delbtn = document.createElement('button');
  delbtn.id = 'delbtn_'+id;
  delbtn.innerText = 'DEL';
  delbtn.onclick = removeItem;

  //listItem.appendChild(checkBox);
  listItem.appendChild(span);
  listItem.appendChild(editbtn);
  listItem.appendChild(delbtn);
  list.appendChild(listItem);
}

var inputText = document.getElementById('inputText');
inputText.focus();

// 엔터치면 list item 추가
inputText.onkeyup = function(event){ 
  if (event.which === 13){
    var itemText = inputText.value;
    if (!itemText || itemText === "" || itemText === " ") return false;
    addNewItem(document.getElementById('todolist'), itemText);
    inputText.focus();
    inputText.select();
  }
}

var addBtn = document.getElementById('btnAdd');
addBtn.onclick = function(){
  var itemText = inputText.value;
  if (!itemText || itemText === "" || itemText === " ") return false;
  addNewItem(document.getElementById('todolist'), itemText);
  inputText.select();
}






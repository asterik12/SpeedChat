const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const roomName2 = document.getElementById('room-name2');

const userList = document.getElementById('users');
const userList2 = document.getElementById('users2');

//Get user name and room from URL
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});


const socket = io();

//join chatroom
socket.emit('joinRoom', {username, room});

//get room and users
socket.on('roomUsers', ({room, users})=> {
  outputRoomName(room);
  outputUsers(users);
});


//Message from server
socket.on('message', message => {
    outputMessage(message);
 

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;



});






socket.on('notification', notification => {
  outputNotify(notification);
  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;



});

//Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get message text
  const msg = e.target.elements.msg.value;
  

  //Emit message to server
  socket.emit('chatMessage', msg);
  
    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});



//Output message to DOM
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta">${message.username} </p>
  <p class="text">
    ${message.text}
  </p>
  
  <p class="message-time">${message.time} &nbsp; &nbsp;<i class="fa fa-check" aria-hidden="true"></i> </p>
  
`;
  document.querySelector('.chat-messages').appendChild(div);

  }

//notification
function outputNotify(notification){
  const div = document.createElement('div');
  div.classList.add('notification');
  div.innerHTML = `
 
    <p class="meta"><b> ${notification.username} </b>
    <span>
      ${notification.text} 
    </span></p> &nbsp;&nbsp;&nbsp;
    <p class="time">${notification.time}</p>
   
  `;
  document.querySelector('.chat-messages').appendChild(div);
}




//Add room name to DOM
function outputRoomName(room) {
  roomName.innerHTML = room;
  roomName2.innerHTML= room;
}


//Add users to DOM
function outputUsers(users){
 
  userList.innerHTML = `
  ${users.map(user => 
    `
 <li> <i class="fa fa-user-circle" aria-hidden="true"></i>
  ${user.username} <div class="active-users-chat"></div>
  </li>
  

  `).join('')}
  `;

  userList2.innerHTML=userList.innerHTML;
}




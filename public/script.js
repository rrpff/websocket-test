var socket = io()
  , input = document.getElementById('logthis')
  , ul = document.getElementsByClassName('messages')[0];

input.onkeypress = function(ev){
  if(ev.keyCode == 13){
    socket.emit('message', input.value);
    input.value = '';
  }
}

socket.on('sent', function(message){
  var li = document.createElement('li');
  li.innerHTML = message;
  ul.appendChild(li);
});

const socket=new WebSocket('ws://localhost:8767');

socket.onopen=()=>{
  console.log('connection established');
};
socket.onmessage=(event)=>{
  const data=JSON.parse(JSON.parse(event.data));
  document.getElementById('data-div').textContent=data.data;
};
socket.onerror=(error)=>{
  console.log(error);
};
socket.onclose=()=>{
  console.log('closed');
};

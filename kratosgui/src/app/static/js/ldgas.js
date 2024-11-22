const socket= new WebSocket('ws://localhost:8766');

socket.onopen=()=>{
  console.log('connection established')
};

socket.onmessage=(event)=>{
  const data=JSON.parse(JSON.parse(event.data));
  document.getElementById('container').textContent=data.data;
};

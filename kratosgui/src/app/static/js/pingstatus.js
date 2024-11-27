const element=document.getElementsByClassName('top-right-box');
fetch('https://google.com',{method: 'GET',mode: 'no-cors'})
.then(response=>{
  if(response.ok)
  {
    for(let e in element)
    {
      e.style.backgroundColour=0x008000;
    }
  }
})
.catch(error=> {
  console.log(error);
});

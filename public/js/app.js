const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageone');
const messageTwo = document.querySelector('#messagetwo');


weatherForm.addEventListener('submit', (e) => {  //event to listen for, callback function to run   e for event
  e.preventDefault();

  const location = search.value;  //extracts the search value from 'input'
  messageOne.textContent = 'loading...';
  messageTwo.textContent = '';
  fetch('/weather?address=' + location).then((response)=> {   //javascript to call api on submit event
    response.json().then((data)=> {
      if(data.error){
        //console.log(data.error);
        return messageOne.textContent = data.error;
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    })
  })
})

const joinForm = document.getElementById('joinForm');
const joinInput = document.getElementById('joinInput');
const modals = document.getElementsByClassName('modal')
const modalBtns = document.getElementsByClassName('modalBtn')
const closeBtns = document.getElementsByClassName('closeBtn')


for(let i = 0; i < modals.length; i++){
    console.log(modalBtns[i]);
    modalBtns[i].addEventListener('click', ()=>{
        modals[i].style.display = "block"; 
    })
}
for(let i = 0; i < modals.length; i++){
    closeBtns[i].addEventListener('click', ()=>{
        modals[i].style.display = "none";
    })
}

joinForm.addEventListener('submit', (e)=>{
    const joinCode = joinInput.value;
    const payload = {
        Code: joinCode
    };
    console.log(payload)
    e.preventDefault();
    $.ajax({
       method: "post",
       url: "/class/join",
       data: JSON.stringify(payload),
       contentType: "application/json",
       dataType: "json",
       success: function(data){
           location.reload()
       }
      })
   });
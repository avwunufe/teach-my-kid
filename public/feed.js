const postInput = document.getElementById('newPost');
const postForm = document.getElementById('feedForm');
const creatorId = document.getElementById('userId').innerText;
const classId = document.getElementById('classId').innerText;
const commentForm = document.forms;
const commentInput = document.querySelectorAll('feedComment');
const postDataDiv = document.querySelectorAll('postdatadiv');
const fullName = document.getElementById('fullName').innerText;
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


postForm.addEventListener('submit', (e)=>{
 const newFeed = postInput.value;
 const payload = {
     ClassID: classId,
     Body: newFeed,
     Creator: creatorId
 };
 e.preventDefault();
 $.ajax({
    method: "post",
    url: "/class/feed",
    data: JSON.stringify(payload),
    contentType: "application/json",
    dataType: "json",
    success: function(data){
        location.reload()
    }
   })
});
for(let i = 1; i < commentForm.length; i++){
 
    commentForm[i].addEventListener('submit', (e)=>{
        e.preventDefault();
        const newComment = commentForm[i]["comments"].value;
        const payload = {
            Body: newComment,
            FullName: fullName,
            Creator: creatorId
        };
        $.ajax({
           method: "post",
           url: "/class/feed/"+ commentForm[i].parentElement.previousElementSibling.getAttribute("data-postId"),
           data: JSON.stringify(payload),
           contentType: "application/json",
           dataType: "json",
           success: function(data){
               location.reload()
           }
          })
       })
}

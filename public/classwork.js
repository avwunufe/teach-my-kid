const postForm = document.getElementById('createClasswork');
const dateInput = document.getElementById('dateInput');
const subjectInput = document.getElementById('subjectInput');
const topicInput = document.getElementById('topicInput');
const bodyInput = document.getElementById('bodyInput');
const creatorId = document.getElementById('userId').innerText;
const classId = document.getElementById('classId').innerText;
const fullName = document.getElementById('fullName').innerText;
const commentForm = document.forms;
const commentInput = document.querySelectorAll('feedComment');
const postDataDiv = document.querySelectorAll('postdatadiv');
const modals = document.getElementsByClassName('modal')
const modalBtns = document.getElementsByClassName('modalBtn')
const closeBtns = document.getElementsByClassName('closeBtn')
const tabs = document.querySelectorAll("[data-tab-target]")
const tabContents = document.querySelectorAll("[data-tab-content]")

tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent=>{
            tabContent.classList.remove("active")
        })
        target.classList.add("active")
    })
})
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
    const payload = {
        ClassID: classId,
        Date: dateInput.value,
        Subject: subjectInput.value,
        Topic: topicInput.value,
        Body: bodyInput.value
    };
    e.preventDefault();
    $.ajax({
       method: "post",
       url: "/class/classwork",
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
        console.log(fullName)
        const newComment = commentForm[i]["comments"].value;
        const payload = {
            Body: newComment,
            FullName: fullName,
            Creator: creatorId
        };
        $.ajax({
           method: "post",
           url: "/class/classwork/"+ commentForm[i].parentElement.previousElementSibling.getAttribute("data-postId"),
           data: JSON.stringify(payload),
           contentType: "application/json",
           dataType: "json",
           success: function(data){
               location.reload()
           }
          })
       })
}
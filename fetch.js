
//Async/Await

//1.Populate the data from url to table

document.addEventListener('DOMContentLoaded', populateData);
var allUsers = []
async function populateData(){
    let response = await fetch("https://61fe8657a58a4e00173c98a6.mockapi.io/users")
    let data = await response.json();
    allUsers = data;
    var tbody = document.querySelector(".tablebody")
    data.forEach(ele => {
        let tr = document.createElement('tr');
        Object.keys(ele).forEach(key => {
            let td = document.createElement('td');
            if(key === 'courses') {
                let ul = document.createElement('ul');
                ele[key].map(course => {
                    let li = document.createElement('li');
                    li.innerText = course;
                    ul.append(li)
                })
                td.append(ul)
            } else 
                td.innerText = ele[key]
            tr.append(td)
        })
        tr.innerHTML += `<td> <button id="edit-${ele.id}" data-action="edit" data-id="${ele.id}"> Edit </button> &nbsp; 
                        <button id="delete-${ele.id}" data-action="delete" data-id="${ele.id}"> Delete </button> </td>`
        tbody.append(tr);
    })
}



//Form

//name validation
document.querySelector("#name").addEventListener("keydown",function name(e){
    if(!((e.keyCode > 64 && e.keyCode < 91) || e.keyCode == 8 || e.keyCode == 32 ))
    {
        document.querySelectorAll("span")[0].innerText = "Only alphabets are allowed"
    }
    else
    document.querySelectorAll("span")[0].innerText=""
})

//submit event
document.querySelector("#userForm").addEventListener("submit", submitData)
async function submitData(evt){
    evt.preventDefault();
    var body = JSON.stringify({
        name : document.querySelector("#name").value,
        age : document.querySelector("#age").value,
        email : document.querySelector("#email").value,
        courses : document.querySelector("#courses").value.split(',')
    })
    var id = document.querySelector("#id").value;
    
    if(id) {
        // Update 
        var response = await fetch(`https://61fe8657a58a4e00173c98a6.mockapi.io/users/${id}`, {
            method: 'PUT',
            headers : {'Content-Type': 'application/JSON'},
            body: body
        })
        var data = await response.json()
        console.log(data)
    } else {
        // Create
        var response = await fetch("https://61fe8657a58a4e00173c98a6.mockapi.io/users", {
            method: 'POST',
            headers: {'Content-Type': 'application/JSON'},
            body: body
        })
        var data = await response.json()
    }
    
    location.reload()
}

document.querySelector("#userTable").addEventListener("click", function(e) {
    e.preventDefault();
    var selectedData = allUsers.filter(data => data.id === e.target.dataset.id)[0];
    if(e.target.dataset.action === "edit") {
        document.querySelector("#name").value = selectedData.name;
        document.querySelector("#age").value = selectedData.age;
        document.querySelector("#email").value = selectedData.email;
        document.querySelector("#courses").value = selectedData.courses.join(',');
        document.querySelector("#id").value = selectedData.id;
    }
    
 })
//delete
 document.querySelector("#userTable").addEventListener("click",deleteData)
 async function deleteData(e) {
    e.preventDefault();
    let id=e.target.dataset.id;
    var res=await fetch(`https://61fe8657a58a4e00173c98a6.mockapi.io/users/${id}`,{method : 'DELETE'})
            var data=await res.json();
    location.reload()       
 }
 
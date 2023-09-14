


let userdata = []

let objstr = localStorage.getItem('user');

if (objstr === null) {
} else {
    userdata = JSON.parse(objstr);
}

let user = {
    name: null,
    contact: null,
    email: null
}
if(userdata.length > 0){
    userdata = userdata
}

const inputValue = (event) => {
    const { id, value } = event.target;

    switch (id) {
        case "name": user.name = value
            break;
        case "contact": user.contact = value
            break;
        case "email": user.email = value
            break;
    }
}

const hendleTask = () => {

    if (user.name === null) {
        alert('plase enter name');
    } else if (user.conatct === null) {
        alert('plase enter contact number');
    } else if (user.email === null) {
        alert('plase enter contact number');
    } else {
        userdata.push(user);
        adddata(userdata)
        displayData();
    }
    // user.name = null
    // user.contact = null
    // user.email = null
    document.getElementById('name').value = ""
    document.getElementById('contact').value = ""
    document.getElementById('email').value = ""
 
}

// set data in local storag 
const adddata = (userdata) => {
    let str = JSON.stringify(userdata);
    localStorage.setItem('user', str)
}

// delete task 
const deleteTask = (id) => {
    userdata.splice(id, 1)
    displayData()
    adddata(userdata)
}

// let get = localStorage.getItem('user')
// // get = JSON.parse(get)
// // console.log(get);

let toggle = false;
let rowIndex;
const edittask = (id) => {
    toggle = true
    rowIndex = id
    displayData()
}

const cancleEdit = () => {
    toggle = false
    displayData()
}

const details = (event) => {
    const { id, value } = event.target;
    console.log(value);
    switch (id) {
        case "editname": user.name = value
            break;
        case "editcontact": user.contact = value
            break;
        case "editemail": user.email = value
            break;
    }
    console.log(user);
}

const editSave = (id) => {
    // let edit = document.getElementById('edit').value;
    userdata.map((item, index) => {
        if (index === id) {
            item.name = user.name === null ? item.name : user.name;
            item.contact = user.contact === null ? item.contact : user.contact;
            item.email = user.email === null ? item.email : user.email;
        }
        toggle = false
    })
    // document.getElementById('edit').value = ""
    adddata(userdata)
    displayData()
}

// display the data in web page 
let table = document.getElementById('table_body');
const displayData = () => {
    let items = userdata.map((item, index) => {
        return ` <tr>
        <td>${index + 1}</td>
        <td> ${toggle && rowIndex === index ? `<input id='editname' value=${item.name} oninput=details(event) />` : item.name} </td>
        <td class={}> ${toggle && rowIndex === index ? `<input id='editcontact' value=${item.contact} oninput=details(event) />` : item.contact} </td>
        <td> ${toggle && rowIndex === index ? `<input id='editemail' value=${item.email} oninput=details(event) />` : item.email} </td>
        <td > ${toggle === false ? `<i class="fa-solid text-warning me-2 fa-pen-to-square" onclick="edittask(${index})"></i>
        <i  onclick="deleteTask(${index})" class="fa-solid text-danger fa-trash-can "></i>` : `<i onclick="cancleEdit()" class="fa-solid me-2 text-danger fa-xmark"></i>
        <i class="fa-solid text-success fa-circle-check" onclick="editSave(${index})"></i>`}</td>
    </tr>`
    })
    table.innerHTML = items;
    // console.log(table);
    // console.log(items);
}
displayData()

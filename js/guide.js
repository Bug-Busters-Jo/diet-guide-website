"use strict"

let form = document.getElementById('edit-form');
let divEdit = document.getElementById('edit-div');
let isMached;
var userDate;
var ruslt=document.getElementById('ruslt');
var editButton = document.getElementById("edit-botton")
function printResult(){
    window.print();   
}

window.onload = function(){
    userDate = localStorage.getItem('logedUser');
    var table = document.getElementById('table');
    var noAccount = document.getElementById('no-account');
    console.log(table,noAccount,'div');

    if(userDate != null){
        isMached = true;
        table.style.display = 'block'
        divEdit.style.display = 'none';
        noAccount.style.display = 'none';
        userDate = JSON.parse(userDate);
        document.getElementById('waight').textContent = userDate.waigth;
        document.getElementById('height').textContent = userDate.height;
        document.getElementById('name').textContent = userDate.name;
        document.getElementById('email').textContent = userDate.email;
        document.getElementById('mobile').textContent = userDate.mobile;
        document.getElementById('submit-accoumt').style.display = "block";
    }else{
        document.getElementById('submit-accoumt').style.display = "none";
        table.style.display = 'none';
        divEdit.style.display = "none";
        noAccount.style.display = 'block';
        editButton.style.display = "none";
    }
}

function updateTheDate(event){
    divEdit.style.display = 'block';
    document.getElementById('edit-botton').style.display = 'none';
    document.getElementById('waight-input').value = userDate.waigth;
    document.getElementById('height-input').value = userDate.height;
}

form.addEventListener('submit',editData);

function editData(event){
    event.preventDefault();
    if(isMached == false){
        alert('the Password && Repeat Password Are Not Mach');
        return;
    }
    let usersArray = JSON.parse(localStorage.getItem('AllUserArray'));
    for(var i = 0 ;  usersArray.length; i++){
        console.log(usersArray[i])
        if(usersArray[i].name == userDate.name){
            console.log(event.target.waight.value, event.target.height.value);
            userDate.waigth = event.target.waight.value;
            userDate.height = event.target.height.value;
            usersArray[i] = userDate;
            localStorage.setItem("AllUserArray",JSON.stringify(usersArray));
            localStorage.setItem("logedUser",JSON.stringify(userDate));
            document.getElementById('waight').textContent = userDate.waigth;
            document.getElementById('height').textContent = userDate.height;
            document.getElementById('name').textContent = userDate.name;
            document.getElementById('email').textContent = userDate.email;
            document.getElementById('mobile').textContent = userDate.mobile;
            return;
        }
    }
}

function hideForm(){
    divEdit.style.display = 'none';
    document.getElementById('edit-botton').style.display = 'block';
    // document.getElementById('edit-botton').style.margin = 'auto';
}
function repPassword(){
    let password = document.getElementById('psw-input').value;
    let pswRepeat = document.getElementById('psw-repeat-input').value;
    if(password != pswRepeat){
        document.getElementById('erorr-message').style.display = 'block';
        isMached = false;
    }else{
        document.getElementById('erorr-message').style.display = 'none';
        isMached = true;
    }
}

function calcolations(event){
    var BWI;
    var x ;
    var y;
    var underwightExce=document.getElementById('underwightExce');
    var idealwightExce=document.getElementById('idealwightExce');
    var overwightExce=document.getElementById('overwightExce');
    var obsitywightExce=document.getElementById('obsitywightExce');
    var massage;
    underwightExce.style.display="none";
    idealwightExce.style.display="none";
    overwightExce.style.display="none";
    obsitywightExce.style.display="none";






    if (userDate != null){
        x = Number(userDate.height);
        y  =  Number(userDate.waigth);
        console.log(x,y);

    }else{
        x = Number(document.getElementById('input-haight-no-account').value);
        y = Number(document.getElementById('input-weight-no-account').value);
        console.log(x,y);
    }
    BWI = (y / ((x/100)*(x/100))).toFixed(1);

    if(BWI<=18.5){
        var massage="the under-weight"
        console.log(massage)
        underwightExce.style.display="block";
        console.log(massage)

    }
    else if(18.5<=BWI && BWI<=24.9){
        var massage=" ideal weight ";
        console.log(massage)

        idealwightExce.style.display="block";
    }
    else if(25<=BWI && BWI<=29.9){
        var massage=" over-weight ";
       overwightExce.style.display="block";

    }
    else if(30<=BWI){
        var massage=" obesity weight ";
        obsitywightExce.style.display="block";

    }
    console.log(BWI);
    ruslt.textContent='Your result is '+" "+BWI+"."+ " You are in "+" "+ massage +" "+"region."
}

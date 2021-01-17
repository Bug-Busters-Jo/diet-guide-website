let form = document.getElementById('edit-form');
let divEdit = document.getElementById('edit-div');
let isMached;
var userDate;
var ruslt=document.getElementById('ruslt');
window.onload = function(){
    userDate = localStorage.getItem('logedUser');
    var userDiv = document.getElementById('with-account');
    var noAccount = document.getElementById('no-account');
    if(userDate != null){
        isMached = true;
        userDiv.style.display = 'block'
        divEdit.style.display = 'none';
        noAccount.style.display = 'none';
        userDate = JSON.parse(userDate);
        document.getElementById('waight').textContent = userDate.waigth;
        document.getElementById('height').textContent = userDate.height;
        document.getElementById('name').textContent = userDate.name;
        document.getElementById('email').textContent = userDate.email;
        document.getElementById('mobile').textContent = userDate.mobile;
    }else{
        userDiv.style.display = 'none';
        noAccount.style.display = 'block';
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
    document.getElementById('edit-botton').style.margin = 'auto';
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
    if(BWI<18.5){
        var massage="under Wieght"
    }
    if(18.5<BWI<24.9){
        var massage=" ideal weight "
    }
    if(25<BWI<29.9){
        var massage=" over weight "
    }
    if(30<BWI){
        var massage=" obesity weight "
    }
    console.log(BWI);
    ruslt.textContent='your ruslt is '+" "+BWI+" "+ "you are in "+" "+ massage +" "+"region"
}


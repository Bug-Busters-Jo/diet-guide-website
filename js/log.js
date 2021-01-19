
"use strict"

let isLogInPage;
let AllUserArray = [];
var logedUser;
let isMached;

window.onload = function (){
    isLogInPage = false;
    loginPage();
    isMached = true;
    AllUserArray = localStorage.getItem('AllUserArray');
    document.getElementById('erorr-message').style.display = 'none';
    var userDate = localStorage.getItem('logedUser');
    if(AllUserArray === null){
        AllUserArray = []
    }else{
        AllUserArray = JSON.parse(AllUserArray);
    };

    var loginLogout = document.getElementById('login-logout');
    if(userDate != null){
        loginLogout.textContent = `Log Out`
    }else{
        loginLogout.textContent = 'Log In'
    }
}

function loginPage(){
    if (isLogInPage === false){
        document.getElementById("mobile-div").style.display = 'none';
        document.getElementById("psw-repeat-div").style.display = 'none';
        document.getElementById("waight-div").style.display = 'none';
        document.getElementById("height-div").style.display = 'none';
        document.getElementById('email-div').style.display = 'none';
        document.getElementById('logIn-UP').textContent = "Log In";
        document.getElementById('swetch-page').textContent = "Create Account";   
        document.getElementById('submitting').value = "Log In";   
        isLogInPage = true;
    }else{
        document.getElementById("mobile-div").style.display = 'block';
        document.getElementById("psw-repeat-div").style.display = 'block';
        document.getElementById("waight-div").style.display = 'block';
        document.getElementById("height-div").style.display = 'block';
        document.getElementById('email-div').style.display = 'block';
        document.getElementById('logIn-UP').textContent = "Sign Up";
        document.getElementById('swetch-page').textContent = "I have Account"; 
        document.getElementById('submitting').value = "Sign Up";    
   
        isLogInPage = false;
    }
    cleanInput()
};

function signUpPage (){
    document.getElementById("mobile-div").style.display = 'block';
    document.getElementById("psw-repeat-div").style.display = 'block';
    document.getElementById("waight-div").style.display = 'block';
    document.getElementById("height-div").style.display = 'block';
    document.getElementById('email-div').style.display = 'block';
    isLogInPage = false;
    cleanInput();
}

let logForm = document.getElementById('log-form');
logForm.addEventListener('submit',submitForm);

function submitForm(event){
    event.preventDefault();
    if(isMached == false && isLogInPage == false){
        alert('the Password && Repeat Password Are Not Mach');
        return;
    }
    let isExist  = checkIfUserExist(event.target.name.value,event.target.psw.value)
    console.log(isExist,isLogInPage);
    if (isLogInPage == false && isExist){
        alert('This User Is Allready Exist');
    }else if(isExist == false && isLogInPage){
        var isConfirm =  confirm('the Name is Not Exist, do you what to Sign up first');
        if(isConfirm){
            signUpPage ();
        }
    }else if (isLogInPage == false && isExist == false){
        logedUser = new user(event.target.name.value,event.target.email.value ,event.target.psw.value, event.target.waight.value,event.target.mobile.value, event.target.height.value);
        console.log(event.target, logedUser);
        AllUserArray.push(logedUser);
        localStorage.setItem("AllUserArray",JSON.stringify(AllUserArray));
        localStorage.setItem("logedUser",JSON.stringify(logedUser));
        window.location.href='guide.html';
    }

}

function checkIfUserExist(name,pass){
    for(let i = 0; i < AllUserArray.length ; i++){
        if(name == AllUserArray[i].name){
            if(isLogInPage){
                if(pass == AllUserArray[i].password){
                    window.location.href='guide.html';
                    localStorage.setItem("logedUser",JSON.stringify(AllUserArray[i]));
                }else{
                    alert('Wrong Password!');
                }
                return true;
            }
            return true;
        }
    }
    return false;
}

function repPassword(){
    console.log(isLogInPage);
    if(isLogInPage == false){
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
}


function loginLogout(){
    if(userDate == null){
        window.location.href='dataForm.html';
    }else{
        let isConfirm = confirm('Are you sure you want to log out?');
        if(isConfirm){
            localStorage.removeItem('logedUser');
            alert('You are logged out!');
            window.location.href='index.html';
        }
    }
}

function cleanInput(){
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('psw-input').value = '';
    document.getElementById('psw-repeat-input').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('height-input').value = '';
    document.getElementById('mobile-input').value = '';
}
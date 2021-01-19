"use strict"
let user = function(name, email, pass,waigth,mobile, height ){
    this.name = name;
    this.email = email;
    this.password = pass;
    this.waigth = waigth;
    this.mobile =mobile;
    this.height = height;
};


var userDate = localStorage.getItem('logedUser');
window.onload = function(){
    var loginLogout = document.getElementById('login-logout');
    if(userDate != null){
        userDate = JSON.parse(userDate);
        loginLogout.textContent = ` Log Out`
    }else{
        loginLogout.textContent = 'Log In'
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
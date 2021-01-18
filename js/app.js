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
        loginLogout.textContent = `${userDate.name} Log Out`
    }else{
        loginLogout.textContent = 'Log In'
    }
}

function loginLogout(){
    if(userDate == null){
        window.location.href='dataForm.html';
    }else{
        let isConfirm = confirm('Are You Sure');
        if(isConfirm){
            localStorage.removeItem('logedUser');
            alert('Done!');
            window.location.href='index.html';
        }
    }
}
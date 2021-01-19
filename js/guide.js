"use strict"

let form = document.getElementById('edit-form');
let divEdit = document.getElementById('edit-div');
let isMached;
var userDate;
var ruslt = document.getElementById('ruslt');
var rusltID = '';
var editButton = document.getElementById("edit-botton")
function printResult() {
    window.print();
}



function demoFromHTML() {

    if (rusltID == '') {
        alert('No Result');
        return;
    }
    var pdf = new jsPDF({
        unit: 'pt'
    });

    var source = $(`#${rusltID}`).clone(true);
    source.find("img").css("width", "200px");
    source.css('float','left');
    source.find('p').css('float','left');
    source.find('h1').css('float','left');
    source.find('div').css('float','left');
    source.find('h2').css('float','left');
    source.find('ul').css('float','left');

    source = source.html();
    var specialElementHandlers = {
        '#elementH': function (element, renderer) {
            return true;
        }
    };
    pdf.fromHTML(
        source,
        15,
        15, {
        'width': 550,
        'elementHandlers': specialElementHandlers
    },

        function (dispose) {
            pdf.save('result.pdf');
        }
    );
}
window.onload = function () {
    userDate = localStorage.getItem('logedUser');
    var table = document.getElementById('table');
    var noAccount = document.getElementById('no-account');
    console.log(table, noAccount, 'div');
    var loginLogout = document.getElementById('login-logout');

    if (userDate != null) {
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
        loginLogout.textContent = ` Log Out`
    } else {
        document.getElementById('submit-accoumt').style.display = "none";
        table.style.display = 'none';
        divEdit.style.display = "none";
        noAccount.style.display = 'block';
        editButton.style.display = "none";
        loginLogout.textContent = 'Log In'
    }
}

function updateTheDate(event) {
    divEdit.style.display = 'block';
    document.getElementById('edit-botton').style.display = 'none';
    document.getElementById('waight-input').value = userDate.waigth;
    document.getElementById('height-input').value = userDate.height;
}

form.addEventListener('submit', editData);

function editData(event) {
    event.preventDefault();
    if (isMached == false) {
        alert('the Password && Repeat Password Are Not Mach');
        return;
    }
    let usersArray = JSON.parse(localStorage.getItem('AllUserArray'));
    for (var i = 0; usersArray.length; i++) {
        console.log(usersArray[i])
        if (usersArray[i].name == userDate.name) {
            console.log(event.target.waight.value, event.target.height.value);
            userDate.waigth = event.target.waight.value;
            userDate.height = event.target.height.value;
            usersArray[i] = userDate;
            localStorage.setItem("AllUserArray", JSON.stringify(usersArray));
            localStorage.setItem("logedUser", JSON.stringify(userDate));
            document.getElementById('waight').textContent = userDate.waigth;
            document.getElementById('height').textContent = userDate.height;
            document.getElementById('name').textContent = userDate.name;
            document.getElementById('email').textContent = userDate.email;
            document.getElementById('mobile').textContent = userDate.mobile;
            return;
        }
    }
}

function hideForm() {
    divEdit.style.display = 'none';
    document.getElementById('edit-botton').style.display = 'block';
    // document.getElementById('edit-botton').style.margin = 'auto';
}
function repPassword() {
    let password = document.getElementById('psw-input').value;
    let pswRepeat = document.getElementById('psw-repeat-input').value;
    if (password != pswRepeat) {
        document.getElementById('erorr-message').style.display = 'block';
        isMached = false;
    } else {
        document.getElementById('erorr-message').style.display = 'none';
        isMached = true;
    }
}

function calcolations(event) {
    var BWI;
    var x;
    var y;
    var underwightExce = document.getElementById('underwightExce');
    var idealwightExce = document.getElementById('idealwightExce');
    var overwightExce = document.getElementById('overwightExce');
    var obsitywightExce = document.getElementById('obsitywightExce');
    var massage;
    underwightExce.style.display = "none";
    idealwightExce.style.display = "none";
    overwightExce.style.display = "none";
    obsitywightExce.style.display = "none";

    if (userDate != null) {
        x = Number(userDate.height);
        y = Number(userDate.waigth);
        console.log(x, y);

    } else {
        x = Number(document.getElementById('input-haight-no-account').value);
        y = Number(document.getElementById('input-weight-no-account').value);
        if (x == '' || y == '') {
            alert('Enter The Required Fields');
            return;
        }
    }
    BWI = (y / ((x / 100) * (x / 100))).toFixed(1);

    if (BWI <= 18.5) {
        var massage = "the under-weight"
        console.log(massage)
        rusltID = 'underwightExce';
        underwightExce.style.display = "block";
        console.log(massage)

    }
    else if (18.5 <= BWI && BWI <= 24.9) {
        var massage = " ideal weight ";
        console.log(massage)
        rusltID = 'idealwightExce';
        idealwightExce.style.display = "block";
    }
    else if (25 <= BWI && BWI <= 29.9) {
        var massage = " over-weight ";
        overwightExce.style.display = "block";
        rusltID = 'overwightExce';
    }
    else if (30 <= BWI) {
        var massage = " obesity weight ";
        obsitywightExce.style.display = "block";
        rusltID = 'obsitywightExce';
    }
    window.location.href = '#the-results';
    ruslt.textContent = 'Your result is ' + " " + BWI + "." + " You are in " + " " + massage + " " + "region."
}


function loginLogout() {
    if (userDate == null) {
        window.location.href = 'dataForm.html';
    } else {
        let isConfirm = confirm('Are you sure you want to log out?');
        if (isConfirm) {
            localStorage.removeItem('logedUser');
            alert('You are logged out!');
            window.location.href = 'index.html';
        }
    }
}
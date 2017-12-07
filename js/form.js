'use strict';

var jobRole = document.getElementById('title');
var activities = document.querySelector(".activities");
const nameField = document.querySelector('#name');
const emailLabel = document.querySelector('.email');
const emailField = document.querySelector('#mail');
const activityError = document.querySelector('.selectError');
const paymentMenu = document.getElementById("payment");
const ccDiv = document.querySelector('.credit-card');
const ccNumField = document.querySelector('#cc-num');
const zipField = document.querySelector('#zip');
const cvvField = document.querySelector('#cvv');
const paypalDiv = document.querySelector('.paypal');
const bitcoinDiv = document.querySelector('.bitcoin');
const submit = document.querySelector('button');
const designMenu = document.querySelector('select[name="user_design"]');
const colorDiv = document.querySelector('#colors-js-puns');
const colorMenu = document.querySelector('select[id="color"]');
const colors = colorMenu.children;
var locEmail = document.querySelector('.email')

document.getElementById("name").focus();

document.getElementById("title").addEventListener("change", function(){
	var basicSection = document.querySelector('.basic');
	var jobSelected = jobRole.value;

	if(jobSelected === 'other' ) {
		var otherText = document.createElement('input');
		// Add an text input field. Use the id of "other-title"
		otherText.setAttribute('id', 'other-job');
		otherText.setAttribute('type', 'text');
		otherText.setAttribute('name', 'other_text');
		otherText.setAttribute('placeholder', 'Your Job Role');

		basicSection.appendChild(otherText);
	}

	if(jobSelected !== 'other'){
		if(document.getElementById("other-job")) {
			basicSection.removeChild(document.getElementById("other-title"));
		}
	}
});

colorDiv.style.display = 'none';
designMenu.addEventListener('change', (event) => {
    colorDiv.style.display = '';
    if (event.target.value === 'js puns') {
        for (let i = 0; i < colors.length; i++) {
            if (colors[i].className === 'puns') {
                colors[0].selected = true;
                colors[i].style.display = '';
            } else {
                colors[i].style.display = 'none';
            }
        }
    } else if (event.target.value === 'heart js') {
        for (let i = 0; i < colors.length; i++) {
            if (colors[i].className === 'heartJS') {
                colors[3].selected = true;
                colors[i].style.display = '';
            } else {
                colors[i].style.display = 'none';
            }
        }
    } else {
        colorDiv.style.display = 'none';
    }
});

document.getElementById("design").addEventListener("change", function(){
	var teeShirtMenu = document.getElementById('design');
	var teeSelection = teeShirtMenu.value;
	var colorSelection = document.getElementById('colors-js-puns');


	if(teeSelection) {
		colorSelection.innerHTML = "";

	}
	if(teeSelection === "js puns") {
		// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
		colorSelection.innerHTML = '<label for="color">Color:</label><select id="color"><option value="cornflowerblue">Cornflower Blue</option><option value="darkslategrey">Dark Slate Grey</option><option value="gold">Gold</option></select>';
		//tColor.innerHTML = "<option value='cornflowerblue'>Cornflower Blue</option><option value='darkslategrey'>Dark Slate Grey</option><option value='gold'>Gold</option>";

	}
	if(teeSelection === "heart js") {
		// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
		colorSelection.innerHTML = '<label for="color">Color:</label><select id="color"><option value="tomato">Tomato</option><option value="steelblue">Steel Blue</option><option value="dimgrey">Dim Grey</option></select>';

	}
});

// Register for Activities section of the form.
document.querySelector(".activities").addEventListener("change", function(){
	var main = document.getElementById("all");
	var framework = document.getElementById("framework");
	var libs = document.getElementById("libs");
	var express = document.getElementById("express");
	var node = document.getElementById("node");
	var build = document.getElementById("build");
	var npm = document.getElementById("npm");

	var frameworkLbl = document.getElementById("frameworkLabel");
	var libsLbl = document.getElementById("libsLabel");
	var expressLbl = document.getElementById("expressLabel");
	var nodeLbl = document.getElementById("nodeLabel");


	// If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
	if(framework.checked == true) {
		express.disabled = true;
		expressLbl.style.color = "grey";
	}
	if(express.checked == true) {
		framework.disabled=  true;
		frameworkLbl.style.color = "grey";
	}
	if(libs.checked == true) {
		node.disabled = true;
		nodeLbl.style.color = "grey";
	}
	if(node.checked == true) {
		libs.disabled = true;
		libsLbl.style.color = "grey";
	}

	// When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
	if(framework.checked == false) {
		express.disabled = false;
		expressLbl.style.color = "black";
	}
	if(express.checked == false) {
		framework.disabled = false;
		frameworkLbl.style.color = "black";
	}
	if(libs.checked == false) {
		node.disabled = false;
		nodeLbl.style.color = "black";
	}
	if(node.checked == false) {
		libs.disabled = false;
		libsLbl.style.color = "black";
	}

	// Calculate running total of price of events selected
	var mainPrice = 200;
	var workshopPrice = 100;
	var totalPrice = 0;

	if(main.checked == true){
		totalPrice += mainPrice;
	}
	if(framework.checked == true || express.checked == true) {
		totalPrice += workshopPrice;
	}
	if(libs.checked == true || node.checked == true) {
		totalPrice += workshopPrice;
	}
	if(build.checked == true) {
		totalPrice += workshopPrice;
	}
	if(npm.checked == true) {
		totalPrice += workshopPrice;
	}

	var totalNumber = totalPrice.toString();
	var totalText = "Total is $" + totalNumber;
	document.getElementById('total').innerHTML = totalText;

	if(totalPrice == 0){
		document.getElementById('total').innerHTML = "";
	}
});

function defaultPayment() {
    const choices = paymentMenu.children;
    choices[1].selected = true;
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
}

defaultPayment();
document.getElementById("payment options").addEventListener("change", () => {
	const pay = event.target;
	// "Credit Card" payment option isselected by default so display of the #credit-card div...
	// hide the "Paypal" and "Bitcoin information.
	if(pay.value === "credit card") {
		ccDiv.style.display = '';
		paypalDiv.style.display = "none";
		bitcoinDiv.style.display = "none";
	} else if(pay.value === "paypal") {
		// If user selects the "PayPal" payment option, display the Paypal information, and hide the credit card + Bitcoin
		ccDiv.style.display = 'none';
		paypalDiv.style.display = "";
		bitcoinDiv.style.display = "none";
	} else if(pay.value === "bitcoin") {
		/// If user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card + paypal.
		ccDiv.style.display = 'none';
		paypalDiv.style.display = "none";
		bitcoinDiv.style.display = "";
	}

	submit.addEventListener('click', (e) => {
		const ccNum = ccNumField.value;
    	const zip = zipField.value;
    	const cvv = cvvField.value;
		if (pay.value === "credit card" && isNaN(ccNum) || ccNum.length < 13 || ccNum.length > 16) {
	        ccNumField.className = 'error';
	        e.preventDefault();
	    } else {
			ccNumField.className = '';
	    }
	    if (pay.value === "credit card" && isNaN(zip) || zip.length !== 5) {
	        e.preventDefault();
	        zipField.className = 'error';
	    } else {
	        zipField.className = '';
	    }
	    if (pay.value === "credit card" && isNaN(cvv) || cvv.length !== 3) {
	        e.preventDefault();
	        cvvField.className = 'error';
	    } else {
	        cvvField.className = '';
	    }

	});
});

//  When form is submitted, field values are checked
//  and error messages or indications are presented
submit.addEventListener('click', (e) => {
    const name = nameField.value;
    var nameLabel = document.getElementById("nameLabel");
    const email = emailField.value;

    if (name === '') {
        nameField.className = 'error';
        e.preventDefault();
    } else {
        nameField.className = '';
    }
    if (email === '') {
        emailField.className = 'error';
        nameLabel.innerHTML = "Name: (please provide name)";
        e.preventDefault();
    } else {
    	emailField.className = '';
    }

    var activities = document.getElementsByClassName("activity");
    var counter = 0;
    var activityReminder = document.getElementById("activityReminder");
    var lineBreak = document.getElementById("lineBreak");

    for(var i = 0; i < activities.length; i++){
    	if(activities[i].checked === true) {
    		counter++;
    	}
    }

    if(counter < 1){
    	activityReminder.innerHTML = "Please select an Activity";
    	activityReminder.style.color = "red";
    	lineBreak.innerHTML = "<br>";
    	e.preventDefault();
    } if(counter >= 1){
    	activityReminder.innerHTML = "";
    	lineBreak.innerHTML = "";
    }
});

emailField.addEventListener('keyup', () => {
    const email = emailField.value;
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        emailField.style.background = 'red';
        errorMessage(emailLabel, ' Invalid Email Format');

    } else {
        emailField.style.background = '';
        removeError(emailLabel);
    }
});

//  Functions to add and remove custom error messages
function errorMessage(location, message) {
    const msgSpan = document.createElement('span');
    if (locEmail.firstElementChild) {
        locEmail.firstElementChild.remove();
    }
    msgSpan.className = 'errorMsg';
    msgSpan.innerText = message;
    locEmail.appendChild(msgSpan);
}

function removeError(location) {
    if (locEmail.firstElementChild) {
        locEmail.firstElementChild.remove();
    }
}

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

document.getElementById("payment options").addEventListener("change", function(){
	var paymentOption = document.getElementById('payment');
	var paymentSelection = paymentOption.value;
	var container = document.getElementById('payment-container');

	// "Credit Card" payment option isselected by default so display of the #credit-card div...
	// hide the "Paypal" and "Bitcoin information.
	if(paymentSelection === "credit card") {
		container.innerHTML = '<div id="credit-card" class="credit-card"><div class="col-6 col"><label for="cc-num" id="cc-numLbl">Card Number:</label><input id="cc-num" name="user_cc-num" type="text"></div><div class="col-3 col"><label for="zip" id="zipLbl">Zip Code:</label><input id="zip" name="user_zip" type="text"></div><div class="col-3 col"><label for="cvv" id="cvvLbl">CVV:</label><input id="cvv" name="user_cvv" type="text"></div><label>Expiration Date:</label><select id="exp-month" name="user_exp-month"><option value="1">1 - January</option><option value="2">2 - February</option><option value="3">3 - March</option><option value="4">4 - April</option><option value="5">5 - May</option><option value="6">6 - June</option><option value="7">7 - July</option><option value="8">8 - August</option><option value="9">9 - September</option><option value="10">10 - October</option><option value="11">11 - November</option><option value="12">12 - December</option></select><select id="exp-year" name="user_exp-year"><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option></select></div>';

	} else if(paymentSelection === "paypal") {
		// If user selects the "PayPal" payment option, display the Paypal information, and hide the credit card + Bitcoin
		container.innerHTML =  "<div><p>If you selected the PayPal option we'll take you to Paypal's site to set up your billing information, when you click 'Register' below.</p></div>";

	} else if(paymentSelection === "bitcoin") {
		/// If user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card + paypal.
		container.innerHTML = "<div><p>If you selected the Bitcoin option we'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final.</p></div>";
	}
});

//  When form is submitted, field values are checked
//  and error messages or indications are presented
submit.addEventListener('click', (e) => {
    const name = nameField.value;
    var nameLabel = document.getElementById("nameLabel");
    const email = emailField.value;
    const ccNum = ccNumField.value;
    const zip = zipField.value;
    const cvv = cvvField.value;
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
    if (isNaN(ccNum) || ccNum.length < 13 || ccNum.length > 16) {
        ccNumField.className = 'error';
        e.preventDefault();
    } else {
		ccNumField.className = '';
    }
    if (isNaN(zip) || zip.length !== 5) {
        e.preventDefault();
        zipField.className = 'error';
    } else {
        zipField.className = '';
    }
    if (isNaN(cvv) || cvv.length !== 3) {
        e.preventDefault();
        cvvField.className = 'error';
    } else {
        cvvField.className = '';

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
    if (location.firstElementChild) {
        location.firstElementChild.remove();
    }
    msgSpan.className = 'errorMsg';
    msgSpan.innerText = message;
    location.appendChild(msgSpan);
}

function removeError(location) {
    if (location.firstElementChild) {
        location.firstElementChild.remove();
    }
}

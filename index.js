firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("signup_div").style.display = "none";
    document.getElementById("user_div").style.display = "none";
	document.getElementById("pass_reset_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}

function signup(){
  var userEmail = document.getElementById("email_field2").value;
  var userPass = document.getElementById("password_field2").value;
  var userPass_confirm = document.getElementById("password_confirm_field").value;
  if(userEmail != ""){
	  if(userPass == userPass_confirm){
		  if(userPass_confirm.length > 6){
			  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass_confirm)
			  .then((userCredential) => {
				  
				  //signed in
				 //const user = userCredential.user;
				 firebase.auth().currentUser.sendEmailVerification()
				  .then(() => {
					window.alert("Email verification sent!");
				  });
			  })
			  .catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				
				window.alert("Error : " + errorMessage);
			  });
		  }
		  else{
			  window.alert("Error : Passwords must be 6 characters or longer!");
		  }
	  }
	  else{
		  window.alert("Error : Passwords don't match!");
	  }
  }
  else{
	  window.alert("Error : Email is empty!");
  }
}

function reset_pass(){
	var userEmail = document.getElementById("email_field3").value;
	firebase.auth().sendPasswordResetEmail(userEmail)
		.then(() => {
			window.alert("Password reset email sent!");
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		// ..
	});
}

function switch_signup(){
    document.getElementById("signup_div").style.display = "block";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("pass_reset_div").style.display = "none";
}
function switch_login(){
    document.getElementById("signup_div").style.display = "none";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
	document.getElementById("pass_reset_div").style.display = "none";
}
function switch_pass_reset(){
    document.getElementById("signup_div").style.display = "none";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("pass_reset_div").style.display = "block";
}

function logout(){
  firebase.auth().signOut();
}

let  emailArray = [];
let passwordArray = [];

let signupForm = document.getElementById("signupForm");
function signup (){
    event.preventDefault();

    let email = document.getElementById("email");
    let password = document.getElementsByClassName("password");
    let confirmPassword = document.getElementsByClassName("password");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");

    if (firstName == "" || lastName == ""){
        alert ("First and last Name is required.");
        return ;
    }
    if (email == ""){
        alert("Email required.");
        return ;
    }
    else if (password == ""){
        alert("Password required.");
        return ;
    }
    else if (confirmPassword == ""){
        alert("Password required.");
        return ;
    }
    else if (password.length < 8){
          alert('Password must be at least 8 characters long');
          return ;
    }
    else if ( password != confirmPassword ){
        alert("Password don't match retype your Password.");
        return;
    }
    else if(emailArray.indexOf(email) == -1){
        emailArray.push(email);
        passwordArray.push(password);

        // alert(email + "  Thanks for registration. \nTry to login Now");
        alert(`${email} Thanks for registration. \nTry to login Now.`);
        document.getElementById("email").value ="";
        document.getElementsByClassName("password").value="";
        document.getElementsByClassName("password").value="";
    }
    else{
        // alert(email + " is already register.");
        alert(`${email} is already register.`);
        return ;
    }
}

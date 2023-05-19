
var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passhash = CryptoJS.SHA256(password);
    if (email == "Formget" && passhash == "97dee97560699a639f3cf55c464855eefe97ae97493b242fe01ecdbab39ea463") {
        console.log(password);
        console.log("hash: "+passhash);
        alert("Login successfully");
        //window.location = "index.html"; // Redirecting to other page.
        return false;
    }
    else {
        attempt--;// Decrementing by one.
        alert("You have left " + attempt + " attempt;");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("email").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}
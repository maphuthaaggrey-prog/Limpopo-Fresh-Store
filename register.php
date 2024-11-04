<?php

//MAPHUTHA AC - SERVER SIDE - PHP

$host="localhost";
$user="root";
$pass="";
$db="test";

$conn=new mysqli($host, $user, $pass, $db);

if($conn->connect_error) {
    echo 'Failed to connect to DB' .$conn->connect_error;
}

echo '<style>

* {
    font-family: Open Sans;
    text-align: center;
.container {
display: grid;
justify-content: center;
margin: 5em auto;
width: 500px;
height: 240px;
background-color: #71b610;;
border-radius: 10px;
    }
.container h1 {
font-family: Open sans, sans-serif;
color: white;
    }

button {
box-shadow: 3px 9px 15px rgba(0, 0, 0, .2);
cursor: pointer;
font-weight: 600;
border-radius: 10px;
border: none;
height: 30px;
width: 100px;
align-items: center;
justify-content: center;
}
button:hover {
opacity: 84%;
}
.container p {
font-size: 16px;
color: white;
    }
</style>';




if(isset($_POST['signUp'])) {
    $name=$_POST['name'];
    $email=$_POST['email-address'];
    $password=$_POST['password'];
    $province=$_POST['province'];
    $street=$_POST['street'];
    $confirmPassword=$_POST['confirm-password'];
    $password=md5($password);

    $checkEmail = "SELECT * From users WHERE email ='$email'";
    $result = $conn->query($checkEmail);
    if($result->num_rows>0) {
        echo 'Email Address Already Exists !';
    }
    else {
        $insertQuery="INSERT INTO users(name,email,password,province,street)
        VALUES ('$name','$email','$password','$province','$street')";
         
         if($conn->query($insertQuery)===TRUE) {

           
            echo "<div class='container'>
                <h1>Welcome, " .$name. " !</h1>
                <p>Thank you for registering. We are glad to have you!</p>
                <a href='index.html'><button>Go Home</button></a>
                </div>"
                ;
         }
         else{

            echo "<p>Registration Failed !</p>"
             .$conn->error;
         }
    }
}

if(isset($_POST['login'])) {
    $email = $_POST['email-address'];
    $password = $_POST['password'];
    $password = md5($password);

    $sql = "SELECT * FROM users WHERE email='$email' and password = '$password'";
    $result = $conn->query($sql);
    if($result->num_rows > 0) {
        echo "<div class='container'>
                <h1>Welcome Back, " .$name. " !</h1>
                 <a href='index.html'><button>Go Home</button></a>
              </div>";
    }
    else {
        echo "<div class='container'>
                <p>Invalid Email or Password</p>
                <a href='loginPage.html'><button>Re-enter</button></a>
            </div>";
    }

}

?>
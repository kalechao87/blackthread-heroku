<?php

require( "./sendgrid-/sendgrid-php.php" );

/* Set e-mail recipient */
$myemail  = "looeee@gmail.com";

/* Check all form inputs using check_input function */
$name = check_input($_POST['name'], "Please enter your name");
$email    = check_input($_POST['email']);
$message  = check_input($_POST['message'], "No message entered");
$subject = "Black Thread Message";
$mailheader = "From: $email \r\n";


/* Let's prepare the message for the e-mail */
$emailContent = "Black Thread Message

Name: $name
E-mail: $email
Message: $message

";

$request_body = json_decode('{
  "personalizations": [
    {
      "to": [
        {
          "email": $myemail
        }
      ],
      "subject": "Hello World from the SendGrid PHP Library!"
    }
  ],
  "from": {
    "email": $myemail
  },
  "content": [
    {
      "type": "text/plain",
      "value": "Hello, Email!"
    }
  ]
}');

$apiKey = getenv('SENDGRID_API_KEY');
$sg = new \SendGrid($apiKey);

$response = $sg->client->mail()->send()->post($request_body);
echo $response->statusCode();
echo $response->body();
echo $response->headers();

?>

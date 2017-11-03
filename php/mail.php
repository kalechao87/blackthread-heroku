<?php

require( "./sendgrid/sendgrid-php.php" );

/* Set e-mail recipient */
$myemail  = "looeee@gmail.com";

/* Check all form inputs using check_input function */
$name = check_input($_POST['name'], "Please enter your name");
$email    = check_input($_POST['email']);
$message  = check_input($_POST['message'], "No message entered");
$subject = check_input($_POST['subject'], "No subject entered");
$mailheader = "From: $email \r\n";

function check_input($data, $problem='')
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    if ($problem && strlen($data) == 0)
    {
        show_error($problem);
    }
    return $data;
}

function show_error($myError)
{
?>
    <html>
    <body>

    <b>Please correct the following error:</b><br />
    <?php echo $myError; ?>

    </body>
    </html>
<?php
exit();
}

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
          "email": "looeee@gmail.com"
        }
      ],
      "subject": "$subject"
    }
  ],
  "from": {
    "email": "looeee@gmail.com"
  },
  "content": [
    {
      "type": "text/plain",
      "value": "$emailContent"
    }
  ]
}');

$apiKey = getenv('SENDGRID_API_KEY');
$sg = new \SendGrid($apiKey);

$response = $sg->client->mail()->send()->post($request_body);
echo $response->statusCode();
echo $response->body();
echo $response->headers();

/* Redirect visitor to the thank you page */
header('Location: /thanks');
exit();

?>

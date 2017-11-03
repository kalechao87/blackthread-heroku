<?php

require( "./sendgrid/sendgrid-php.php" );

$myemail  = "looeee@gmail.com";

/* Check all form inputs using check_input function */
$name = check_input($_POST['name'], "Please enter your name");
$email    = check_input($_POST['email']);
$message  = check_input($_POST['message'], "No message entered");
$subject = check_input($_POST['subject'], "No subject entered");

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

$emailContent = "Subject: $subject\n\nName: $name\nE-mail: $email\nMessage: $message\n";

$request_body = json_decode('{
  "personalizations": [
    {
      "to": [
        {
          "email": "looeee@gmail.com"
        }
      ],
      "subject": "Black Thread Message."
    }
  ],
  "from": {
    "email": "looeee@gmail.com"
  },
  "content": [
    {
      "type": "text/plain",
      "value": "Testing"
    }
  ]
}');

$apiKey = getenv('SENDGRID_API_KEY');
$sg = new \SendGrid($apiKey);

$response = $sg->client->mail()->send()->post($request_body);
echo $response->statusCode();
echo $response->body();
echo $response->headers();

// redirect to thank you page
header('Location: /thanks');
exit();

?>

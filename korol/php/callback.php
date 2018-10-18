<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Форма обратной связи</title>
<meta http-equiv="Refresh" content="2; URL=http://korol.dp.ua/"> 
<style type="text/css">
	.good{
		text-align: center;
		font-size: 3rem;
		margin: auto 0;
		width: 100%;
		height: 100%;
		background-color: #ceffe4;
	}
	.bad{
		text-align: center;
		font-size: 3rem;
		margin: auto 0;
		width: 100%;
		height: 100%;
		background-color: #ffcece;
	}
</style>
</head>
<body>

<?php 

$sendto   = "info@korol.dp.ua"; // почта, на которую будет приходить письмо
$username = $_POST['name'];   // сохраняем в переменную данные полученные из поля c именем
$usertel = $_POST['tel']; // сохраняем в переменную данные полученные из поля c телефонным номером

// Формирование заголовка письма
// $headers  = "From: " . strip_tags($usermail) . "\r\n";
$subject  = "Заявка на обратный звонок";
// $headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Cообщение с сайта</h2>\r\n";
$msg .= "<p><strong>От кого:  </strong> ".$username."</p>\r\n";
$msg .= "<p><strong>Телефон:  </strong> ".$usertel."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	echo "<h1 class=good>Спасибо, мы свяжемся с вами в ближайшее время</h1>";
} else {
	echo "<center><h1 class=bad>К сожалению, что-то пошло не так. Пожалуйста, попробуйте заново.</h2></center>";
}

?>

</body>
</html>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Форма обратной связи</title>
<meta http-equiv="Refresh" content="2; URL=http://elfic.dp.ua/"> 
<style type="text/css">
	.good{
		text-align: center;
		vertical-align: center;
		font-size: 3rem;
		margin: auto 0;
		width: 100%;
		height: 100vh;
		background-color: #ceffe4;
	}
	.bad{
		text-align: center;
		vertical-align: center;
		font-size: 3rem;
		margin: auto 0;
		width: 100%;
		height: 100vh;
		background-color: #ffcece;
	}
</style>
</head>
<body>

<?php 

$sendto   = "dr.kotoffskiy@gmail.com"; // почта, на которую будет приходить письмо
$reason = $_POST['reason'];   // сохраняем в переменную данные полученные из поля c именем
$animal = $_POST['animal'];
$date = $_POST['date'];
$time = $_POST['time'];
$tel = $_POST['tel']; // сохраняем в переменную данные полученные из поля c телефонным номером
// $useryear = $_POST['year']; // сохраняем в переменную данные полученные из поля c возрастом
// $usermail = $_POST['email']; // сохраняем в переменную данные полученные из поля c адресом электронной почты

// Формирование заголовка письма
// $headers  = "From: " . strip_tags($usermail) . "\r\n";
$subject  = "Запись на приём";
// $headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Cообщение с сайта</h2>\r\n";
$msg .= "<p><strong>Причина обращения:   </strong> ".$reason."</p>\r\n";
$msg .= "<p><strong>Животное:   </strong> ".$animal."</p>\r\n";
$msg .= "<p><strong>Дата приёма:  </strong> ".$date."</p>\r\n";
$msg .= "<p><strong>Время приёма:  </strong> ".$time."</p>\r\n";
$msg .= "<p><strong>Телефон:  </strong> ".$tel."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	echo "<h1 class=good>Мы внесем вас в журнал посещений</h1>";
} else {
	echo "<center><h1 class=bad>К сожалению, что-то пошло не так. Пожалуйста, попробуйте заново.</h2></center>";
}

?>

</body>
</html>
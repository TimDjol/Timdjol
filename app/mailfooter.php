<?php

$recepient = "info@timdjol.com";
$sitename = "Tim Djol";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$sms = trim($_POST["sms"]);
$message = "Имя: $name \nEmail: $email \nSms: $sms";

$pagetitle = "Новая заявка с сайта \"$sitename\" footer";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
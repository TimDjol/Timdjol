<?php

$recepient = "info@timdjol.com";
$sitename = "Tim Djol";

$namesite = trim($_POST["admin-data"]);
$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$message = "Тип сайта: $namesite \nИмя: $name \nТелефон: $phone";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
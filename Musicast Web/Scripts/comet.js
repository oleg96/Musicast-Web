var clientGuid

$(document).ready(function () {
    // Подключаемся после загрузки страницы, запускаем первый long polling
    Connect();
});

$(window).unload(function () {
    // При выгрузке страницы - запрашиваем сервер об отключении клиента для экономии ресурсов
    Disconnect();
});

// Посылает lonp poll - запрос серверу
function SendRequest() {
    var url = './comet.ashx?guid=' + clientGuid;
    $.ajax({
        type: "POST",
        url: url,
        // Если запрос завершился успехом, значит сервер сообщил о новых событиях
        // обрабатываем их
        success: ProcessResponse,
        // При ошибке (например таймауте), снова рекурсивно посылаем запрос
        // обеспечивая тем самым непрерывный процесс прослушки серверных событий
        error: SendRequest
    });
}

// Регистрируемся на сервере
function Connect() {
    var url = './comet.ashx?cmd=register';
    $.ajax({
        type: "POST",
        url: url,
        success: OnConnected,
        error: ConnectionRefused
    });
}

// Разрегистрируемся на сервере
function Disconnect() {
    var url = './comet.ashx?cmd=unregister';
    $.ajax({
        type: "POST",
        url: url
    });
}

// Обработка сообщений, принятых с сервера
function ProcessResponse(transport) {
    eval('var d=' + transport + ';');
    document.getElementById("content").innerHTML += ' <strong>' + d.user + '</strong> : "' + d.message + '"<br/>';
    // После отображения результатов запроса - снова циклично делаем запрос.
    SendRequest();
}

// После регистрации на сервере сохраняем наш guid и посылаем первый long poll запрос на сервер 
function OnConnected(transport) {
    clientGuid = transport;
    SendRequest();
}

// Если подключиться не удалось, то ждем три мекунды и опять пробуем подключиться
function ConnectionRefused() {
    $("#content").html("не удалось подключиться к серверу. Попробуем через 3 секунды...");
    setTimeout(Connect(), 3000);
}

// Отправка сообщения на сервер
function clickSendMessage() {
    var userName = document.getElementById("userName").value;
    var message = document.getElementById("message").value;
    var url = './comet.ashx?cmd=send&message=' + message + '&user=' + userName;
    $.ajax({
        type: "POST",
        url: url
    });

}
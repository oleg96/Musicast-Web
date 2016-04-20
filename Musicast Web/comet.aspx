<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeFile="comet.aspx.cs" Inherits="CometChat" %>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script src="Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="Scripts/comet.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1">
    <h2> Тестовый веб-чат. </h2>
    <div id="content" style="overflow: auto; width: 600px; height: 300px; background-color: #EEE"></div><br />
    Ваше имя: <input type="text" id="userName" />
    Сообщение: <input type="text" id="message" />
    <input type="button" onclick="clickSendMessage()" value="Послать"/>
    </form>
</body>
</html>
    </asp:Content>

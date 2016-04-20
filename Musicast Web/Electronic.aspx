<%@ Page Title="Электронный синтезатор" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Electronic.aspx.cs"  Inherits="Musicast_Web.Electronic" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <iframe id="ifrmID" src="index.htm" width="100%" style="height: 601px" frameborder=no></iframe>
    <script type="text/javascript">
        function simulateKeyEvent(character) {
            var evt = document.createEvent("KeyboardEvent");
            (evt.initKeyEvent || evt.initKeyboardEvent)("keypress", true, true, window,
                              0, 0, 0, 0,
                              0, character.charCodeAt(0))
            var canceled = !body.dispatchEvent(evt);
            if (canceled) {
                // A handler called preventDefault
                alert("canceled");
            } else {
                // None of the handlers called preventDefault
                alert("not canceled");
            }
        }
    </script>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <asp:Button ID="Button1" runat="server" OnClientClick="simulateKeyEvent(a);" Text="Button" />
        </ContentTemplate>
    </asp:UpdatePanel>
    </asp:Content>
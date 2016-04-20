<%@ Page Title="Синтезаторы" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Synthesizers.aspx.cs" Inherits="Musicast_Web.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Image ID="Image1" runat="server" Height="198px" ImageUrl="~/synth.jpg" Width="300px" />
    <asp:Button ID="Button1" runat="server" BorderColor="Black" BorderStyle="Solid" Height="54px" Text="Электронный синтезатор" Width="308px" PostBackUrl="~/Electronic.aspx" />
</asp:Content>

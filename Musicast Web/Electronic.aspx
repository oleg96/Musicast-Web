<%@ Page Title="Электронный синтезатор" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Electronic.aspx.cs"  Inherits="Musicast_Web.Electronic" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <body>
    <iframe id="ifrmSynth" src="index.htm" width="100%" style="height: 601px" frameborder=no></iframe>
    <iframe id="ifrmDrum" src="drum.html" style="height: 600px; width: 43%;" frameborder=no></iframe>
    <iframe id="ifrmPatterns" src="patterns.html" style="height: 600px; width: 56%;" frameborder=no></iframe>
    <%--<iframe id="ifrmPattern" src="pattern.html" style="height: 600px; width: 100%;" frameborder=no></iframe>--%>
    <link href="Content/normalize.css" rel="stylesheet">
    <link href="Content/MYXJGM.css" rel="stylesheet prefetch">
    <link href="Content/style.css" rel="stylesheet">
        <div class="app">
        <div class="app-region" id="r-head">
            		<h3>Metronome</h3>		
            <div class="control metronome">      
                <span class=""></span>      
                <span></span>      
                <span></span>      
                <span></span>    
            </div>	
        </div>
                <div class="app-region" id="r-top">    
            <div class="module transport">      
                <h3>Transport</h3>      
                <button class="transport-play" title="Play" onclick="">►</button>			
                <button class="transport-stop" title="Stop">■</button>			
            </div>  
        </div>
            </div>
    <div id="content">
        <div id="div-keyboard">
            <img alt="" src="Images/keyboard.png" style="width:56px; height:630px"/>
        </div>
        <div id="div-pattern">
        </div>
                
    </div>
        <script src="Scripts/pattern-loader.js"></script>
    </body>
    </asp:Content>
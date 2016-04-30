window.onload = function () {
    createBoard();
};
function createBoard() {
    var dom = document.getElementById('div-pattern');
    var pattId = 0;
    for (var i = 0; i < 35; i++) {
        var board = document.createElement('div');
        board.className = "seq_row";
        board.innerHTML = boardCreator(pattId);
        pattId += 64;
        dom.appendChild(board);
    }
}
function boardCreator(pattId) {
    var str = "";
    for (var i = 0; i < 64; i++) {
        str += "<span data-tic=" + i + " class='pat' id=" + pattId + " onclick='onPatternClick(" + pattId + ")'></span>";
        pattId++;
    }
    str += "</div>";
    return str;
}
function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}
function onPatternClick(id) {
    var pattern = document.getElementById(id);
    if (pattern.className == 'pat') {
        pattern.className = 'pat_active';
        var key = window.frames[0].document.getElementById("A3");
        //console.log(key);
        if (key) {
            //--- Simulate a natural mouse-click sequence.
            triggerMouseEvent(key, "mouseover");
            triggerMouseEvent(key, "mousedown");
            //triggerMouseEvent(targetNode, "mouseup");
            //triggerMouseEvent(targetNode, "click");
        }
        else
            console.log("*** Target node not found!");
    }
    else {
        pattern.className = 'pat';
        var key = window.frames[0].document.getElementById("A3");
        //console.log(key);
        if (key) {
            //--- Simulate a natural mouse-click sequence.
            triggerMouseEvent(key, "mouseup");
            triggerMouseEvent(key, "click");
        }
        else
            console.log("*** Target node not found!");
    }
}
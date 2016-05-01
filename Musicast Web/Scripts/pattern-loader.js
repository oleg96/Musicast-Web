window.onload = function () {
    createBoard();
};
function createBoard() {
    var dom = document.getElementById('div-pattern');
    var notes = ['G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C', 'B', 'A#', 'A', 'G#'];
    var pattId = 0;
    var octave = 6;
    var j = 0;
    for (var i = 0; i < 35; i++) {
        var board = document.createElement('div');
        var note = notes[j] + octave;
        board.className = "seq_row";
        board.innerHTML = boardCreator(pattId, note);
        pattId += 64;
        dom.appendChild(board);
        j++;
        if (j == 8) {
            octave--;
        }
        if (j == 12) {
            j = 0;
        }
    }
}
function boardCreator(pattId, note) {
    var str = "";
    for (var i = 0; i < 64; i++) {
        str += "<span data-tic=" + i + " class='pat' id=" + pattId + " onclick='onPatternClick(" + pattId + ")'"+" value="+note+"></span>";
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
        //var note = pattern.getAttribute('value');
        //var key = window.frames[0].document.getElementById(note);
        ////console.log(key);
        //if (key) {
        //    //--- Simulate a natural mouse-click sequence.
        //    triggerMouseEvent(key, "mouseover");
        //    triggerMouseEvent(key, "mousedown");
        //    //triggerMouseEvent(targetNode, "mouseup");
        //    //triggerMouseEvent(targetNode, "click");
        //}
        //else
        //    console.log("*** Target node not found!");
    }
    else {
        pattern.className = 'pat';
        //var note = pattern.getAttribute('value');
        //var key = window.frames[0].document.getElementById(note);
        ////console.log(key);
        //if (key) {
        //    //--- Simulate a natural mouse-click sequence.
        //    triggerMouseEvent(key, "mouseup");
        //    triggerMouseEvent(key, "click");
        //}
        //else
        //    console.log("*** Target node not found!");
    }
}
function patternPlayer(tempo) {
    var lengthOf16 = 60 / (tempo * 16);
    for (var j = 0; j < 64; j++) {
        for (var i = 0; i < 35; i++) {
            var pattern = document.getElementById(j);
            if (pattern.className == 'pat') {
                var note = pattern.getAttribute('value');
                var key = window.frames[0].document.getElementById(note);
                //console.log(key);
                if (key) {
                    //--- Simulate a natural mouse-click sequence.
                    triggerMouseEvent(key, "mouseup");
                    triggerMouseEvent(key, "click");
                }
                else
                    console.log("*** Target node not found!");
            }
            else {
                var note = pattern.getAttribute('value');
                var key = window.frames[0].document.getElementById(note);
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
            j += 64;
        }
        j -= 64 * 35;

    }
}
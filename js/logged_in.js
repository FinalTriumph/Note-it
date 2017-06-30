/* global $ */

function showNewNote() {
    $("#popup").slideDown(500);
    $("#ta_nn").focus();
}

function hideNewNote() {
    $("#popup").slideUp(500);
    $("#ta_nn").val("");
    $("#ta_nn").attr("placeholder", "");
    $("#charNum").html("500 characters left");
}

$("#ta_nn").keyup(function () {
  var max = 500;
  var length = $(this).val().length;
  if (length >= max) {
    $("#charNum").html("0 characters left");
    var goodval = $("#ta_nn").val().substr(0, max);
    $("#ta_nn").val(goodval);
  } else {
    var char = max - length;
    $("#charNum").html(char + " characters left");
  }
});

$("#ta_nn").keypress(function(e) {
    if (e.which === 13) {
        e.preventDefault();
        addNote();
    }
});

function addNote() {
    
    var val = $("#ta_nn").val();
    
    if (val.length > 500) {
        val = val.substr(0, 500);
    }
    
    if (!val.replace(/\s/g, '').length) {
        $("#ta_nn").attr("placeholder", "Type your note here");
        $("#ta_nn").val("");
        $("#charNum").html("500 characters left");
    } else {
        $.ajax({
            type: "POST",
            url: "save_note.php",
            data: { note: val },
            success: function(data) {
                if (data.substr(0, 7) === "Success") {
                    var id = data.substr(8);
                    hideNewNote();
                    if ($("#addFirstNote")) {
                        $("#addFirstNote").slideUp(500, function() {
                            $("#addFirstNote").remove();
                        })
                    }
                    $("#notes").prepend("<div class='note' id=" + id + "><button class='rmvnote' onclick='removeNote(" + id + ")'>x</button><p1>" + val + "</p1><br /><button class='editBtn editBtnSH' onclick='editNote("+ id +")'>EDIT</button><button class='editBtn cancelEditBtn'>CANCEL</button><button class='editBtn saveEditBtn' onclick='saveEditedNote("+ id +")'>SAVE</button><p5></p5><p6>Note saved!</p6></div>");
                    $(".note").slideDown(500, function() {
                        $("#" + id + " .editBtnSH").show(300);
                    });
                } else {
                    alert(data);
                }
            },
            error: function(data) {
                alert("Error: " + data);
            }
        });
    }
}

function removeNote(id) {
    var note = $("#" + id + " p1").html();
    $("#confirmDeleteNote p1").html('Delete note "' +note +'"?');
    $("#popup2").slideDown(500);
    $("#delNoteYes").click(function() {
        $.ajax({
            type: "POST",
            url: "remove_note.php",
            data: { id: id },
            success: function(data) {
                if (data === "Success") {
                    $("#popup2").slideUp(500);
                    $("#" + id + " .editBtn, #" + + id + " p5").remove();
                    $("#" + id).slideUp(500, function() { 
                        $("#" + id).remove();
                        var notesDiv = $("#notes").html();
                        if (!notesDiv.length) {
                            $("#notes").append("<div id='addFirstNote' onclick='showNewNote()'><div id='plusSign'>+</div><br /><p1>Add New Note</p1></div>");
                            $("#addFirstNote").slideDown(500);
                            $("#addFirstNote").hover(function() {
                                $("#plusSign").css("color", "#444");
                                $("#plusSign").css("box-shadow", "0px 1px 2px #444");
                            }, function() {
                                $("#plusSign").css("color", "#999");
                                $("#plusSign").css("box-shadow", "0px 1px 2px #999");
                            });
                        }
                    });
                } else {
                    alert(data);
                }
            },
            error: function(data) {
                alert("Error: " + data);
            }
        });
    });
    $("#delNoteCancel").click(function() {
        $("#delNoteYes").unbind();
        $("#popup2").slideUp(500);
    });
}

function editNote(id) {
    var val = $("#" + id + " p1").text();
    var left = 500 - val.length;
    
    $("#" + id + " p1").attr("contentEditable", true);
    $("#" + id + " p1").css("color", "#A32003");
    $("#" + id + " p1").focus();
    $("#" + id + " .editBtnSH").hide(300);
    $("#" + id + " .saveEditBtn, #" + id + " .cancelEditBtn, #" + id + " p5").show(300);
    $("#" + id + " p5").html(left + " characters left");
    $("#" + id + " p1").keyup(function() {
        var max = 500;
        var length = $(this).text().length;
        
        if (length >= max) {
            $("#" + id + " p5").html("0 characters left");
            var goodval = $(this).text().substr(0, max);
            $(this).text(goodval);
          } else {
            var char = max - length;
            $("#" + id + " p5").html(char + " characters left");
          }
    });
    $("#" + id + " .cancelEditBtn").click(function() {
        $("#" + id + " p1").html(val);
        $("#" + id + " p1").attr("contentEditable", false);
        $("#" + id + " p1").css("color", "#000");
        $("#" + id + " .editBtnSH").show(300);
        $("#" + id + " .saveEditBtn, #" + id + " .cancelEditBtn, #" + id + " p5").hide(300);
    });
    $("#" + id).click(function(){
        $("#" + id + " p1").focus();
    });
    $("#" + id + " p1").keypress(function(e) {
        if (e.which === 13) {
            e.preventDefault();
            saveEditedNote(id);
            $("#" + id + " p1").blur();
        }
    });
}

function saveEditedNote(id) {
    var nVal = $("#" + id + " p1").text();
    var leng = nVal.trim().length;
    
    if (!leng) {
        $("#" + id + " p1").html("Empty note");
        nVal = "Empty note";
    }
    
    $.ajax({
            type: "POST",
            url: "update_note.php",
            data: { id: id, note: nVal },
            success: function(data) {
                if (data === "Success") {
                    $("#" + id + " p1").attr("contentEditable", false);
                    $("#" + id + " p1").css("color", "#000");
                    $("#" + id + " .editBtnSH").show(300);
                    $("#" + id + " .saveEditBtn, #" + id + " .cancelEditBtn, #" + id + " p5").hide(300);
                    $("#" + id + " p6").show(300, function() {
                        setTimeout(function(){
                            $("#" + id + " p6").hide(500);
                        }, 1500);
                    });
                } else {
                    alert(data);
                }
            },
            error: function(data) {
                alert("Error: " + data);
            }
        });
}



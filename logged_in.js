/* global $ */

$("#headernnbtn").hover(function() {
        $("#nnplussign").css("box-shadow", "0px 1px 1px #002547");
        $("#nnplussign").css("color", "#00478a");
    }, function() {
        $("#nnplussign").css("box-shadow", "0px 1px 1px #999");
        $("#nnplussign").css("color", "#000");
    });

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

function addNote() {
    
    var val = $("#ta_nn").val();
    
    if (val.length > 500) {
        val = val.substr(0, 500);
    }
    
    if (!val.replace(/\s/g, '').length) {
        $("#ta_nn").attr("placeholder", "Type your note here.");
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
                    $("#notes").prepend("<div class='note' id=" + id + "><button class='rmvnote' onclick='removeNote(" + id + ")'>x</button><p1>" + val + "</p1></div>");
                    $(".note").slideDown(500);
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
    $.ajax({
            type: "POST",
            url: "remove_note.php",
            data: { id: id },
            success: function(data) {
                if (data === "Success") {
                    $("#" + id).slideUp(500, function() { 
                        $("#" + id).remove(); 
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
/* global $ */

$(document).ready(function() {
    $.ajax({
            type: "GET",
            dataType: "json",
            url: "get_notes.php",
            success: function(data) {
                if (data.length) {
                    for (var i = 0; i < data.length; i++) {
                        $("#notes").prepend("<div class='note' id=" + data[i].id + "><button class='rmvnote' onclick='removeNote(" + data[i].id + ")'>x</button><p1>" + data[i].note + "</p1><br /><button class='editBtn editBtnSH' onclick='editNote("+ data[i].id +")'>EDIT</button><button class='editBtn cancelEditBtn'>CANCEL</button><button class='editBtn saveEditBtn' onclick='saveEditedNote("+ data[i].id +")'>SAVE</button><p5></p5><p6>Saving...</p6></div>");
                    }
                    $(".note").slideDown(500, function(){
                        $(".editBtnSH").show(300);
                    });
                } else {
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
                $(".spinner, #header_overlay").slideUp(200);
            },
            error: function(data) {
                alert("Error: " + data);
                $(".spinner, #header_overlay").slideUp(200);
            }
        });
    });
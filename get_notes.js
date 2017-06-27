/* global $ */

$(document).ready(function() {
    $.ajax({
            type: "GET",
            dataType: "json",
            url: "get_notes.php",
            success: function(data) {
                if (data.length) {
                    for (var i = 0; i < data.length; i++) {
                        $("#notes").prepend("<div class='note' id=" + data[i].id + "><button class='rmvnote' onclick='removeNote(" + data[i].id + ")'>x</button><p1>" + data[i].note + "</p1></div>");
                    }
                    $(".note").slideDown(500);
                } else {
                    alert("no notes");
                }
                $(".spinner").slideUp(200);
            },
            error: function(data) {
                alert("Error: " + data);
                $(".spinner").hide();
            }
        });
    });
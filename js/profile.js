/* global $ */

function changePass() {
    $("#changePassForm").slideDown(500);
    $("#delacc").slideDown(500);
    $("#deleteForm").slideUp(500);
    $("#changePassBtn").hide();
    $("input[type='password']").val("");
    $("input[type='password']").css("border-color", "#000");
    $("form p2").html(" ");
}

function deleteAcc() {
    $("#deleteForm").slideDown(500);
    $("#changePassBtn").slideDown(500);
    $("#changePassForm").slideUp(500);
    $("#delacc").hide();
    $("input[type='password']").val("");
    $("input[type='password']").css("border-color", "#000");
    $("form p2").html(" ");
}

$("#closeChangePass").click(function() {
    $("#changePassForm").slideUp(500);
    $("#changePassBtn").slideDown(500);
    $("input[type='password']").val("");
    $("input[type='password']").css("border-color", "#000");
    $("form p2").html(" ");
    
});

$("#closeDeleteAcc").click(function() {
    $("#deleteForm").slideUp(500);
    $("#delacc").slideDown(500);
    $("input[type='text']").val("");
    $("input[type='password']").val("");
    $("input[type='password']").css("border-color", "#000");
    $("form p2").html(" ");
});

function changePassword(btn) {
    
    $("#oldPassError").html(" ");
    $("#newPassError").html(" ");
    $("#confirmPassError").html(" ");
    $("input[name=oldPass]").css("border-color", "#000");
    $("input[name=newPass]").css("border-color", "#000");
    $("input[name=confirmNewPass]").css("border-color", "#000");
    
    var oldpass = $("input[name=oldPass]").val();
    var newpass = $("input[name=newPass]").val();
    var cnewpass = $("input[name=confirmNewPass]").val();
    
    if (/\s/.test(oldpass) || /\s/.test(newpass) || /\s/.test(cnewpass) 
      || !oldpass.length || !newpass.length || !cnewpass.length 
      || newpass.length > 20) {
        
        if (/\s/.test(oldpass)) {
            $("#oldPassError").html("Password can't contain spaces");
            $("input[name=oldPass]").css("border-color", "#A32003");
        }

        if (/\s/.test(newpass)) {
            $("#newPassError").html("Password can't contain spaces");
            $("input[name=newPass]").css("border-color", "#A32003");
        }
    
        if (/\s/.test(cnewpass)) {
            $("#confirmPassError").html("Password can't contain spaces");
            $("input[name=confirmNewPass]").css("border-color", "#A32003");
        }
    
        if (!oldpass.length) {
            $("#oldPassError").html("Type in old password");
            $("input[name=oldPass]").css("border-color", "#A32003");
        }
    
        if (!newpass.length) {
            $("#newPassError").html("Type in new password");
            $("input[name=newPass]").css("border-color", "#A32003");
        }
    
        if (!cnewpass.length) {
            $("#confirmPassError").html("Confirm new password");
            $("input[name=confirmNewPass]").css("border-color", "#A32003");
        }
        
        if (newpass.length > 20) {
            $("#newPassError").html("Password too long. Maximum length 20 characters.");
            $("input[name=newPass]").css("border-color", "#A32003");
        }
    
        
      } else if ( newpass !== cnewpass ) {
          
          $("#confirmPassError").html("New passwords don't match");
          $("input[name=confirmNewPass]").css("border-color", "#A32003");
      
      } else {
          $(".spinner_v2").show();
          $(btn).hide();
          $("input, a, #delacc, #closeChangePass").attr("disabled", true);
          
          $.ajax({
              type: 'POST',
              url: 'change_password.php',
              data: { oldpass: oldpass, newpass: newpass },
              success: function (data) {
                  if (data === "Success") {
                      $("#popup, #passchanged").slideDown(500);
                      $("#changePassForm").slideUp(500);
                      $("#changePassBtn").slideDown(500);
                      $("input[type='password']").val("");
                      
                      $(".spinner_v2").hide();
                      $(btn).show();
                      $("input, #delacc").prop("disabled", false);
                      $("a, #delacc, #closeChangePass").attr("disabled", false);
                  } else if (data === "Incorrect password") {
                      $("#oldPassError").html("Incorrect password");
                      $("input[name=oldPass]").css("border-color", "#A32003");
                      $("input[name=confirmNewPass]").val("");
                      
                      $(".spinner_v2").hide();
                      $(btn).show();
                      $("input, #delacc").prop("disabled", false);
                      $("a, #delacc, #closeChangePass").attr("disabled", false);
                  } else {
                      $(".spinner_v2").hide();
                      $(btn).show();
                      $("input, #delacc").prop("disabled", false);
                      $("a, #delacc, #closeChangePass").attr("disabled", false);
                      alert(data);
                  }
              },
              error: function (data) {
                  $(".spinner_v2").hide();
                  $(btn).show();
                  $("input, #delacc").prop("disabled", false);
                  $("a, #delacc, #closeChangePass").attr("disabled", false);
                  alert("Error: " + data);
              }
            });
      
      }
}

function deleteAccount(btn) {
    
    $("#deletePassError").html(" ");
    $("input[name=deletePass]").css("border-color", "#000");
    
    var pass = $("input[name=deletePass]").val();
    
    if (/\s/.test(pass) || !pass.length) {
        
        if (/\s/.test(pass)) {
            $("#deletePassError").html("Password can't contain spaces");
            $("input[name=deletePass]").css("border-color", "#A32003");
        }
    
        if (!pass.length) {
            $("#deletePassError").html("Type in your password");
            $("input[name=deletePass]").css("border-color", "#A32003");
        } 
        
    } else {
        $(".spinner_v2").show();
        $(btn).hide();
        $("input, a, #changePassBtn, #closeDeleteAcc").attr("disabled", true);
        
        $.ajax({
            type: 'POST',
            url: 'delete_profile.php',
            data: { pass: pass },
            success: function (data) {
                if (data === "Success") {
                    $("#popup, #accdeleted").slideDown(500);
                    $("#deleteForm").slideUp(500);
                    $("#delacc").slideDown(500);
                    $("input[type='password']").val("");
                    
                } else if (data === "Incorrect password") {
                    $("#deletePassError").html("Incorrect password");
                    $("input[name=deletePass]").css("border-color", "#A32003");
                    
                    $(".spinner_v2").hide();
                    $(btn).show();
                    $("input, a, #changePassBtn, #closeDeleteAcc").attr("disabled", false);
                } else {
                    $(".spinner_v2").hide();
                    $(btn).show();
                    $("input, a, #changePassBtn, #closeDeleteAcc").attr("disabled", false);
                    alert(data);
                }
            },
            error: function (data) {
                $(".spinner_v2").hide();
                $(btn).show();
                $("input, a, #changePassBtn, #closeDeleteAcc").attr("disabled", false);
                alert("Error: " + data);
            }
        });
    }
}

function passChangedOk() {
    $("#popup, #passchanged").slideUp(500);
}
function profDeletedOk() {
    window.location.reload();
}

$("input[name=oldPass], input[name=newPass], input[name=confirmNewPass]").keypress(function(e) {
    if (e.which === 13) {
        var $btn = $("input[value=Submit]");
        changePassword($btn);
    }
});

$("input[name=deletePass]").keypress(function(e) {
    if (e.which === 13) {
        var $btn = $("input[value='DELETE Account']");
        deleteAccount($btn);
    }
});
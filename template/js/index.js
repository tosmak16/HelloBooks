    //-- signup Toggle Script 
    
  
     $("#signup").click(function(e) {
        
        e.preventDefault();
       $("#loginForm").hide();
       $("#signUpForm").show();
    });
     $("#login").click(function(e) {
        $("#loginForm").show();
        $("#signUpForm").hide();
    });

    
     $("#createbtn").click(function(e) {
        
        e.preventDefault();
       $("#loginForm").hide();
       $("#signUpForm").show();
    });

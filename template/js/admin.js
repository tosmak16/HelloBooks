//// Menu Toggle Script
   
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

     var rapper=$("#page-content-wrapper");
     var pa=$("#uploadbook");
     var par=$("#editbook");
     var rap=$("#rap");
     $("#menu-toggle").click(function(e) {
        
        e.preventDefault();
      //  rapper.toggle();
    });

     $("#dash").click(function(e) {
        
       // e.preventDefault();
        rapper.show();
          par.hide();
            pa.hide();
    });
     $("#myP").click(function(e) {
        
        e.preventDefault();
       rapper.hide();
          par.hide();
            pa.show();
    });
     $("#bor").click(function(e) {
        
       rapper.hide();
          par.show();
            pa.hide();
    });

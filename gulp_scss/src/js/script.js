jQuery(function($){
  var $w = $(window);
  var $b = $("body");
  var $h = $("html");

  var rem = function(n){
    return n / 7.5;
  };

  responsive(0, 750, function(){
    $h.css("font-size", rem($w.width()));
  });

  responsive(751, null, function(changed){
    if(!changed) return;
    $h.removeAttr("style");
  });

  $("#coupon").ifExists(function(){
    responsive(751, null, function(changed){
      if(!changed) return;
      $h.css("font-size", 60);
    });
  });

  /* PC/SP画像切り替え */
  (function(){
    var responsive_images = $("[data-sp-replace]");

    responsive_images.each(function(){
      var img = $(this);

      if(!img.data("src-sp")){
        img.data("src-sp", img.attr("src").replace(/\.(png|jpg|gif|svg)/, "-sp.$1"));
      }
      img.data("src", img.attr("src"));
    });

    responsive(0, 750, function(changed){
      if(!changed) return;
      responsive_images.each(function(){$(this).attr("src", $(this).data("src-sp"));});
    });

    responsive(641, null, function(changed){
      if(!changed) return;
      responsive_images.each(function(){$(this).attr("src", $(this).data("src"));});
    });
  })();


  $(".to-top").on("click", function(){
    $("html,body").animate({scrollTop: 0});
  });

  // 発火
  (function(e){
    e.initEvent("resize", true, true);
    window.dispatchEvent(e);
    window.dispatchEvent(e);
  })(document.createEvent("HTMLEvents"));
});

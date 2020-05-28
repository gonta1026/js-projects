var preload_image = function(src){
  $("<img />").attr("src", src).hide().appendTo("body").on("load", function(){
    $(this).remove();
  });
};

var with_lock = (function(){
  var locks = {};

  return function(domain, fn){
    if(locks[domain]) return;
    locks[domain] = true;
    fn(function(){locks[domain] = false;});
  };
})();

jQuery.fn.ifExists = function(fn, else_fn){
  this.length !== 0 ? fn(this) : (else_fn && else_fn());
  return this;
};

jQuery.fn.shuffle = function(){
  var container = this;
  var contents = container.find("> *");
  var length = contents.length;
  contents.each(function(){
    contents.eq(Math.floor(Math.random()*length)).prependTo(container);
  });
};
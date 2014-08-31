(function() {
  "use strict";

  function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
  }


  var mix = function(obj, proto) {
    for (var prop in proto) {
      if (proto.hasOwnProperty(prop)) {
        obj[prop] = proto[prop];
      }
    }
  };
  var XCheckboxElementPrototype = Object.create(HTMLInputElement.prototype);
  mix(XCheckboxElementPrototype, {
    createdCallback: function() {
      this.setAttribute("type", "checkbox");
      var l1 = document.createElement("label");
      var id= this.getAttribute('id');
      var className = this.getAttribute('class');
      if(id === null){
        id = "c" + generateUUID();
        this.setAttribute('id',id);
      }
      l1.setAttribute('for',id);
      if(className !== null){
        l1.setAttribute('class',className);
      }

      var theme = this.getAttribute('theme');
      console.log(theme);
      if(theme === null){
        this.setAttribute("theme","default");
      }
      if(theme === "switch"){
        l1.innerHTML = '<span class="switchOn">ON</span><span class="switchOff">OFF</span>';
      }
      console.log(l1);

      this.parentNode.insertBefore(l1, this.nextSibling);
    },
    attachedCallback: function() {},
    detachedCallback: function() {},
    attributeChangedCallback: function(attr, oldVal, newVal) {}
  });
  window.UniInputElement = document.registerElement('x-checkbox', {
    extends: "input",
    prototype: XCheckboxElementPrototype
  });
})();
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
      if(theme === null){
        this.setAttribute("theme","default");
	var strokeColor = this.getAttribute('color');
        if(strokeColor == null){
          strokeColor = "#15a4fa";
        }
        l1.innerHTML = '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">\
         <g>\
          <title>Layer 1</title>\
          <g id="svg_6">\
           <line id="svg_3" y2="13.441725" x2="7.866685" y1="8.542455" x1="3.080045" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="3" stroke="'+ strokeColor + '" fill="none"/>\
           <line id="svg_4" y2="13.399495" x2="5.797165" y1="4.558275" x1="14.919955" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="3" stroke="'+ strokeColor + '" fill="none"/>\
          </g>\
         </g>\
        </svg>';
      }
      if(theme === "switch"){
        l1.innerHTML = '<span class="switchOn">ON</span><span class="switchOff">OFF</span>';
      }
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
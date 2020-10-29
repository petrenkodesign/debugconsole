var debugconsole = {
  status: "log",
  error_status: false,
  error_color: "#f70505",
  console_id: "debug_console",
  console_content_id: "debug_console_content",

  start(this.status) {
    window.onerror = function (msg, url, lnum) {
      debugconsole.log("Error: "+msg+"<br> URL:"+url+"<br> LineNumber:"+lnum, true);
    }
    if (this.status=="dblog" || this.status=="log") {
      // add to project css link
      var css_element = document.createElement('link');
      css_element.rel = 'stylesheet';
      css_element.href = 'https://petrenkodesign.github.io/debugconsole/css/main.css';
      document.getElementsByTagName("head")[0].appendChild(css_element);
      console.log("[DEBUG_CONSOLE]: Create link to CSS with createElement");

      // create console output window
      var consolePop = document.createElement("div");
          consolePop.setAttribute("id", "console");
      var consoleContent = '<h2>Debug Console:</h2>';
          consoleContent +='<div id="console_content"></div>';
          consolePop.innerHTML = consoleContent;
      document.getElementsByTagName("body")[0].appendChild(consolePop);
      console.log("[DEBUG_CONSOLE] Create console output window");

    }
    if (this.status=="dblog" || this.status=="db")  {}
  },

  log(content, this.error_status) {
    console.log(content);
    if(typeof content === 'object' && content !== null) {
      content = JSON.stringify(content);
    }
    var errorcolor="";
    if(this.error_status) errorcolor = 'style="color:'+this.error_color+'"';
    var consoleContent = document.getElementById(console_content_id);
    consoleContent.innerHTML += "<p "+errorcolor+">"+content+"</p>";
    consoleContent.scrollTop = consoleContent.scrollHeight - consoleContent.clientHeight;
  }

};

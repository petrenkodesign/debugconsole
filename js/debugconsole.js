var debugconsole = {
  status: "log",
  error_status: false,
  error_color: "#f70505",
  console_id: "debug_console",
  console_content_id: "debug_console_content",
  api_key: "AIzaSyCG3QhiTLX26Rj84CZn0qXGFd",

  start(status=this.status) {
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
          consolePop.setAttribute("id", this.console_id);
      var consoleContent = '<h2>Debug Console:</h2>';
          consoleContent +='<div id="'+this.console_content_id+'"></div>';
          consolePop.innerHTML = consoleContent;
      document.getElementsByTagName("body")[0].appendChild(consolePop);
      console.log("[DEBUG_CONSOLE]: Create console output window");
    }
  },

  log(content, thiserror=this.error_status) {
    console.log(content);

    if(typeof content === 'object' && content !== null) {
      content = JSON.stringify(content);
    }

    if (this.status=="dblog" || this.status=="log") {
      var errorcolor="";
      if(thiserror) errorcolor = 'style="color:'+this.error_color+'"';
      var consoleContent = document.getElementById(this.console_content_id);
      consoleContent.innerHTML += "<p "+errorcolor+">"+content+"</p>";
      consoleContent.scrollTop = consoleContent.scrollHeight - consoleContent.clientHeight;
    }

    if (this.status=="dblog" || this.status=="db")  {
      var url = new URL("https://console.smartfactory.com.ua/api/");
      var sending_data = { msg: "log", client_id: "xxx", ip: "2222.222.222.222",fcm: "zzzz"};
      var params = { key: this.api_key, do: "savelog", data: sending_data};
      url.search = new URLSearchParams(params).toString();

      fetch(url)
      .then(answer => {
        console.log(answer);
      }).catch(error => {
        console.log(error);
      });
    }
  }

};

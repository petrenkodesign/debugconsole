var debugconsole = {
  status: "log",
  error_status: false,
  error_color: "#f70505",
  console_id: "debug_console",
  console_content_id: "debug_console_content",
  api_key: "AIzaSyCG3QhiTLX26Rj84CZn0qXGFd",

  start(status=this.status) {
    if(status!==this.status) this.status = status;
    window.onerror = function (msg, url, lnum) {
      debugconsole.log("Error: "+msg+"<br> URL:"+url+"<br> LineNumber:"+lnum, false, true);
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

  log(content, sending_data=false, thiserror=this.error_status) {
    console.log(content);

    if(typeof content === 'object' && content !== null) {
      content = JSON.stringify(content);
    }

    if (this.status=="dblog" || this.status=="log") {
      var errorcolor="";
      if (thiserror) errorcolor = 'style="color:'+this.error_color+'"';
      var consoleContent = document.getElementById(this.console_content_id);
      consoleContent.innerHTML += "<p "+errorcolor+">"+content+"</p>";
      consoleContent.scrollTop = consoleContent.scrollHeight - consoleContent.clientHeight;
    }

    if (sending_data && (this.status=="dblog" || this.status=="db"))  {
      var url = new URL("https://console.smartfactory.com.ua/api/");
      sending_data.msg = content;
      var params = { key: this.api_key, do: "savelog", data: JSON.stringify(sending_data)}; // sending_data = { msg: "logdata", client_id: "IMEI", ip: "222.222.222.222", fcm: "FCM_ID"};
      url.search = new URLSearchParams(params).toString();

      fetch(url)
      .then(answer => {
        if (answer.status==200) console.log("Data send to IP");
      }).catch(error => {
        console.log(error);
      });
    }
  }

};

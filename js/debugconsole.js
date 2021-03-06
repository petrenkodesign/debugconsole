var debugconsole = {
  status: "log",
  error_status: false,
  error_color: "#f70505",
  console_id: "debug_console",
  console_content_id: "debug_console_content",
  api_key: "AIzaSyCG3QhiTLX26Rj84CZn0qXGFd",
  client_id: "[NOID]",
  debug: false,

  start(status) {
    if(!status) status=this.status;
    if(status!==this.status) this.status = status;
    window.onerror = function (msg, url, lnum) {
      sending_data = {
        msg: "[ERROR]: "+msg+"<br> URL:"+url+"<br> LineNumber:"+lnum,
        client_id: debugconsole.client_id
      }
      debugconsole.log(sending_data.msg, sending_data, true);
    }
    if (this.status=="dblog" || this.status=="log") {
      // add to project css link
      var css_element = document.createElement('link');
      css_element.rel = 'stylesheet';
      css_element.href = 'https://petrenkodesign.github.io/debugconsole/css/main.css';
      document.getElementsByTagName("head")[0].appendChild(css_element);
      if (this.debug) console.log("[DEBUG_CONSOLE]: Create link to CSS with createElement");

      // create console output window
      var consolePop = document.createElement("div");
          consolePop.setAttribute("id", this.console_id);
      var consoleContent = '<h2>Debug Console:</h2>';
          consoleContent +='<div id="'+this.console_content_id+'"></div>';
          consolePop.innerHTML = consoleContent;
      document.getElementsByTagName("body")[0].appendChild(consolePop);
      if (this.debug) console.log("[DEBUG_CONSOLE]: Create console output window");
      document.querySelector("#"+this.console_id+"> h2").addEventListener('click', function(event) {
           if(this.parentElement.classList.item("movedown")) {
             this.parentElement.classList.remove("movedown");
           }
           else {
             this.parentElement.classList.add("movedown");
           }
      });
      document.querySelector("#"+this.console_id).addEventListener('dblclick', function(event) {
           if(this.classList.item("moveup")) {
             this.classList.remove("moveup");
           }
           else {
             this.classList.add("moveup");
           }
      });
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
      // url.search = new URLSearchParams(params).toString();
      var query = Object.keys(params).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      }).join('&');
      url.search = query;

      var xrequest = new XMLHttpRequest();
      xrequest.onload = function() {
        if (this.debug) {
          var answer = JSON.parse(this.responseText);
          console.log("[DEBUG_CONSOLE]: API answer is ->");
          console.log(answer);
        }
      }
      xrequest.onerror = function(error) {
        if (this.debug) {
          console.log("[DEBUG_CONSOLE]: Error ->");
          console.log(error);
        }
      }
      xrequest.open('GET', url, true);
      xrequest.send();

    }
  }

};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var container = document.createElement('div');
    container.innerHTML = this.responseText;
    var scripts = container.getElementsByTagName('script');
    var loadScript = function(i) {
      if (i < scripts.length) {
        var script = document.createElement('script');
        script.onload = function() {
          loadScript(i+1);
        }
        script.src = scripts[i].src;
        document.head.appendChild(script);
      } else {
        // All scripts have been loaded and executed
        // Imported functions can now be used
        importedFunction();
      }
    }
    loadScript(0);
  }
};

//xhttp.open("GET", "navbar.html", true);
xhttp.open("GET", "MenuBar.html", true);
xhttp.send();

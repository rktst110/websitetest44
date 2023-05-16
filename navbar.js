var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("navbar").innerHTML = this.responseText;
  }
};
//xhttp.open("GET", "navbar.html", true);
xhttp.open("GET", "MenuBar.html", true);
xhttp.send();

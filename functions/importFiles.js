var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //document.getElementById("navbar").innerHTML = this.responseText;
    document.getElementById("importedContent").innerHTML = this.responseText;
  }
};
//xhttp.open("GET", "navbar.html", true);
xhttp.open("GET", "navigation.html", true);
xhttp.send();


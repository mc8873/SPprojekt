function odpriTab(evt, tabname) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("vsebinaTab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
}

function odpritab() {
    document.getElementById("prviTab").click();
}
//     "<table><tr><td class="votecell"><img class = "voteimg" src="icons/like.svg" alt="like"/><span>1</span><img class = "voteimg" src="icons/dislike.svg" alt="like"/></td><td class="questcell"><p> Poskusi pogooglati.</p><p>--- anon</p></td></tr><tr><td></td><td><a class="odgovorLink" onclick="komentiraj()">komentiraj</a><a class="odgovorLink">označi za neprimerno</a></td></tr></table>";

function dodajOdgovor(){
    var vsebina = document.getElementById("odgovorBoks").value;
    document.getElementById("odgovoriContainer").innerHTML +="<table><tr><td class='votecell'><img class = 'voteimg' src='icons/like.svg' alt='like'/><span>1</span><img class = 'voteimg' src='icons/dislike.svg' alt='like'/></td><td class='questcell'><p>"+ vsebina+"</p><p>--- anon</p></td></tr><tr><td></td><td><a href='javascript:void(0)' class='odgovorLink' onclick='komentiraj(event)'>komentiraj</a>  <a class='odgovorLink'> označi za neprimerno</a></td></tr></table>";

}

function komentiraj(event){
    modal.style.display = "block";
    tabela = event.currentTarget.parentNode.parentNode.parentNode;
}

function dodajKomentar(){
    var vsebina = document.getElementById("komentarBoks").value;
    tabela.innerHTML += "<tr><td></td><td><table><tr><td class='votecell'><img class = 'voteimg' src='icons/like.svg' alt='like'/><span>1</span><img class = 'voteimg' src='icons/dislike.svg' alt='like'/></td><td class='questcell'><p>"+ vsebina+"</p><p>--- anon</p></td></tr><tr><td></td><td><a class='odgovorLink'> označi za neprimerno</a></td></tr></table></td></tr>";
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var modal = document.getElementById("modalComment");
var tabela= null;
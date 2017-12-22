var numUnits=2;
var visibleDivId="welcome";
//addDisclaimer("homework");
function openDiv(li,d_id,src){
   // alert(li.innerHTML);
   try{
       var  elem = document.getElementById(visibleDivId);
        elem.style.display="none";
        elem = document.getElementById(d_id);
        elem.style.display="block";
        // restore previous border
        var oldLi = document.getElementById("toc_side").getElementsByClassName("selected")[0];
        oldLi.className="unselected";
        li.className="selected";
        ifr = document.querySelector("#"+d_id+" iframe");
        if (ifr.src=="")
            ifr.src = src;
        console.log("LI:"+li.innerHTML+" - D_id:"+d_id+" - "+elem.innerHTML);
    } catch(err){
        console.log(err);
    }
    visibleDivId = d_id;
}

function addDisclaimer(elem){
    if(typeof elem != 'undefined'){
        var html = elem.innerHTML;
        elem.innerHTML = html+"<div class='instructions'> Please put your files in a directory called HW &lt;X&gt; followed by your name in CamelCase. X is the number of the unit this homework is on. For example: John Doe's second homework should be stored in a folder called HW2-JohnDoe. Replace JohnDoe with your name. Compress your folder in one zip file with the same name as the folder. Then submit it to the dropbox in desire2learn: <a href='https://neiu.desire2learn.com/d2l/lms/dropbox/admin/folders_manage.d2l?ou=2702461p'>here.</a> </div>";
    }
}

function testBox(theId,expected){
    theDiv = document.getElementById(theId);
    theDiv.innerHTML="";
    theinput = document.createElement("input");
    theinput.type='text';
    theinput.id = "input"+theId;
    theDiv.appendChild(theinput);
    thebutton = document.createElement("button");
    thebutton.innerHTML="Submit";
    thebutton.onclick=function(theinput,expected){return function()
        {checkAnswer(theinput.value,expected)};}(theinput,expected);
    theDiv.appendChild(thebutton);
}

function checkAnswer(value,expected){
    if(value==expected)
        alert("Correct");
    else
        alert("Incorrect, Try again:"+value+"=="+expected+"?");
}

  function createMenu(){
  setupTitleAndBrand();
  createNav();
  var listy = document.getElementById("sidebar");
  for(var key in ifSrc){
      var elem = document.createElement('li');
      var lnk = document.createElement('a');
      lnk.innerHTML = ifSrc[key].title;
      lnk.setAttribute("href","#");
      if ((ifSrc[key].src).startsWith("msg:"))
          lnk.style="color:red;";
      elem.appendChild(lnk);
      elem.setAttribute("role","presentation");
      (function(k) {
	  lnk.addEventListener("click", function() { loadPage(this, ifSrc[k].title,ifSrc[k].src)}, false);
	      })(key);
      listy.appendChild(elem);
      }
  loadPage(this,"Welcome",ifSrc["welcome"].src);
  }

  function loadPage(parent,k,s) {
    title = document.getElementById("title")
    content = document.getElementById("content")
    title.innerHTML="<h2>"+k+"</h2>";
    if (s.indexOf(".pdf")>1)
      location.href=s;
    else if (s.startsWith("msg:"))
      content.innerHTML = s.substring(4);
    else
 $("#content").load(s, function () {
    		MathJax.Hub.Queue(["Typeset",MathJax.Hub,"content"]);
  		});
  }

  function createNav(){
  var n = document.getElementById("fixedNav")
  for (var key in navMenu){
      var elem = document.createElement('li');
      var lnk = document.createElement('a');
      lnk.setAttribute("href", "javascript:loadPage(this,'"+navMenu[key].title+"','"+navMenu[key].src+"');");
      lnk.innerHTML=navMenu[key].title;
      elem.appendChild(lnk);
      n.insertBefore(elem,n.childNodes[1]);
  }
  }

  function setupTitleAndBrand(){
     document.title=courseName;
     var lnk = document.getElementById("brand")
     lnk.innerHTML=courseName;
     lnk.setAttribute("href", "javascript:loadPage(this,'"+courseName+"','"+defaultPage+"');");
  }

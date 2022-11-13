
// -----------------------------------nav bar----------------------

const ActivePage = window.location.pathname;
console.log(ActivePage);

const activeNav = document.querySelectorAll('nav a').forEach(
    MyLinks => {
        if (MyLinks.href.includes(`${ActivePage}`)) {
            MyLinks.classList.add('Active');
        }

    }
)


// -----------------------------------Show Password Function----------------------
function myfunction(){
  var show = document.getElementById('user_password');
  if (show.type== 'password'){
      show.type='text';
  }
  else{
      show.type='password';
  }
}
// -----------------------------------Match Password Function----------------------
var check1 = function(){
    
  if (document.getElementById('password').value ==
  document.getElementById('Cpassword').value && document.getElementById('password').value!=='') {
  document.querySelector('#CreateBuntton').disabled = false;
  document.getElementById('matched').innerHTML= 'Match';
  document.getElementById('matched').style.color="#0A7508";

} 
else if (document.getElementById('password').value ==''||
document.getElementById('Cpassword').value==''){
  document.querySelector('#CreateBuntton').disabled = true;
  document.getElementById('matched').innerHTML= '';
}
    else {
   document.querySelector('#CreateBuntton').disabled = true;
   document.getElementById('matched').innerHTML= 'Not Match';
   document.getElementById('matched').style.color="#CB0505";

}
}


function welcome() {
  var t = new Date().getHours();
  if (t < 12) {
      document.getElementById("demo").innerHTML = "good morning!<br> What would you like to eat for breakfast? ";
  } else if ( t < 18) {
      document.getElementById("demo").innerHTML = "good afternoon!<br> What would you like to eat for lunch?";
  } else {
      document.getElementById("demo").innerHTML = "good evening!<br>What would you like to eat for dinner? "
  };
};



$(document).ready(function() {


$('#subscription-form').on('submit', formProcess);



function formProcess(e) {
  e.preventDefault();

  var email = $('#email').val();
  var name = $('#name').val();
  var captcha = $('#g-recaptcha-response').val();

  // console.log(captcha);
  if(!email || email == '' || !name || name == ''){
    alert('Please Enter Both Email and Name.');
    location.reload();
  }else if(!captcha || captcha == ''){
    alert('Please Select Captcha.');
  }else{

  fetch('/subscription',{
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({name:name, email:email, captcha:captcha})
    }).then((res) => 
        {
          return res.json();
        }).then((data) => {
          if(data.success){
            var modalBodyText = `<p class="text-capitalize">Hi, ${name}. ${data.msg}.</p>`;
            $('#modalBody').html(modalBodyText);
            $('#exampleModal').modal();
          }else{
            var modalBodyText = `<p class="text-capitalize">Hi, ${name}. ${data.msg}.</p>`;
            $('#modalBody').html(modalBodyText);
            $('#exampleModal').modal();
          }   
          // location.reload();       
          // console.log(data);
    }).catch((err)=>{
      console.log(err);
    })

  }
}





});

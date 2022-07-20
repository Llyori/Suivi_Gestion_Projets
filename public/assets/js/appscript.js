/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use strict";

// var codeOfInst = document.getElementById('codeInst').value
function serialize(d) {
  let obj = {};
  d.forEach((value, key) => {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
    return obj;
  });
}

function DisplayBlock(id) {
  document.getElementById(id).toggleAttribute('hidden');
}

//  function agentgraph() {
//   var info = {
//       agentinfo
//   }
//   fetch({
//     type: 'GET',
//     url: `/web/${inst.code}/agent/graphinfo`,
//     success: function (ress) {
//       info.agentinfo = ress.agentinfo
//     }
//   })
//   return info
// }

// var agentLineCharts = agentgraph()

function bbt(url) {
  fetch(url, {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  }).then(function (res) {
    res.forEach((res) => {
      LoadAjaxTable('Table1-me');
    });
  });
  return false;
}

function deleteAction(url) {
  showSwal(url)
}

function showSwal(url) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      width: 300,
      padding: '5px',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Proceed',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        return $.ajax({
          type: 'GET',
          url: url,
          success: function (ress) {
            ShowSToast('error', ress.ok);
            location.reload();
          },
          error: function (ress) {
            ShowSToast('error', ress.message);
          },
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error',
        );
      }
    });
}

function ShowSToast(icon, message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 9000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: icon,
    title: message,
  });
}

function LoadAjaxTable(table_id) {
  var tbl = document.getElementById(table_id);
  var tbl_row = tbl.getElementsByTagName('tr');
  tbl_row.forEach((i) => {
    var ths = i.getElementsByTagName('th');
    ths.forEach((t) => {
      var name = t.getAttribute('title');
    });
  });
  var tr = tbl.getElementsByTagName('tr')[1];
  var tbody = document.createElement('tbody', tr);
  tbl.append(tbody);
}

function formPost(formId) {
  var dat = {};
  var form = document.getElementById(formId);
  form.addEventListener('submit', function (e) {
    var url = $(this).attr('action');
    var type = $(this).attr('method');
    dat = $(this).serialize();
    e.preventDefault();
    $.ajax({
      type: type,
      url: url,
      data: dat,
      beforeSend: function () {
        var button = document.getElementById(formId + '_button');
        button.setAttribute('disabled', 'true');
        document.getElementById(formId + '_loader').style.display = 'block';
        document.getElementById(formId + '_submit').innerHTML = 'loading';
      },
      complete: function () {
        var button = document.getElementById(formId + '_button');
        button.removeAttribute('disabled');
        document.getElementById(formId + '_loader').style.display = 'none';
        document.getElementById(formId + '_submit').innerHTML = 'Enregistrer';
        ShowSToast('success', res.message);
      },
      success: function () {
        //ShowSToast(nn)
        
        form.reset();
        window.location.href = document.querySelector('#form4').dataset.page;
        
        //location.reload()
        // if(res.link) {
        //   location.replace(res.link)
        // }
        
        
       
      },
      error: function(ress){
        var body = ress.responseJSON 
            ShowSToast('error', body.message);
      },
    });
  });
}

function displayFormErrors(body) {
  Object.keys(body.errors).forEach((errorKey) => {
    let spanError = document.getElementById(errorKey + '-error');
    let errorMessage = '';
    body.errors[errorKey].forEach((e) => {
      errorMessage += `${e.message} <br/>`;
    });
    spanError.innerHTML = errorMessage;
    spanError.style.display = 'block';
  });
}

function getforms() {
    return document.getElementsByTagName('form')
}

window.onload = initializeForms(); 

function initializeForms() {
    var forms
    forms = getforms();
    if(forms){
    for(var i=0;i<forms.length;i++)
   {
       var id = forms[i].getAttribute('id')
       if(id && id != 'logoutForm'){
         console.log(id)
       formPost(id)
       }
      }
   }
}

function getBankAgent(url) {
    document.getElementById('coreBankId-error').style.display = "none"
    var id = document.getElementById('coreBankId').value
    if(!id) {
        var span = document.getElementById('coreBankId-error')
        span.style.display = "block"
        span.innerHTML = "a value is required"
        return false
    }
    document.getElementById("coreBankId-error").innerHTML = ""
    $.ajax({
        type: 'GET',
        url: url+id,
        redirect: true,
        beforeSend: function () {
          document.querySelector('form').querySelectorAll('input').forEach((i) =>{
            i.removeAttribute('readonly')
            if(i.getAttribute('id') !== 'coreBankId'){
            i.value = null
            }
          })
            var button = document.getElementById("find_agent_button")
            button.setAttribute("disabled", "true")
            button.value = "loading"
            document.getElementById("find_loader").style.display = 'block'
        },
        complete: function () {
            var button = document.getElementById("find_agent_button")
            button.removeAttribute("disabled")
            button.value = "find"
            document.getElementById("find_loader").style.display = 'none'
        },
        success: function (ress) {
            var keys = (Object.keys(ress))
            keys.forEach(i => {
                // doc = document.getElementById(i);
                var doc = document.querySelector('#'+i)
                var spanError = document.getElementById(i+"-error")
                if(doc){
                    doc.value = ress[i];
                    doc.setAttribute('readonly', 'true')
                } 
                if( spanError ) {
                    spanError.innerHTML = ""
                }
            });
        },
        error: function (ress) {
            var body = ress.responseJSON   
            if (ress.status == 422) {
                displayFormErrors(body)
            }
            else {
                ShowSToast('error', body.message);
            }
            return false
        }
    })
    
}

function setdark(url) {
  var body = document.getElementsByTagName('body')[0]
  var dark = !body.classList.contains('dark-mode')
  return $.ajax({
    type: 'GET',
    url: url+dark,
    error: function (ress) {
      ShowSToast('error', ress.message);
    },
  });
}

function updateAction(id, url) {
  var element = document.querySelector('#new_struct').cloneNode(true);
  var form = element.querySelector('form')
  form.setAttribute("action", url);
  form.setAttribute("id", `${id}_form`);

        // actionOld = element.getAttribute('action')
        // Idold = element.getAttribute('id')
        // element.setAttribute("action", url);
        //  element.setAttribute("id", id+'_form');
        //  changeFormId(Idold,id, element);

  // var nn = element.parentNode.cloneNode(true)

  // element.setAttribute("action", actionOld);
  // element.setAttribute("id", Idold);
  var iddd = changeFormId('amtStr', id, form, element);

  element.removeAttribute('hidden')
  // console.log(element)
  document.getElementById(id).replaceWith(element)
  formPost(iddd)
}

// document.onloadstart = console.log(new Date())
// document.onloadeddata = console.log(new Date())


function changeFormId(Idold, id, form, element) {
  var idd = id+'_form'
  element.querySelectorAll('span').forEach((e) => {
    if(e.getAttribute('id') == Idold+'_loader'){
      e.setAttribute('id', idd+'_loader')
    }
    if(e.getAttribute('id') == Idold+'_button'){
      e.setAttribute('id', idd+'_button')
      }
    if(e.getAttribute('id') == Idold+'_submit'){
      e.setAttribute('id', idd+'_submit')
        }
  })
  element.querySelectorAll('button').forEach((e) => {
    if(e.getAttribute('id') == Idold+'_button'){
      e.setAttribute('id', idd+'_button')
      e.addEventListener('click', function() {
        form.submit();
      })
      }
  })
  return idd
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonStyling: true,
})

$("a").click(function(event){
  var url = $(this).attr('href');
  if(url.includes('#')) {
    event.preventDefault();
  }
  else if(url.includes('emove')) {
    event.preventDefault();
    swalWithBootstrapButtons
    .fire({
      width: 600,
      padding: '5px',
      title: 'Are you sure?',
      text:  'Action Can not be reversed',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Proceed',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
    }).then((v) => {
      if(v.isConfirmed) {
        document.location.replace(url)
      }
      else {
        ShowSToast('success', 'Cancelled')
      }
    })
  }
  else if(url.includes('add')) {
    event.preventDefault();
    swalWithBootstrapButtons
    .fire({
      width: 600,
      padding: '5px',
      title: 'Are you sure?',
      text:  'Action Can not be reversed',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Proceed',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
    }).then((v) => {
      if(v.isConfirmed) {
        document.location.replace(url)
      }
      else {
        ShowSToast('success', 'Cancelled')
      }
    })
  }
  else{
    document.location.replace(url)
  }  
});









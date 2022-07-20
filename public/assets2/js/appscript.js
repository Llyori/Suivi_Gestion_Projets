/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use strict";

var codeOfInst = document.getElementById('codeInst').value
console.log(codeOfInst)
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
    console.log(res);
    res.forEach((res) => {
      LoadAjaxTable('Table1-me');
    });
  });
  return false;
}

function deleteAction(url) {
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
      confirmButtonText: 'Yes, delete it!',
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
            console.log(ress.message);
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
    dat = $(this).serialize();
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: url,
      data: dat,
      beforeSend: function () {
        console.log(formId);
        var button = document.getElementById(formId + '_button');
        button.setAttribute('disabled', 'true');
        document.getElementById(formId + '_loader').style.display = 'block';
        document.getElementById(formId + '_submit').innerHTML = 'loading';
      },
      complete: function () {
        var button = document.getElementById(formId + '_button');
        button.removeAttribute('disabled');
        document.getElementById(formId + '_loader').style.display = 'none';
        document.getElementById(formId + '_submit').innerHTML = 'Save';
      },
      success: function (res) {
        form.reset();
        ShowSToast('success', res.message);
        if (res.redirect) {
          console.log(res.redirect);
          window.location.replace(res.redirect);
        } else {
          location.reload();
        }
      },
      error: function(ress){
        var body = ress.responseJSON 
        if (ress.status == 422) {
          displayFormErrors(body)
        }
        else {
            ShowSToast('error', body.message);
        // var ErrorSpan = document.getElementById(formId+"err")
        // if(!ErrorSpan){
        // var divError = document.createElement("div")
        // divError.setAttribute("class", "alert alert-danger alert-icon alert-dismissible")
        // var icon = document.createElement("em")
        // icon.setAttribute("class", "icon ni ni-cross-circle")
        // var button = document.createElement("button")
        // button.setAttribute("class", "close"),
        // button.setAttribute("data-dismiss", "alert")
        // divError.insertAdjacentElement("afterBegin", icon)
        // divError.insertAdjacentElement("beforeEnd", button)
        // var p = document.createElement("span")
        // p.setAttribute("id", formId+"err")
        // p.innerHTML = body.message
        // divError.append(p)
        // form.insertAdjacentElement("afterBegin", divError)
        // }
        // if(ErrorSpan){
        // ErrorSpan.innerHTML = body.message
        // }

      }
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
  console.log('meeeeeeeee')
    return document.getElementsByTagName('form')
}

window.onload = initializeForms(); 

function initializeForms() {
    var forms
    forms = getforms();
    if(forms){
      console.log(forms)
    for(var i=0;i<forms.length;i++)
   {
       var id = forms[i].getAttribute('id')
       if(id && id != logoutForm){
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
        beforeSend: function () {
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
          console.log(ress)
            var keys = (Object.keys(ress))
            keys.forEach(i => {
                // doc = document.getElementById(i);
                var doc = document.querySelector('#'+i)
                var spanError = document.getElementById(i+"-error")
                if(doc){
                    doc.value = ress[i];
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
  console.log(dark)
  return $.ajax({
    type: 'GET',
    url: url+dark,
    error: function (ress) {
      console.log(ress.message);
      ShowSToast('error', ress.message);
    },
  });
}

function updateAction(id, url) {
  var element = document.querySelector('FORM')
  console.log(element)
  var actionOld
  var Idold
      if(element.nodeName == 'FORM'){
        actionOld = element.getAttribute('action')
        Idold = element.getAttribute('id')
        element.setAttribute("action", url);
         element.setAttribute("id", id+'_form');
         changeFormId(Idold,id, element);
      }

  var nn = element.parentNode.cloneNode(true)

  element.setAttribute("action", actionOld);
  element.setAttribute("id", Idold);
  changeFormId(id, Idold, element);

  nn.removeAttribute('hidden')
  nn.removeAttribute('id')
  document.getElementById(id).innerHTML = nn.innerHTML
  initializeForms()
}

document.onloadstart = console.log(new Date())
document.onloadeddata = console.log(new Date())


function changeFormId(Idold, id, form) {
  var idd = id+'_form'
  document.getElementsByTagName('span').forEach((e) => {
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
  document.getElementsByTagName('button').forEach((e) => {
    if(e.getAttribute('id') == Idold+'_button'){
      e.setAttribute('id', idd+'_button')
      }
  })
}

function showTranSwal(transaction) {
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
        text:  transaction.message,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, Proceed',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          return $.ajax({
            type: 'GET',
            url: '/web'+transaction.url+'/yes',
            success: function (res) {
            if(res.otp) {
              validateOtp(res.otp),
              initializeForms()
            }
            },
            error:  ((res) => {
               body = res.responseJSON
               if (res.status == 503) {
                swalWithBootstrapButtons.fire(
                    'Failed to Send Otc',
                    body.message,
                    'info',
                  );
              }
            }),
          });
        } else if ( result.dismiss === Swal.DismissReason.cancel ) {
          return $.ajax({
            type: 'GET',
            url:'/web'+transaction.url+'/no',
            success: function (res) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                res.message,
                'info',
              );
            },
            error: function (ress) {
              console.log(ress.message);
              ShowSToast('error', ress.message);
            },
          });
        }
      });
  }


function validateOtp(otp) {
    Swal.fire({
      title: '<h6>Enter Code provided by Client</h6>',
      width: 500,
      margin: '0px',
      html:
      `<form method="Get" class="otc" id='otc_validate' name="one-time-code" action=${otp.url}>
        <input name="guid" valeu=${otp.guid} hidden>
        <input name="role" valeu=${otp.role} hidden>
        <div>
        <input type="number" name="otc-1" pattern="[0-9]*"  value="" inputtype="numeric" autocomplete="one-time-code" id="otc-1" required>
        <!-- Autocomplete not to put on other input -->
        <input type="number" name="otc-2" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" id="otc-2" required>
        <input type="number" name="otc-3" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" id="otc-3" required>
        <input type="number" name="otc-4" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" id="otc-4" required>
        <input type="number" name="otc-5" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" id="otc-5" required>
        <input name="otc-6" type="number"  pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" id="otc-6" required>
        </div>
        <div>
        <button type="submit" id="otp_validate_button" class="btn btn-sm btn-flex btn-primary">
        <span style="display: none" id="otp_validate_loader" class="spinner-border  spinner-border-sm" role="status" aria-hidden="true"></span>
        <span id="otp_validate_submit" >Verify transaction</span>
         </button> 
         </div>
      </form>`,
      focusConfirm: false,
      showConfirmButton: false,
    })
  
    let in1 = document.getElementById('otc-1'),
      ins = document.querySelectorAll('input[type="number"]'),
       splitNumber = function(e) {
          let data = e.data || e.target.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
          if ( ! data ) return; // Shouldn't happen, just in case.
          if ( data.length === 1 ) return; // Here is a normal behavior, not a paste action.
          
          popuNext(e.target, data);
          //for (i = 0; i < data.length; i++ ) { ins[i].value = data[i]; }
      },
      popuNext = function(el, data) {
          el.value = data[0]; // Apply first item to first input
          data = data.substring(1); // remove the first char.
          if ( el.nextElementSibling && data.length ) {
              // Do the same with the next element and next data
              popuNext(el.nextElementSibling, data);
          }
      };
  
  ins.forEach(function(input) {
      /**
       * Control on keyup to catch what the user intent to do.
       * I could have check for numeric key only here, but I didn't.
       */
      input.addEventListener('keyup', function(e){
          // Break if Shift, Tab, CMD, Option, Control.
          if (e.keyCode === 16 || e.keyCode == 9 || e.keyCode == 224 || e.keyCode == 18 || e.keyCode == 17) {
               return;
          }
          
          // On Backspace or left arrow, go to the previous field.
          if ( (e.keyCode === 8 || e.keyCode === 37) && this.previousElementSibling && this.previousElementSibling.tagName === "INPUT" ) {
              this.previousElementSibling.select();
          } else if (e.keyCode !== 8 && this.nextElementSibling) {
              this.nextElementSibling.select();
          }
          
          // If the target is populated to quickly, value length can be > 1
          if ( e.target.value.length > 1 ) {
              splitNumber(e);
          }
      });
      
      /**
       * Better control on Focus
       * - don't allow focus on other field if the first one is empty
       * - don't allow focus on field if the previous one if empty (debatable)
       * - get the focus on the first empty field
       */
      input.addEventListener('focus', function(e) {
          // If the focus element is the first one, do nothing
          if ( this === in1 ) return;
          
          // If value of input 1 is empty, focus it.
          if ( in1.value == '' ) {
              in1.focus();
          }
          
          // If value of a previous input is empty, focus it.
          // To remove if you don't wanna force user respecting the fields order.
          if ( this.previousElementSibling.value == '' ) {
              this.previousElementSibling.focus();
          }
      });
  });
  
  /**
   * Handle copy/paste of a big number.
   * It catches the value pasted on the first field and spread it into the inputs.
   */
  in1.addEventListener('input', splitNumber);
  }

  function getBankClient(url) {
    document.getElementById('ClientAccount-error').style.display = "none"
    document.getElementById('ClientID-error').style.display = "none"
    var client = document.getElementById('ClientAccount').value
    var id = document.getElementById('ClientID').value
    if(!client || client.length !== 11) {
        var span = document.getElementById('ClientAccount-error')
        span.style.display = "block"
        span.innerHTML = "Enter a Valid Account Number"
        return false
    }
    if(!id ) {
      var span = document.getElementById('ClientID-error')
      span.style.display = "block"
      span.innerHTML = "a value is required for ID Number"
      return false
  }
    // document.getElementById("coreBankId-error").innerHTML = ""
    $.ajax({
        type: 'GET',
        url: `${url}${id}/${client}`,
        beforeSend: function () {
            var button = document.getElementById("find_client_button")
            button.setAttribute("disabled", "true")
            button.value = "loading"
            document.getElementById("find_loader").style.display = 'block'
        },
        complete: function () {
            var button = document.getElementById("find_client_button")
            button.removeAttribute("disabled")
            button.value = "find"
            document.getElementById("find_loader").style.display = 'none'
        },
        success: function (ress) {
            var keys = (Object.keys(ress))
            document.getElementsByTagName('form')[0].querySelectorAll('input').forEach((e) => {
              e.removeAttribute('disabled')
            })
            document.getElementsByTagName('form')[0].querySelectorAll('button').forEach((e) => {
              e.removeAttribute('disabled')
            })
            // keys.forEach(i => {
            //     var doc = document.querySelector(`#${i}`)
            //     var spanError = document.getElementById(i+"-error")
            //     if(doc){
            //         doc.value = ress[i];
            //     }
            // });
        },
        error: function (ress) {
          document.getElementsByTagName('form')[0].querySelectorAll('input').forEach((e) => {
            console.log(e.getAttribute('id') )
            if(['ClientAccount','ClientID'].indexOf(e.getAttribute('id')) == -1 ) {
              e.setAttribute('disabled', 'true')
            }  
          })
          document.getElementsByTagName('form')[0].querySelectorAll('button').forEach((e) => {
            if(['ClientAccount','ClientID'].indexOf(e.getAttribute('id')) == -1) {
              e.setAttribute('disabled', 'true')
            }  
          })
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
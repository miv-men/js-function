const formReviews = document.querySelector('.reviews-valid');
if (formReviews) {

   maskPhone('.reviews-valid input[type="tel"]');
    formReviews.addEventListener('submit', function (event) {
        /* // При отправки формы php
        if (!formValidation(formReviews))
            event.preventDefault();
            */
        event.preventDefault();
        if (formValidation(formReviews)){
            let params = new FormData(formReviews);

            ajax('/include/validForm.php', params, '.reviews__success');
        }

    });
}

function formValidation(form) {

   let valid = true;
   const fields = form.querySelectorAll('.field');
   const fi = form.querySelectorAll('.form__input');

   const errors = form.querySelectorAll('.error-text');

   for (let i = 0; i < errors.length; i++){
       forClassContains(fi, 'remove', 'form__error');
       errors[i].remove();
   }

   for (let i = 0; i < fields.length; i++) {
   let type = fields[i].getAttribute('type');
       if(type === 'email'){
           if (!validateEmail(fields[i]) ) {
               markErrorInput('не корректный email', [fields[i]], [fields[i]]);
               valid = false;
           }
       } else if(type === 'tel'){
           if ((fields[i].value.length < 18) ) {
               markErrorInput('не корректный телефон', [fields[i]], [fields[i]]);
               valid = false;
           }
       } else {
           if ((fields[i].value.length < 3) ) {
               markErrorInput('обязательно для заполнения', [fields[i]], [fields[i]]);
               valid = false;
           }
       }
   }

   const password = form.querySelector('.password');
   const passwordConfirmation = form.querySelector('.passwordConfirmation');

   if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
       markErrorInput('пароли не совпадают', [password, passwordConfirmation], [passwordConfirmation]);
       valid = false;
   }

   return valid;
}

function markErrorInput(text, border, divText = false) {

   let error = document.createElement('div');
   error.className = 'error-text';
   error.innerHTML = text;

   for (let i in border)
       border[i].classList.add('form__error');

   if (divText) {
       for (let i in divText)
           divText[i].parentElement.insertBefore(error, divText[i]);
   }

   return true;
}

function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}

function validateEmail(email) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

   if(reg.test(email.value) == false) {
   
      return false;

   }else{

      return true;

   }
}

function CheckForm(el) {

   const jsCheck = el.querySelector('.js-check');

   jsCheck.value = 'TUSd2>LF-&jo';

}

function forClassContains(el, elType, val) {
   for (let i in el){
       if (typeof el[i] === 'object'){
           if (elType === 'remove')
               el[i].classList.remove(val);
           if (elType === 'add')
               el[i].classList.add(val);
       }
   }
   return true;
}

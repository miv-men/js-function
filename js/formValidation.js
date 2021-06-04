const formReviews = document.querySelector('.reviews__form');
if (formReviews) {
    formReviews.addEventListener('submit', function (event) {
        /* // При отправки формы php
        if (!formValidation(formReviews))
            event.preventDefault();
            */
        event.preventDefault();
        if (formValidation(formReviews)){
            let params = new FormData(formReviews);

            ajax('/ajax/add_reviews.php', params, '.reviews__success');
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
        if (!fields[i].value) {
            markErrorInput('обязательно для заполнения', [fields[i]], [fields[i]]);
            valid = false;
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

function ajax(url, post = {}, tag = '') {
    
    let formData;
    if (Array.isArray(post)){
        post = new Map(post);
        formData = new FormData;

        for (let [key, value] of post)
            formData.append(key, value);
    }else{
        formData = post;
    }

    let result = fetch(url,{
        method: 'POST',
        body: formData,
        // headers: {
        //     'content-type': 'application/json'
        // }
    }).then(
        successResponse => {
            if (successResponse.ok) {
                return successResponse.text();
            } else {
                console.error("Fetch Error status: " + successResponse.status);
            }
        },
        failResponse => {
            console.error("Fetch Error: " + failResponse);
        }
    ).then(
        result => {
            if (tag) {
                document.querySelector(tag).innerHTML = result;
            } else {
                window.location.reload();
            }
        }
    );

}


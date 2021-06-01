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

function ajax(url, post = {}, tag = '') {

    let result = fetch(url,{
        method: 'POST',
        body: post,
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


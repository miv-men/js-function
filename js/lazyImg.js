const lazy = document.querySelectorAll('img[data-src],source[data-srcset]');
const lazyAjax = document.querySelectorAll('._load-ajax');
const winHeight = document.documentElement.clientHeight;

let lazyPosution = [];
if(lazy.length > 0){
    lazy.forEach(img => {
        if (img.dataset.src || img.dataset.srcset){
            lazyPosution.push(img.getBoundingClientRect().top + pageYOffset)
            lazyScrollCheck();
        }
    });
}

window.addEventListener('scroll', lazyScroll);

function lazyScroll() {
    if(document.querySelectorAll('img[data-src]').length > 0){
        lazyScrollCheck();
    }
}

function lazyScrollCheck() {

    let imgIndex = lazyPosution.findIndex(
        item => pageYOffset > item - winHeight
    );
    if(imgIndex >= 0) {
        if(lazy[imgIndex].dataset.src){
            lazy[imgIndex].src = lazy[imgIndex].dataset.src;
            lazy[imgIndex].removeAttribute('data-src');
        } else if (lazy[imgIndex].dataset.srcset) {
            lazy[imgIndex].srcset = lazy[imgIndex].dataset.srcset;
            lazy[imgIndex].removeAttribute('data-srcset');
        }
        delete lazyPosution[imgIndex];
    }
}
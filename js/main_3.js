
const sections = document.querySelectorAll('section');


const options = {
    root:       null,                       // default = null (viewport)
    threshold:  0,                          // from 0 to 1, how much % of the item is showing
    rootMargin: '-150px 0px -150px 0px'     // always use px, including 0px (or %)
};



const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        const utilitySection = document.querySelector(`[data-target="${entry.target.id}"]`);
        const visible = utilitySection.querySelector('.info__visible');
        const time = utilitySection.querySelector('.info__time');
        const x = utilitySection.querySelector('.info__x');
        const y = utilitySection.querySelector('.info__y');
        const lazyStatus = document.getElementById('lazyload').getAttribute('data-status');

        time.innerHTML = 'NO';

        if (entry.isIntersecting) {
            const image = entry.target.querySelector('[data-src]');
            const src = image.getAttribute('data-src');

            if (lazyStatus == 'on') {
                if (src) {
                    image.src = src;
                }
                visible.classList.add('true');
                visible.innerHTML = 'YES';
                observer.unobserve(entry.target);
                time.innerHTML = 'NO';
                time.classList.add('false');
                time.classList.remove('true');
            }
        } else {
            visible.classList.remove('true');
            visible.innerHTML = 'NO';
            time.classList.add('true');
            time.classList.remove('false');
            time.innerHTML = 'YES';
        }

        x.innerHTML = entry.boundingClientRect.x;
        y.innerHTML = entry.boundingClientRect.y;

        console.log(entry);
    });
}, options);



sections.forEach(function(section) {
    observer.observe(section);
});




// Button

const lazyLoadButton = document.getElementById('lazyload');

lazyLoadButton.addEventListener('mouseup', e => {
    let status = e.target.getAttribute('data-status');

    if (status === 'off') {
        e.target.dataset.status = 'on';
        e.target.innerHTML = 'Lazyload: ON'
    } else if (status === 'on') {
        e.target.dataset.status = 'off';
        e.target.innerHTML = 'Lazyload: OFF'
    }
});



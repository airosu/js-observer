
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

        time.innerHTML = 'NO';

        if (entry.isIntersecting) {
            visible.classList.add('true');
            visible.innerHTML = 'YES';
            entry.target.classList.add('inverted');
            observer.unobserve(entry.target);
            time.innerHTML = 'NO';
            time.classList.add('false');
            time.classList.remove('true');
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


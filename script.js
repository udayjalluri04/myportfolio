
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('pageshow', () => {
    const navigation = performance.getEntriesByType('navigation')[0];

    if (navigation?.type === 'reload') {
        history.replaceState(null, '', location.pathname + location.search);

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
});

const menuButton = document.querySelector('.menu');
const links = document.querySelector('.links');

if (menuButton && links) {
    menuButton.addEventListener('click', () => {
        const open = links.classList.toggle('open');

        menuButton.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', e => {
        if (!links.contains(e.target) && !menuButton.contains(e.target)) {
            links.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
}

const items = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        entries => entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        }),
        {
            threshold: 0.12
        }
    );

    items.forEach(item => observer.observe(item));
} else {
    items.forEach(item => item.classList.add('visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = new FormData(form);

        const name = String(data.get('name') || '').trim();
        const email = String(data.get('email') || '').trim();
        const message = String(data.get('message') || '').trim();

        const params = new URLSearchParams({
            view: 'cm',
            fs: '1',
            to: 'udayjalluri04@gmail.com',
            su: 'Portfolio enquiry from ' + name,
            body: message + '\n\nFrom: ' + name + '\nEmail: ' + email
        });

        window.location.href = `https://mail.google.com/mail/?${params.toString()}`;
    });
}

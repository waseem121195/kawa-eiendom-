document.addEventListener('DOMContentLoaded', () => {
	// mobilmeny
	const navToggle = document.getElementById('navToggle');
	const nav = document.querySelector('.nav ul');
	navToggle?.addEventListener('click', () => {
		if (!nav) return;
		nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
	});

	// reveal on scroll
	const reveals = document.querySelectorAll('.reveal');
	const obs = new IntersectionObserver((entries) => {
		entries.forEach(e => {
			if (e.isIntersecting) e.target.classList.add('in-view');
		});
	}, {threshold: 0.12});
	reveals.forEach(r => obs.observe(r));

	// enkel carousel
	const carouselImgs = Array.from(document.querySelectorAll('.hero-carousel img'));
	let idx = 0;
	if (carouselImgs.length) {
		carouselImgs[0].classList.add('active');
		setInterval(() => {
			carouselImgs[idx].classList.remove('active');
			idx = (idx + 1) % carouselImgs.length;
			carouselImgs[idx].classList.add('active');
		}, 3500);
	}

	// enkel form-submission (placeholder)
	document.querySelectorAll('.contact-form').forEach(form => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			alert('Takk! Vi tar kontakt så snart som mulig.');
			form.reset();
		});
	});
});

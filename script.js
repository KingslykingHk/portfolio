const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

// remove menu mobile
const navLink = document.querySelectorAll('.nav-link')
function linkAction() {
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}
navLink.forEach((n) => n.addEventListener('click', linkAction))

// qualification tabs
const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]')
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target)
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('qualification-active')
    })
    target.classList.add('qualification-active')
    tabs.forEach((tab) => {
      tab.classList.remove('qualification-active')
    })
    tab.classList.add('qualification-active')
  })
})

// services box
const boxViews = document.querySelectorAll('.services-box'),
  boxBtns = document.querySelectorAll('.services-button'),
  boxCloses = document.querySelectorAll('.services-box-close')
let box = function (boxClick) {
  boxViews[boxClick].classList.add('active-box')
}
boxBtns.forEach((boxBtn, i) => {
  boxBtn.addEventListener('click', () => {
    box(i)
  })
})
boxCloses.forEach((boxClose) => {
  boxClose.addEventListener('click', () => {
    boxViews.forEach((boxView) => {
      boxView.classList.remove('active-box')
    })
  })
})

// scroll section active link
const sections = document.querySelectorAll('section[id]')
function scrollActive() {
  const scrollY = window.pageYOffset
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    let sectionId = current.getAttribute('id')
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav-menu a[href*=' + sectionId + ']')
        .classList.add('active-link')
    } else {
      document
        .querySelector('.nav-menu a[href*=' + sectionId + ']')
        .classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

// change bg header
function scrollHeader() {
  const nav = document.getElementById('header')
  if (!nav) return
  if (window.scrollY >= 200) nav.classList.add('scroll-header')
  else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// show scroll top
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up')
  if (!scrollUp) return
  if (window.scrollY >= 560) scrollUp.classList.add('show-scroll')
  else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

// dark/light mode
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  )
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](
    iconTheme
  )
}
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

// Swiper sliders
let swiperPortfolio = new Swiper('.portfolio-container', {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})
let swiperTestimonial = new Swiper('.testimonial-container', {
  cssMode: true,
  loop: true,
  spaceBetween: 48,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
})
// Contact form submission

// Toastify notification helper
function showToast(message, type = 'success') {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'center', // valid values: 'left', 'center', 'right'
    style: { background: type === 'success' ? '#4BB543' : '#FF5252' },
    close: true,
    stopOnFocus: true,
  }).showToast()
}

const contactForm = document.getElementById('contact-form')
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    }
    try {
      const res = await fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      let data = { message: '' }
      try {
        data = await res.json()
      } catch (jsonErr) {
        data.message = 'No response from server.'
      }
      if (res.ok) {
        showToast('Sent successfully!', 'success')
        form.reset()
      } else {
        showToast(
          data && data.message ? data.message : 'Failed to send message.',
          'error'
        )
      }
    } catch (err) {
      showToast(
        err.message || 'Failed to send message. Please try again.',
        'error'
      )
    }
  })
}

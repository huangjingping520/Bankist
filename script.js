'use strict'

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
};

const closeModal = function () {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
})

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect()

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({ behavior: 'smooth' })
})

// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     document.querySelector(el.hash).scrollIntoView({ behavior: 'smooth' })
//   })
// })

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('nav__link')) {
    document.querySelector(e.target.hash).scrollIntoView({ behavior: 'smooth' })
  }
})

// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')

  if (!clicked) return

  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(t => t.classList.remove('operations__content--active'))
  clicked.classList.add('operations__tab--active')

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

const nav = document.querySelector('.nav')

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this
    })

    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky')
//   }
//   else {
//     nav.classList.remove('sticky')
//   }
// })

const header = document.querySelector('header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries

  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)

// Reveal Section
const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))

// Slider 
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

let curSlide = 0
const maxSlide = slides.length

// const slider = document.querySelector('.slider')
// slider.style.transform = 'scale(0.4) translateX(-800px)'
// slider.style.overflow = 'visible'

const goToSlide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`))
}

goToSlide(0)

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0
  } else {
    curSlide++
  }

  goToSlide(curSlide)
}

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1
  } else {
    curSlide--
  }
  goToSlide(curSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

// const message = document.createElement('div')
// message.classList.add('cookie-message')
// // message.textContent = 'We use cookied for improved functionality and analytics.'
// message.innerHTML = 'We use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>'

// const header = document.querySelector('.header')

// header.append(message)

// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   message.remove()
// })

// message.style.backgroundColor = '#37383d'

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'

// document.documentElement.style.setProperty('--color-primary', 'orangered')

// const logo = document.querySelector('.nav__logo')
// console.log(logo)

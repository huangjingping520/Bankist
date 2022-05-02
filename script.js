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



const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40)
})

const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open')
})
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'))
})

const words = ['beautiful', 'bold', 'human', 'meaningful', 'lasting']
let wordIdx = 0, charIdx = 0, deleting = false
const typingEl = document.getElementById('typingText')

function type() {
  const word = words[wordIdx]
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++charIdx)
    if (charIdx === word.length) {
      deleting = true
      setTimeout(type, 1800)
      return
    }
  } else {
    typingEl.textContent = word.slice(0, --charIdx)
    if (charIdx === 0) {
      deleting = false
      wordIdx = (wordIdx + 1) % words.length
    }
  }
  setTimeout(type, deleting ? 60 : 110)
}
type()

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      observer.unobserve(e.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.section-header, .service-card, .work-card, .about-content, .about-visual, .experience-card, .tech-category, .testimonial-card, .contact-info, .contact-form-wrapper, .stat-item').forEach((el, i) => {
  el.classList.add('reveal')
  if (i % 3 === 1) el.classList.add('reveal-delay-1')
  if (i % 3 === 2) el.classList.add('reveal-delay-2')
  observer.observe(el)
})

const statItems = document.querySelectorAll('.stat-item')
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target
      const target = parseInt(el.dataset.count)
      const suffix = el.dataset.suffix
      const numEl = el.querySelector('.stat-number')
      let current = 0
      const duration = 1400
      const step = target / (duration / 16)
      const timer = setInterval(() => {
        current = Math.min(current + step, target)
        numEl.textContent = Math.floor(current) + suffix
        if (current >= target) clearInterval(timer)
      }, 16)
      statObserver.unobserve(el)
    }
  })
}, { threshold: 0.5 })
statItems.forEach(el => statObserver.observe(el))

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    const filter = btn.dataset.filter
    document.querySelectorAll('.work-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter
      card.style.opacity = '0'
      card.style.transform = 'scale(0.95)'
      setTimeout(() => {
        card.classList.toggle('hidden', !match)
        if (match) {
          requestAnimationFrame(() => {
            card.style.opacity = '1'
            card.style.transform = 'scale(1)'
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
          })
        }
      }, 150)
    })
  })
})

const track = document.getElementById('testimonialsTrack')
const dotsContainer = document.getElementById('tNavDots')
const cards = track.querySelectorAll('.testimonial-card')
let current = 0

cards.forEach((_, i) => {
  const dot = document.createElement('button')
  dot.className = 'tNav-dot' + (i === 0 ? ' active' : '')
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`)
  dot.addEventListener('click', () => goTo(i))
  dotsContainer.appendChild(dot)
})

function goTo(idx) {
  current = idx
  const cardWidth = cards[0].offsetWidth + 24
  track.style.transform = `translateX(-${current * cardWidth}px)`
  dotsContainer.querySelectorAll('.tNav-dot').forEach((d, i) => d.classList.toggle('active', i === current))
}

document.getElementById('tPrev').addEventListener('click', () => goTo((current - 1 + cards.length) % cards.length))
document.getElementById('tNext').addEventListener('click', () => goTo((current + 1) % cards.length))

window.addEventListener('resize', () => goTo(current))

const form = document.getElementById('contactForm')
const submitBtn = document.getElementById('submitBtn')
const formSuccess = document.getElementById('formSuccess')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  submitBtn.disabled = true
  submitBtn.querySelector('.btn-text').textContent = 'Sending...'
  setTimeout(() => {
    form.querySelectorAll('input, select, textarea').forEach(el => el.value = '')
    submitBtn.style.display = 'none'
    formSuccess.hidden = false
  }, 1200)
})

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

// // Modal functionality
// const modal = document.getElementById('workModal')
// const modalClose = document.querySelector('.modal-close')

// // Open modal when clicking work-info
// document.querySelectorAll('.work-info').forEach(info => {
//   info.addEventListener('click', () => {
//     modal.style.display = 'block'
//     document.body.style.overflow = 'hidden'
//   })
// })

// // Close modal
// modalClose.addEventListener('click', () => {
//   modal.style.display = 'none'
//   document.body.style.overflow = 'auto'
// })

// // Close modal when clicking outside
// window.addEventListener('click', (e) => {
//   if (e.target === modal) {
//     modal.style.display = 'none'
//     document.body.style.overflow = 'auto'
//   }
// })

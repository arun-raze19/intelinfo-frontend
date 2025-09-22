import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ConfettiButton.css'

const ConfettiButton = ({ labelSubmit = 'Submit', labelSuccess = 'Success', redirectTo = null, externalHref = null }) => {
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const navigate = useNavigate()

  useEffect(() => {
    const button = buttonRef.current
    const canvas = canvasRef.current
    if (!button || !canvas) return

    const ctx = canvas.getContext('2d')
    const confetti = []
    const sequins = []

    // settings - reduced for better performance
    const confettiCount = 12
    const sequinCount = 6
    const gravityConfetti = 0.3
    const gravitySequins = 0.55
    const dragConfetti = 0.075
    const dragSequins = 0.02
    const terminalVelocity = 3
    let disabled = false

    const colors = [
      { front : '#7b5cff', back: '#6245e0' },
      { front : '#b3c7ff', back: '#8fa5e5' },
      { front : '#5c86ff', back: '#345dd1' }
    ]

    const resizeCanvas = () => {
      const rect = wrapperRef.current?.getBoundingClientRect()
      const width = rect ? rect.width : window.innerWidth
      const height = rect ? rect.height : window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resizeCanvas()

    const randomRange = (min, max) => Math.random() * (max - min) + min

    const initConfettoVelocity = (xRange, yRange) => {
      const x = randomRange(xRange[0], xRange[1])
      const range = yRange[1] - yRange[0] + 1
      let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range)
      if (y >= yRange[1] - 1) {
        y += (Math.random() < 0.25) ? randomRange(1, 3) : 0
      }
      return { x, y: -y }
    }

    function Confetto(originX, originY) {
      this.randomModifier = randomRange(0, 99)
      this.color = colors[Math.floor(randomRange(0, colors.length))]
      this.dimensions = { x: randomRange(5, 9), y: randomRange(8, 15) }
      this.position = { x: originX + randomRange(-40, 40), y: originY + randomRange(-10, 10) }
      this.rotation = randomRange(0, 2 * Math.PI)
      this.scale = { x: 1, y: 1 }
      this.velocity = initConfettoVelocity([-9, 9], [6, 11])
    }
    Confetto.prototype.update = function() {
      this.velocity.x -= this.velocity.x * dragConfetti
      this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity)
      this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09)
    }

    function Sequin(originX, originY) {
      this.color = colors[Math.floor(randomRange(0, colors.length))].back
      this.radius = randomRange(1, 2)
      this.position = { x: originX + randomRange(-60, 60), y: originY + randomRange(-4, 14) }
      this.velocity = { x: randomRange(-6, 6), y: randomRange(-8, -12) }
    }
    Sequin.prototype.update = function() {
      this.velocity.x -= this.velocity.x * dragSequins
      this.velocity.y = this.velocity.y + gravitySequins
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }

    const initBurst = () => {
      const rect = button.getBoundingClientRect()
      const wrapperRect = wrapperRef.current?.getBoundingClientRect()
      const offsetX = wrapperRect ? rect.left - wrapperRect.left + rect.width / 2 : canvas.width / 2
      const offsetY = wrapperRect ? rect.top - wrapperRect.top + rect.height / 2 : canvas.height / 2
      for (let i = 0; i < confettiCount; i++) confetti.push(new Confetto(offsetX, offsetY))
      for (let i = 0; i < sequinCount; i++) sequins.push(new Sequin(offsetX, offsetY))
    }

    let lastFrameTime = 0
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    const render = (currentTime) => {
      if (currentTime - lastFrameTime < frameInterval) {
        rafRef.current = window.requestAnimationFrame(render)
        return
      }
      lastFrameTime = currentTime

      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Only render if there are particles
      if (confetti.length > 0 || sequins.length > 0) {
        confetti.forEach((confetto, index) => {
          const w = (confetto.dimensions.x * confetto.scale.x)
          const h = (confetto.dimensions.y * confetto.scale.y)
          ctx.save()
          ctx.translate(confetto.position.x, confetto.position.y)
          ctx.rotate(confetto.rotation)
          confetto.update()
          ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back
          ctx.fillRect(-w / 2, -h / 2, w, h)
          ctx.restore()
          if (confetto.position.y >= height) confetti.splice(index, 1)
        })

        sequins.forEach((sequin, index) => {
          ctx.save()
          ctx.translate(sequin.position.x, sequin.position.y)
          sequin.update()
          ctx.fillStyle = sequin.color
          ctx.beginPath()
          ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI)
          ctx.fill()
          ctx.restore()
          if (sequin.position.y >= height) sequins.splice(index, 1)
        })
      }

      rafRef.current = window.requestAnimationFrame(render)
    }

    const clickButton = () => {
      if (disabled) return
      disabled = true
      button.classList.add('loading')
      button.classList.remove('ready')
      setTimeout(() => {
        button.classList.add('complete')
        button.classList.remove('loading')
        setTimeout(() => {
          initBurst()
          setTimeout(() => {
            disabled = false
            button.classList.add('ready')
            button.classList.remove('complete')
            if (externalHref) {
              // Use assign to allow custom protocols like upi:// on mobile
              window.location.assign(externalHref)
            } else if (redirectTo) {
              navigate(redirectTo)
            }
          }, 1200)
        }, 240)
      }, 900)
    }

    const setupTextAnimation = () => {
      const textElements = button.querySelectorAll('.button-text')
      textElements.forEach((element) => {
        const characters = element.textContent.split('')
        let characterHTML = ''
        characters.forEach((letter, index) => {
          characterHTML += `<span class="char${index}" style="--d:${index * 30}ms; --dr:${(characters.length - index - 1) * 30}ms;">${letter}</span>`
        })
        element.innerHTML = characterHTML
      })
    }

    // bind events
    button.addEventListener('click', clickButton)
    window.addEventListener('resize', resizeCanvas)

    // init
    setupTextAnimation()
    rafRef.current = window.requestAnimationFrame(render)

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
      button.removeEventListener('click', clickButton)
      window.removeEventListener('resize', resizeCanvas)
      // Clear arrays to prevent memory leaks
      confetti.length = 0
      sequins.length = 0
    }
  }, [])

  return (
    <div className="confetti-button-wrapper" ref={wrapperRef}>
      <button id="confetti-button" className="confetti-button ready" ref={buttonRef} type="button">
        <div className="message submitMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12.2">
            <polyline stroke="currentColor" points="2,7.1 6.5,11.1 11,7.1 "/>
            <line stroke="currentColor" x1="6.5" y1="1.2" x2="6.5" y2="10.3"/>
          </svg>
          <span className="button-text">{labelSubmit}</span>
        </div>

        <div className="message loadingMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17">
            <circle className="loadingCircle" cx="2.2" cy="10" r="1.6"/>
            <circle className="loadingCircle" cx="9.5" cy="10" r="1.6"/>
            <circle className="loadingCircle" cx="16.8" cy="10" r="1.6"/>
          </svg>
        </div>

        <div className="message successMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 11">
            <polyline stroke="currentColor" points="1.4,5.8 5.1,9.5 11.6,2.1 "/>
          </svg>
          <span className="button-text">{labelSuccess}</span>
        </div>
      </button>

      <canvas className="confetti-canvas" ref={canvasRef} />
    </div>
  )
}

export default ConfettiButton




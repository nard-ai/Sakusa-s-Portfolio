import { useEffect, useRef, useState } from 'react'
import Intro from './Intro'
import navLogo from './imports/logos/Sakusa Logo Black.svg'
import meTime from './imports/me-time.png'
import carousel1 from './imports/Carousel_1.png'
import carousel2 from './imports/Carousel_2.png'
import carousel3 from './imports/Carousel_3.png'
import carousel4 from './imports/Carousel_4.png'
import carousel5 from './imports/Carousel_5.png'
import carousel6 from './imports/Carousel_6.png'
import caseShipter from './imports/Carousel_1-1.png'
import caseWheyl from './imports/Carousel_5-1.png'
import meTime2 from './imports/me-time2.png'

const PORTRAIT = meTime

const SCREENS = [
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel6,
]

const ROTATING = ['UI/UX', 'GRAPHIC', 'PRODUCT']

const CASES = [
  {
    no: 'CASE 01',
    title: '404',
    italic: 'A Dead End, Reimagined',
    tags: '#WEB   #ERROR PAGE   #INTERACTION',
    partners: ['SHIPTER', 'WILSON', 'FRAMER', 'VERCEL', 'GSAP'],
    img: caseShipter,
  },
  {
    no: 'CASE 02',
    title: 'Fuel More Than',
    italic: 'Muscles',
    tags: '#WEB   #E-COMMERCE   #BRANDING',
    partners: ['WHEYL', 'SHOPIFY', 'STRIPE', 'KLAVIYO', 'ALGOLIA'],
    img: caseWheyl,
  },
]

function PinIcon() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="shrink-0">
      <path
        d="M4 0C1.79 0 0 1.79 0 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4Zm0 5.5A1.5 1.5 0 1 1 4 2.5a1.5 1.5 0 0 1 0 3Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M3 8h9M8 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Nav({
  page,
  onNavigate,
}: {
  page: 'design' | 'about'
  onNavigate: (p: 'design' | 'about') => void
}) {
  const [pulse, setPulse] = useState<null | 'design' | 'about'>(null)
  const [overFooter, setOverFooter] = useState(false)

  // On the design page, flip the nav to dark once the footer reveals behind it.
  useEffect(() => {
    if (page !== 'design') {
      setOverFooter(false)
      return
    }
    const onScroll = () => {
      const column = document.getElementById('scroll-column')
      if (!column) return
      // The white scrolling column covers the footer; once its bottom edge
      // lifts above the nav, the black footer sits behind the bar.
      setOverFooter(column.getBoundingClientRect().bottom <= 72)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [page])

  const dark = overFooter

  // Fire the dashed-ring pulse (restarting it even on repeated clicks).
  const firePulse = (which: 'design' | 'about') => {
    setPulse(null)
    requestAnimationFrame(() => setPulse(which))
  }

  const handleDesign = () => {
    firePulse('design')
    // Only navigate/scroll when coming from another page; stay put if already here.
    if (page !== 'design') onNavigate('design')
  }

  const handleAbout = () => {
    firePulse('about')
    onNavigate('about')
  }

  const base = 'px-2.5 py-1 tracking-[0.15em] transition-all duration-200'
  const btnClass = (active: boolean, which: 'design' | 'about') =>
    `${base} ${
      active
        ? dark
          ? 'bg-white text-black hover:bg-[#7ea04b] hover:text-white'
          : 'bg-black text-white hover:bg-[#7ea04b]'
        : `${dark ? 'text-white' : 'text-black'} hover:text-[#7ea04b]`
    } ${pulse === which ? 'animate-ring' : ''}`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        dark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <div className="flex flex-1 items-center gap-5">
          <button
            onClick={handleDesign}
            className="flex items-center justify-center"
          >
            <img src={navLogo} alt="SAKUSA" className={`h-6 w-auto ${dark ? 'invert' : ''}`} draggable={false} />
          </button>
          <span
            className={`hidden items-center gap-1.5 text-[11px] font-medium tracking-wide sm:flex ${
              dark ? 'text-white/70' : 'text-black/70'
            }`}
          >
            <PinIcon />
            SAN PEDRO, PHILIPPINES
          </span>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-xs font-medium tracking-wide md:flex">
          <button
            onClick={handleDesign}
            onAnimationEnd={() => setPulse(null)}
            className={btnClass(page === 'design', 'design')}
          >
            DESIGN
          </button>
          <button
            onClick={handleAbout}
            onAnimationEnd={() => setPulse(null)}
            className={btnClass(page === 'about', 'about')}
          >
            ABOUT
          </button>
        </nav>

        <div className="flex flex-1 justify-end">
          <a
            href="mailto:sahagunjrbernard@gmail.com"
            className={`text-[11px] font-medium tracking-wide transition-opacity ${
              dark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'
            }`}
          >
            sahagunjrbernard@gmail.com
          </a>
        </div>
      </div>
    </header>
  )
}

// Deleting + typing headline that cycles through ROTATING words.
function useTypewriter(words: string[], typeMs = 90, deleteMs = 45, holdMs = 1200) {
  const [text, setText] = useState(words[0])
  const [done, setDone] = useState(true)
  const state = useRef({ word: 0, char: words[0].length, deleting: false })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const s = state.current
      const full = words[s.word]
      if (!s.deleting) {
        s.char++
        setText(full.slice(0, s.char))
        if (s.char >= full.length) {
          setDone(true)
          s.deleting = true
          timer = setTimeout(tick, holdMs)
          return
        }
        setDone(false)
        timer = setTimeout(tick, typeMs)
      } else {
        s.char--
        setText(full.slice(0, s.char))
        setDone(false)
        if (s.char <= 0) {
          s.deleting = false
          s.word = (s.word + 1) % words.length
        }
        timer = setTimeout(tick, deleteMs)
      }
    }
    timer = setTimeout(tick, holdMs)
    return () => clearTimeout(timer)
  }, [words, typeMs, deleteMs, holdMs])

  return { text, done }
}

// Draggable, auto-drifting 3D coverflow band of screens.
function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offset = useRef(0)
  const drag = useRef({ active: false, startX: 0, startOffset: 0, moved: false })
  const paused = useRef(false)

  useEffect(() => {
    let raf = 0
    const startTime = performance.now()
    const step = () => {
      const track = trackRef.current
      const container = containerRef.current
      if (track && container) {
        let currentSpeed = 0.6
        const elapsed = performance.now() - startTime
        
        if (elapsed < 5000) {
          // The intro is fully covering the screen, spin extremely fast invisibly
          currentSpeed = 40
        } else if (elapsed < 8500) {
          // At 5s, the intro has slid up. We decelerate over the next 3.5s
          // so the user actually sees the fast spin slow down.
          const t = (elapsed - 5000) / 3500
          const easeOut = Math.pow(1 - t, 3)
          currentSpeed = 0.6 + (40 - 0.6) * easeOut
        }

        if (!paused.current && !drag.current.active) offset.current -= currentSpeed
        const half = track.scrollWidth / 2
        if (half > 0) {
          if (offset.current <= -half) offset.current += half
          if (offset.current > 0) offset.current -= half
        }
        track.style.transform = `translateX(${offset.current}px)`

        // Coverflow: angle each card toward the center.
        const cx = container.getBoundingClientRect().left + container.offsetWidth / 2
        for (const child of Array.from(track.children) as HTMLElement[]) {
          const r = child.getBoundingClientRect()
          const d = (r.left + r.width / 2 - cx) / container.offsetWidth
          const rot = Math.max(-1, Math.min(1, d)) * -22
          const scale = 1 - Math.min(Math.abs(d), 0.6) * 0.18
          child.style.transform = `rotateY(${rot}deg) scale(${scale})`
          child.style.zIndex = String(100 - Math.round(Math.abs(d) * 100))
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onDown = (e: React.PointerEvent) => {
    drag.current = { active: true, startX: e.clientX, startOffset: offset.current, moved: false }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 4) drag.current.moved = true
    offset.current = drag.current.startOffset + dx
  }
  const onUp = () => {
    drag.current.active = false
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 cursor-grab select-none overflow-hidden [perspective:1600px] active:cursor-grabbing"
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
      }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-6 [transform-style:preserve-3d] will-change-transform"
      >
        {SCREENS.concat(SCREENS).map((src, i) => (
          <div
            key={i}
            className="group relative aspect-[4/3] h-[clamp(200px,38vh,440px)] shrink-0 origin-center overflow-hidden rounded-xl bg-neutral-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5 [transform-style:preserve-3d]"
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  const { text, done } = useTypewriter(ROTATING)

  return (
    <section className="sticky top-0 z-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-white">
      {/* 3D draggable coverflow band */}
      <Carousel />

      {/* Giant typewriter headline — only the prefix types/deletes, DESIGN stays */}
      <h1 className="pointer-events-none relative z-10 mt-[8vh] -mb-[6vh] flex items-baseline justify-center whitespace-nowrap font-black uppercase leading-[0.85] tracking-tight text-black [font-size:clamp(30px,8vw,110px)]">
        <span>{text}</span>
        <span
          className={`inline-block w-[0.06em] [height:0.82em] self-center bg-black ${
            done ? 'animate-pulse' : 'opacity-100'
          }`}
          aria-hidden
        />
        <span className="ml-[0.25em]">DESIGN</span>
      </h1>

      {/* Portrait in front */}
      <img
        src={PORTRAIT}
        alt="Bernard Sakusa, UI/UX designer"
        draggable={false}
        className="pointer-events-none relative z-20 h-[clamp(440px,82vh,960px)] w-auto object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.18)]"
      />

    </section>
  )
}

// Sequential pinning: each case is a full-screen sticky panel. Because the
// panels share top-0 and later panels paint above earlier ones, each new
// section scrolls up, covers the previous, and pins full-screen in turn.
function CaseSection({ c, index }: { c: (typeof CASES)[number]; index: number }) {
  const [hover, setHover] = useState(false)
  const [exploreOpacity, setExploreOpacity] = useState(1)

  // Fade the EXPLORE tab out as the user scrolls down from the top.
  useEffect(() => {
    if (index !== 0) return
    const onScroll = () => {
      setExploreOpacity(Math.max(0, 1 - window.scrollY / 220))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [index])

  return (
    <section
      id={index === 0 ? 'work' : undefined}
      style={{ zIndex: index + 1 }}
      className="sticky top-0 h-screen w-full pt-[64px]"
    >
      {/* EXPLORE tab on the first case — rides up steadily with the section */}
      {index === 0 && (
        <button
          type="button"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          style={{ opacity: exploreOpacity, pointerEvents: exploreOpacity < 0.05 ? 'none' : 'auto' }}
          className="absolute left-1/2 top-[64px] z-30 flex h-[68px] w-[42px] -translate-x-1/2 -translate-y-full cursor-pointer flex-col items-center justify-start gap-1.5 rounded-t-full rounded-b-md bg-black pt-3 text-white transition-opacity duration-150 hover:-translate-y-[calc(100%-3px)]"
        >
          <span className="text-[7px] font-semibold tracking-[0.18em]">EXPLORE</span>
          <Arrow className="rotate-90" />
        </button>
      )}

      <div className="flex h-full w-full flex-col overflow-hidden border-y border-black/12 bg-white">
        <div className="flex items-center justify-between border-b border-black/12 px-5 py-2 text-[10px] font-medium tracking-[0.18em] text-black/40">
          <span>{c.no}</span>
          <span>{String(index + 1).padStart(2, '0')} / {String(CASES.length).padStart(2, '0')}</span>
        </div>

        <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
          {/* Left — product image */}
          <div
            className="relative overflow-hidden bg-neutral-100"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              src={c.img}
              alt={`${c.title} ${c.italic}`}
              className={`h-full w-full object-contain transition-all duration-700 ${
                hover ? 'scale-105' : ''
              }`}
            />
          </div>

          {/* Right — copy */}
          <div className="flex flex-col justify-center gap-8 border-t border-black/12 px-6 py-12 md:border-l md:border-t-0 md:px-14">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-semibold tracking-wide text-black/30">
              {c.partners.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <h2 className="font-display text-[clamp(40px,5.5vw,88px)] font-black leading-[0.95] tracking-tight">
              {c.title}
              <br />
              <span className="italic font-medium" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
                {c.italic}
              </span>
            </h2>
            <p className="text-xs font-medium tracking-[0.18em] text-black/40">{c.tags}</p>
            {/* <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-black px-6 py-3 text-sm font-semibold tracking-wide transition-colors hover:bg-black hover:text-white"
            >
              DEEP DIVE
              <Arrow className="transition-transform group-hover:translate-x-1" />
            </a> */}
          </div>
        </div>
      </div>
    </section>
  )
}

function Cases() {
  return (
    <div>
      {CASES.map((c, i) => (
        <CaseSection key={c.no} c={c} index={i} />
      ))}
    </div>
  )
}

function Contact() {
  return (
    <section
      id="contact"
      className="flex h-full w-full flex-col justify-center bg-black px-5 text-white sm:px-8"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <p className="mb-6 text-xs font-medium tracking-[0.2em] text-white/40">( CONTACT )</p>
        <h2 className="font-display text-[clamp(40px,9vw,130px)] font-black leading-[0.9] tracking-tight">
          LET&apos;S BUILD
          <br />
          SOMETHING.
        </h2>
        <div className="mt-12 flex flex-col gap-8 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="mailto:sahagunjrbernard@gmail.com"
            className="text-lg font-medium tracking-tight transition-opacity hover:opacity-60 sm:text-2xl"
          >
            sahagunjrbernard@gmail.com
          </a>
          <div className="flex gap-6 text-xs font-medium tracking-[0.15em] text-white/60">
            <a
              href="https://www.linkedin.com/in/bernard-sahagun-jr-1b7074255/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              LINKEDIN
            </a>
            <a
              href="https://web.facebook.com/ardisekaii/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              FACEBOOK
            </a>
            <a
              href="https://www.instagram.com/ardisekaii?igsh=M2hzN2h6OG5hNnV3"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              INSTAGRAM
            </a>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between text-[11px] tracking-wide text-white/40">
          <span>SAKUSA © 2026</span>
          <span>SAN PEDRO, PHILIPPINES</span>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="min-h-screen bg-white px-5 pb-24 pt-32 text-black sm:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        {/* Portrait */}
        <div className="md:sticky md:top-32 md:self-start">
          <div className="aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-black/5">
            <img
              src={meTime2}
              alt="Bernard Sakusa"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col justify-center gap-8">
          <p className="text-xs font-medium tracking-[0.25em] text-[#7ea04b]">( ABOUT )</p>
          <p className="font-display text-[clamp(26px,3.4vw,46px)] font-medium leading-[1.2] tracking-tight">
            I&apos;m Bernard, a UI/UX designer focused on creating clean, intuitive, and thoughtful
            digital experiences.
          </p>
          <div className="max-w-xl space-y-5 text-base leading-relaxed text-black/60">
            <p>
              I enjoy turning ideas into interfaces that feel purposeful, engaging, and easy to use —
              from the first concept to the final screen.
            </p>
            <p>
              Sakusa is the name behind my portfolio, inspired by one of my favorite players from
              Haikyuu!!, Sakusa Kiyoomi. I chose the name as a small personal touch — something that
              reflects one of the things I enjoy while giving my portfolio its own identity.
            </p>
            <p>
              I care about the details that make a design feel complete, from typography and layout
              to interaction, visual hierarchy, and the overall experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-black/12 pt-6 text-xs font-medium tracking-[0.15em] text-black/50">
            <span>UI / UX DESIGN</span>
            <span>PRODUCT DESIGN</span>
            <span>PROTOTYPING</span>
            <span>VISUAL DESIGN</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [page, setPage] = useState<'design' | 'about'>('design')
  const [introDone, setIntroDone] = useState(false)

  const navigate = (p: 'design' | 'about') => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <main
      className="min-h-screen bg-white text-black antialiased"
    >
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <Nav page={page} onNavigate={navigate} />

      {page === 'about' ? (
        <About />
      ) : (
        <>
          {/* Scrolling column: hero pins, cases stack — sits above the footer and
              leaves a viewport-tall gap so the footer behind can be revealed. */}
          <div id="scroll-column" className="relative z-10 mb-[100vh] bg-white">
            <Hero />
            <Cases />
          </div>

          {/* Footer pinned behind the column — revealed as the last case lifts up */}
          <div className="fixed inset-x-0 bottom-0 z-0 h-screen">
            <Contact />
          </div>
        </>
      )}
    </main>
  )
}

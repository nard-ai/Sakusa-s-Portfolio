import { useEffect, useState } from 'react'
import logoIntro from '../Logo Size for Intro.svg'
import logoIntroColor from '../Logo Size for intro animation color.svg'

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden'

    // At 3.5s we start sliding up the overlay
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 3500)

    // At 4.5s we remove the component entirely and restore scroll
    const doneTimer = setTimeout(() => {
      setIsDone(true)
      document.body.style.overflow = ''
      onComplete()
    }, 4500)

    return () => {
      document.body.style.overflow = ''
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  if (isDone) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isFadingOut ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="relative flex flex-col items-center animate-intro-logo-shrink">
        {/* Black logo (base layer) */}
        <img
          src={logoIntro}
          alt="BERNARD.DESIGN"
          className="h-auto w-auto max-h-[clamp(80px,15vh,180px)] max-w-[92vw] object-contain"
          draggable={false}
        />
        {/* Color logo (fades in on top) */}
        <img
          src={logoIntroColor}
          alt="BERNARD.DESIGN"
          className="absolute inset-0 h-full w-full object-contain animate-intro-logo-fade"
          draggable={false}
        />
      </div>
    </div>
  )
}

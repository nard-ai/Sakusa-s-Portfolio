import hero from './imports/Client/wedding/hero-1.jpg'
import together from './imports/Client/wedding/together.jpg'
import yesMoment from './imports/Client/wedding/yes-moment.jpg'
import field from './imports/Client/wedding/field.jpg'
import entrance from './imports/Client/wedding/entrance.jpg'
import cover from './imports/Client/nick-rizelle-wedding.jpg'

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

const FACTS = [
  ['PLATFORM', 'WEB'],
  ['ROLE', 'UI / UX DESIGN'],
  ['FORMAT', 'WEDDING INVITATION'],
]

const BLOCKS = [
  {
    kicker: 'A PROFILE, NOT A PROGRAM',
    title: 'Guests move through the day the way you would a match.',
    body: 'Story, the wedding day, attire, the people, photos, questions, and gifts are prompt cards. Each one can be liked. The invitation stays one long profile instead of a stack of separate pages.',
    img: together,
    alt: 'Nick and Rizelle together',
  },
  {
    kicker: 'THE REPLY CLOSES THE MATCH',
    title: 'RSVP is the last step, not a form sitting off to the side.',
    body: 'A meter fills as a guest likes the prompts. Saying yes or no finishes it. They leave a name, how many seats, and a note, and they keep a ticket for the day.',
    img: entrance,
    alt: 'The invitation entrance',
  },
  {
    kicker: 'THE DAY IS EASY TO FIND',
    title: 'January 21, 2027, 3:30 PM, in Amadeo, Cavite.',
    body: 'The venue sits near Tagaytay. Guests get a map, directions, and a calendar file, plus what to wear and who will be there, without leaving the profile.',
    img: field,
    alt: 'The couple in a field',
  },
]

export default function WeddingStudy({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative z-10 bg-white pb-24 pt-28 text-black md:pt-24">
      <button
        type="button"
        onClick={onClose}
        className="fixed left-4 top-28 z-40 inline-flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.16em] md:left-8 md:top-[4.75rem]"
      >
        <Arrow className="rotate-180" />
        GALLERY
      </button>

      <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 md:grid-cols-2 md:px-8">
        <div className="overflow-hidden rounded-2xl bg-neutral-100">
          <img src={cover} alt="Nick and Rizelle invitation intro" className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-xs font-medium tracking-[0.2em] text-black/40">CASE 02</p>
          <h1 className="font-display text-[clamp(40px,6vw,84px)] font-black leading-[0.92] tracking-tight">
            Nick & Rizelle
            <br />
            <span className="font-medium italic">Wedding Invitation</span>
          </h1>
          <p className="text-xs font-medium tracking-[0.18em] text-black/40">#WEB   #INVITATION   #RSVP</p>
        </div>
      </section>

      <section className="bg-black px-5 py-16 text-white md:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-3">
          {FACTS.map(([label, value]) => (
            <div key={label}>
              <p className="text-[11px] font-medium tracking-[0.18em] text-white/40">{label}</p>
              <p className="mt-2 text-sm font-semibold tracking-wide">{value}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-[1200px] text-base leading-relaxed text-white/80 md:text-lg">
          Nick & Rizelle is a wedding invitation built like a dating profile. Guests walk the couple&apos;s story, like the parts they care about, and RSVP to close the match. The site covers how they met, the yes, the venue, the wedding party, and the photos.
        </p>
      </section>

      {BLOCKS.map((block, i) => (
        <section
          key={block.kicker}
          className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8"
        >
          <div className={`overflow-hidden rounded-2xl bg-neutral-100 ${i % 2 ? 'md:order-2' : ''}`}>
            <img src={block.img} alt={block.alt} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#7ea04b]">{block.kicker}</p>
            <h2 className="font-display text-[clamp(28px,3vw,44px)] font-black leading-[1.05] tracking-tight">{block.title}</h2>
            <p className="max-w-xl text-base leading-relaxed text-black/60">{block.body}</p>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[1200px] px-5 md:px-8">
        <img src={yesMoment} alt="The moment she said yes" className="aspect-[16/8] w-full rounded-2xl object-cover" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <img src={hero} alt="A portrait from the invitation" className="aspect-[4/5] w-full rounded-2xl object-cover" />
          <img src={field} alt="The couple outdoors" className="aspect-[4/5] w-full rounded-2xl object-cover" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="group mt-12 inline-flex items-center gap-3 rounded-full border border-black px-6 py-3 text-sm font-semibold tracking-wide transition-colors hover:bg-black hover:text-white"
        >
          <Arrow className="rotate-180 transition-transform group-hover:-translate-x-1" />
          BACK TO GALLERY
        </button>
      </section>
    </div>
  )
}

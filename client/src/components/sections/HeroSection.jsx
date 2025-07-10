import Budget from './Budget';

function HeroSection() {
  return (
    <div className='bg-[var(--white)] text-[var(--black)]'>
      <div className='px-4 max-w-screen-xl mx-auto py-[.75em] md:py-[1em] lg:py-[2em]'>
        <h1 className="text-2xl font-medium lg:text-4xl">
          Hello [User]
        </h1>
        <p className='lg:text-lg'>
          Hope you're doing well! Just a quick heads-up — the weather will be [weather] today.
        </p>  
      </div>
    </div>
  )
}

export default HeroSection
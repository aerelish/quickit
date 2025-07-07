import Budget from './Budget';

function Hero() {
  return (
    <div className='my-[.75em] md:my-[1em] lg:my-[2em]'>
      <div className=''>
        <h1 className="text-2xl font-medium lg:text-4xl">
          Hello [User]
        </h1>
        <p className='lg:text-lg'>
          Hope you're doing well! Just a quick heads-up — the weather will be [weather] today.
        </p>  
      </div>
      {/* <Budget/> */}
    </div>
  )
}

export default Hero
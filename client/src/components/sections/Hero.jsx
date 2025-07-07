import Budget from './Budget';

function Hero() {
  return (
    <div className="mt-4 py-4 px-3 md:px-8 lg:px-24 max-w-7xl mx-auto flex flex-col">
      <div>
        <h1 className="text-2xl font-medium">
          Hello [User]
        </h1>
        <p>
          Hope you're doing well! Just a quick heads-up — the weather will be [weather] today.
        </p>  
      </div>
      {/* <Budget/> */}
    </div>
  )
}

export default Hero
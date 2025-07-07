import Budget from './Budget';

function Hero() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-medium">
          Hello [User]
        </h1>
        <p>
          Hope you're doing well! Just a quick heads-up — the weather will be [weather] today.
        </p>  
      </div>
      {/* <Budget/> */}
    </>
  )
}

export default Hero
import HeroSection from "../sections/HeroSection"

function HomeLayout({
  leftCol,
  rightCol
}) {
  return (
    <>
      <HeroSection/>
      <div className="flex">
        <div className="flex flex-col">
          { leftCol }
        </div>
        { rightCol }
      </div>
      
    </>
  )
}

export default HomeLayout
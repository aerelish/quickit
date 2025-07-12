import clsx from "clsx"
import { useScreen } from "@/hooks/useScreen"
import HeroSection from "@/components/sections/HeroSection"

function HomeLayout({
  leftCol,
  rightCol
}) {

  const { isMobile } = useScreen();

  return (
    <>
      <HeroSection/>
      <div className={clsx("flex gap-4 p-4", isMobile && "flex-col")}>
        <div className="basis-1/3 flex flex-col min-w-0">
          { leftCol }
        </div>
        <div className="basis-2/3">
          { rightCol }
        </div>
      </div>
      
    </>
  )
}

export default HomeLayout
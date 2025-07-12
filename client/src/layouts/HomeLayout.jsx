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
      <div className={clsx("max-w-screen-xl mx-auto flex justify-center gap-4 p-4", isMobile && "flex-col")}>
        <div className="basis-1/2 lg:basis-1/3 flex flex-col min-w-0 space-y-4">
          { leftCol }
        </div>
        <div className="basis-1/2 lg:basis-2/3">
          { rightCol }
        </div>
      </div>
    </>
  )
}

export default HomeLayout
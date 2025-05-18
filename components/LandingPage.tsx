import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo from "../public/devfusion-logo.svg"

export default function LandingPage() {
  return (
    <>
    <div className="flex flex-col pt-[90px] min-h-screen h-screen overflow-x-hidden overflow-y-hidden">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full h-[calc(100vh-90px)] flex items-center py-0 bg-gradient-to-b from-background to-muted overflow-hidden">
          <div className="container px-2 sm:pl-10 md:px-6 sm:pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_600px] gap-6 lg:gap-12 h-full items-center pb-6 md:pb-0">
              <div className="flex flex-col justify-center items-center space-y-4 px-2 sm:px-6">
                <div className="space-y-3 ">
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none break-words text-center">
                    Where Code Minds Unite
                  </h1>
                  <p className="max-w-full sm:max-w-[600px] text-muted-foreground text-base sm:text-xl text-center">Collaborate. Code. Create.</p>
                  <p className="max-w-full sm:max-w-[600px] text-muted-foreground text-sm sm:text-base sm:px-4 text-center">
                    Welcome to DevFusion, the ultimate live coding collaboration platform for developers, teams, and
                    learners. Build together in real time—whether you're hacking on a new idea, solving problems as a
                    team, or just jamming with devs around the world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row w-full items-center justify-center">
                  <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link href="/browse-room">Get Started →</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <Image
                  src={logo}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '80%', maxWidth: 250, height: 'auto' }}
                  alt="DevFusion Logo"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  )
}

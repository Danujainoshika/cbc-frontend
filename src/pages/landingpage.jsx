import { AboutSection } from "../components/aboutsection";
import { BenefitSection } from "../components/benifitsection";
import { HeroSection } from "../components/herosection";

export function LandingPage() {
    return (
        <div  className="w-full min-h-[calc(100%-100px)] bg-primary flex flex-col justify-center items-center overflow-y-scroll ">
            <HeroSection/>
            <BenefitSection/>
            <AboutSection/>
        </div>
    )
}
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import "../../assets/css/main.css";
// import BackgroundUrl from "../../images/ministry.jpg";

interface TitlePageProps {
  titleText: string;
  backgroundImageUrl?: string;
}

export default function TitlePage({
  titleText,
  backgroundImageUrl,
}: TitlePageProps) {
  useEffect(() => {
    ScrollReveal().reveal(".title", {
      delay: 400,
      duration: 2000,
      distance: "50px",
      origin: "bottom",
    });
  }, []);
  return (
    <div>
      <div className="title-wrapper w-full bg-neutral-900 relative">
        <div
          className="title-section bg-cover bg-center bg-no-repeat mx-auto max-w-custom w-full flex h-[50vh] justify-center items-center max-sm:h-[15vh]"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
          }}
        >
          <h1 className="title text-8xl pt-20 text-white font-mont font-semibold z-10 title-glow max-sm:text-4xl">
            {titleText}
          </h1>
        </div>
      </div>
    </div>
  );
}

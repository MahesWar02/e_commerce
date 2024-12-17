import React from "react";
import HeroImage from "../assets/Hero.png";

const Hero = () => {
  return (
    <div
      className="hero mt-6 h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center p-6 md:px-12 md:py-36">
        <div className="max-w-md mx-auto">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-10">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn glass text-white hover:bg-indigo-300">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

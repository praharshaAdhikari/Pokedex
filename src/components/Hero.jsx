import { useState } from "react";
import { useKeywordStore } from "../store";

const Hero = () => {
  const [input, setInput] = useState("");
  const keyword = useKeywordStore((state) => state.keyword);
  const setKeyword = useKeywordStore((state) => state.setKeyword);
  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(input);
  };

  return (
    <div className="h-screen flex items-center md:h-auto md:block bg-neutral-900">
      <div className="bg-transparent">
        <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-white font-black leading-10">
              Everything about a
              <span className="text-red-500">{" Pokémon "}</span>
              that you need to know.
            </h1>
            <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-300 font-normal text-center text-xl">
              A pokédex with name, type and images of the original 151 pokémon.
            </p>
          </div>
          <div className="flex w-11/12 md:w-8/12 xl:w-6/12">
            <form className="flex rounded-md w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full p-4 rounded-md rounded-r-none outline-none border-gray-300 bg-gray-500 placeholder:text-gray-300 text-white border-none text-xl"
                placeholder="Enter name or type of a pokémon"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="inline-flex items-center gap-2 bg-red-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md">
                <span className="font-bold text-xl">FIND</span>
                <svg
                  className="text-gray-200 h-5 w-5 p-0 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  xmlSpace="preserve"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

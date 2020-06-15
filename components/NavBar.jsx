import React from "react";
import tw from "twin.macro";
import "tailwindcss/dist/base.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
const NavBar = () => {
  return (
    <nav
      tw="py-2 flex lg:justify-end mb-2 shadow justify-center items-center"
      style={{
        lineHeight: "initial",
        backgroundColor: "initial",
        height: "initial",
        fontFamily: "Roboto",
      }}
    >
      <div tw="text-white">
        <button tw="px-4 py-2 mr-5 bg-blue-600 rounded text-lg">
          <FontAwesomeIcon icon={faLinkedin} />
          <span tw="inline-block ml-2">Connect Linkedin</span>
        </button>
        <button tw="px-4 py-2 mr-5 bg-gray-700 rounded text-lg">
          <FontAwesomeIcon icon={faGithub} />
          <span tw="inline-block ml-2">Connect Github</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

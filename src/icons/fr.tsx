import React from "react";

const Fr: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 512 512" {...props}><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#d80027" d="M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"/><path fill="#0052b4" d="M0 256a256 256 0 0 0 167 240V16A256 256 0 0 0 0 256z"/></svg>
);

export default Fr;

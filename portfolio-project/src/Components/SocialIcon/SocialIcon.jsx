import React from "react";

const SocialIcon = ({ src, alt }) => {
  let path = src;
  if (typeof src === "object" && src !== null) {
    path = src.src || src.default;
  }
  if (typeof path !== "string") {
    console.error("Invalid path:", path);
    return null;
  }

  const iconName = path.replace(/\.svg$/, "").replace("/icons/", "");

  return (
    <a
      href={path}
      className="w-9 h-9 bg-[#c8c8ce] hover:bg-[#c8c8cb] rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-secondary transition-colors"
      aria-label={alt}
      title={alt}
    >
      <svg
        className="w-7 h-7  hover: transition-all hover:scale-120"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="img"
      >
        <title>{alt}</title>
        <use href={`#icon-${iconName}`} />
      </svg>
    </a>
  );
};

export default SocialIcon;

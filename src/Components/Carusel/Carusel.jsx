import React from "react";
import Carousel from "react-material-ui-carousel";
import s from "./Carusel.module.css";
const items = [
  {
    name: "React.js",
    description: "Опис першого слайду",
    image: "/images/Home.png",
  },
  {
    name: "Open Source",
    description: "Опис другого слайду",
    image: "/images/Contacts.png",
  },
  {
    name: "Developer ",
    description: "Опис третього слайду",
    image: "/icons/undraw_developer.svg",
  },
  {
    name: "Developer",
    description: "Опис третього слайду",
    image: "/icons/undraw_code_thinking.svg",
  },
  {
    name: "Developer ",
    description: "Опис третього слайду",
    image: "/icons/undraw_building.svg",
  },
];

function Item(props) {
  return (
    <div
      style={{
        position: "relative",
        height: "700px",
        width: "1200px",
        margin: "0 auto",
        backgroundImage: `url(${props.item.image})`,
        backgroundSize: "cover",
        color: "primary",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className={s.slide}
    >
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </div>
  );
}

function MyCarousel() {
  return (
    <Carousel
      autoPlay={true}
      interval={2000}
      animation="fade"
      animationDuration={1000}
      indicators={true}
      navButtonsAlwaysVisible
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

export default MyCarousel;

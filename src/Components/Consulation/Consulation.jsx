import React from "react";
import { RiArrowRightLine } from "react-icons/ri";

const Consultation = () => {
  return (
    <div
      className=" w-1/3 h-full hover:shadow-2xl hover:rounded-xl cursor-pointer hover:scale-102 hover:bg-[linear-gradient(90deg,rgba(00,00,00,0.6),rgba(94,96,209,0.6))] transition duration-500 hover:border-2 hover:border-[#5e60ce]"
      id="consultation"
    >
      <div className="container mx-auto ">
        <div className="rounded-xl p-8 shadow-md relative overflow-hidden">
          {/* Gradient background with opacity */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(00,00,00,0.6),rgba(94,96,209,0.6))] z-0"></div>

          <div className="flex flex-col md:flex-col items-center gap-2 relative z-10">
            <div className="w-full md:w-3/3">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-100">
                Готові обговорити ваш проєкт?
              </h3>
              <p className="text-gray-200 mb-6 text-lg">
                Розкажіть нам про вашу ідею, і ми допоможемо втілити її в життя.
                Наша команда експертів готова відповісти на всі ваші запитання
                та запропонувати оптимальне рішення.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center bg-gradient-to-r from-primary to-[#5e60ce] text-white px-8 py-3 rounded-full font-medium transition-all hover:opacity-90 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300 mb-6"
              >
                Замовити
                <RiArrowRightLine className="ml-2 text-xl" />
              </a>
            </div>
            <div className="w-full">
              <div className="h-48 md:h-54 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 ">
                <img
                  src="https://readdy.ai/api/search-image?query=business%2520team%2520discussing%2520mobile%2520app%2520project%252C%2520professional%2520meeting%252C%2520designers%2520and%2520developers%2520collaborating%252C%2520modern%2520office%2520setting%252C%2520yellow%2520accent%2520lighting%252C%2520high%2520quality%2520professional%2520photo&width=500&height=300&seq=11&orientation=landscape"
                  alt="Консультація з розробки мобільних додатків"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;

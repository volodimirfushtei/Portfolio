import React from "react";

const ContactForm = () => {
  return (
    <div className="flex w-118 h-full flex-col md:flex-row gap-2 text-left">
      <div className="w-full md:min-w-1/2">
        <div className="bg-[linear-gradient(90deg,rgba(0,255,231,0.1),rgba(94,96,206,0.1))] p-8 rounded-lg shadow-xl hover:shadow-2xl ">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-100 mb-1">
                Ім&apos;я
              </label>
              <input
                type="text"
                id="name"
                className="form-input w-100 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none"
                placeholder="Ваше ім'я"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-100 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input w-100 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none"
                placeholder="Ваш email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-100 mb-1">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                className="form-input w-100 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none"
                placeholder="Ваш телефон"
              />
            </div>

            <div>
              <label
                htmlFor="project-type"
                className="block text-gray-100 mb-1"
              >
                Тип проєкту
              </label>
              <div className="relative">
                <select
                  id="project-type"
                  defaultValue=""
                  className="form-input w-100 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none appearance-none pr-8"
                >
                  <option value="" disabled>
                    Оберіть тип проєкту
                  </option>
                  <option value="e-commerce">E-commerce додаток</option>
                  <option value="social">Соціальний додаток</option>
                  <option value="business">Бізнес-додаток</option>
                  <option value="entertainment">Розважальний додаток</option>
                  <option value="other">Інше</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-500"></i>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-100 ">
                Опис проєкту
              </label>
              <textarea
                id="message"
                rows="5"
                className="form-input w-100 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none"
                placeholder="Розкажіть детальніше про ваш проєкт..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-[#5e60ce] w-100 text-white py-3 px-6 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-600 transition duration-300 ease-in-out cursor-pointer"
            >
              Відправити
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

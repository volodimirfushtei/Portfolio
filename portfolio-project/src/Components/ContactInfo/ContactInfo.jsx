import React from "react";

import SocialIcon from "../SocialIcon/SocialIcon";

const ContactInfo = ({ items }) => {
  return (
    <div className="w-1/2">
      <div className="bg-inherit p-8 rounded-lg shadow-xl h-full hover:shadow-2xl">
        <div className="space-y-6 mb-4 text-left">
          {/* Email */}
          <div className="flex items-start">
            <div className="w-12 h-12  bg-opacity-10 rounded-full flex items-center justify-center mr-4 shrink-0">
              <i className="ri-mail-line text-primary ri-lg hover:text-[#dedfe5]"></i>
            </div>
            <div>
              <h5 className="font-semibold mb-1 capitalize text-[#dedee5]">
                Email
              </h5>
              <p className="text-gray-400">fuschteyy@gmail.com</p>
            </div>
          </div>

          {/* Телефон */}
          <div className="flex items-start">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 shrink-0">
              <i className="ri-phone-line text-primary ri-lg hover:text-[#dedee5]"></i>
            </div>
            <div>
              <h5 className="font-semibold mb-1 text-[#dedee5]">Телефон</h5>
              <p className="text-gray-400">+380 95 877 71 07</p>
            </div>
          </div>

          {/* Робочий час */}
          <div className="flex items-start">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 shrink-0">
              <i className="ri-time-line text-primary ri-lg hover:text-[#dedee5]"></i>
            </div>
            <div>
              <h5 className="font-semibold mb-1 text-[#dedee5]">Робочий час</h5>
              <p className="text-gray-400">Пн-Пт: 9:00 - 18:00</p>
            </div>
          </div>
        </div>

        {/* Соціальні мережі */}
        <div className="mb-8">
          <h5 className="font-semibold mb-4 text-[#dedee5]">
            Соціальні мережі
          </h5>
          <div className="flex space-x-4">
            {items.map((item) => (
              <SocialIcon key={item.alt} src={item.src} alt={item.alt} />
            ))}
          </div>
        </div>

        {/* Мапа */}
        <div className="h-64 rounded-lg overflow-hidden">
          <div
            style={{
              backgroundImage:
                "url('https://public.readdy.ai/gen_page/map_placeholder_1280x720.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-full h-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

import React from "react";
import s from "./ContactForm.module.css";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onBlur", // Валідація при втраті фокусу
  });

  const onSubmit = async (data) => {
    try {
      if (data.subscribe) {
        const response = await fetch("http://localhost:5000/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ Server error:", response.status, errorText);
          toast.error("Помилка підписки");
          throw new Error("Помилка підписки");
        }

        console.log("✅ Subscription successful");
        alert("✅ Subscription successful");
      }

      //  повідомлення в Telegram

      const response = await fetch("http://localhost:5000/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server error:", response.status, errorText);
        toast.error("Помилка відправки повідомлення");
        throw new Error("Помилка відправки повідомлення");
      }

      console.log("✅ Message sent successfully");
      alert("✅ Message sent successfully");
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={s.formContainer}>
      <div className={`${s.card} ${s.card_contact}`}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.cardHeader}>
            <h2 className={s.cardTitle}>Contact Us</h2>
          </div>

          <div className={s.cardBody}>
            <div className={s.nameFields}>
              <div className={s.formGroup}>
                <input
                  className={`${s.formControl} ${
                    errors.firstName ? s.error : ""
                  }`}
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "Minimum 2 characters",
                    },
                  })}
                />
                <label className={s.bmdLabelFloating} htmlFor="firstName">
                  First name
                </label>
                {errors.firstName && (
                  <span className={s.errorMessage}>
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className={s.formGroup}>
                <input
                  className={`${s.formControl} ${
                    errors.lastName ? s.error : ""
                  }`}
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                <label className={s.bmdLabelFloating} htmlFor="lastName">
                  Last name
                </label>
                {errors.lastName && (
                  <span className={s.errorMessage}>
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className={s.formGroup}>
              <input
                className={`${s.formControl} ${errors.email ? s.error : ""}`}
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <label className={s.bmdLabelFloating} htmlFor="email">
                Email address
              </label>
              {errors.email && (
                <span className={s.errorMessage}>{errors.email.message}</span>
              )}
            </div>

            <div className={s.formGroup}>
              <textarea
                id="message"
                className={`${s.formControl} ${errors.message ? s.error : ""}`}
                rows="6"
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 characters",
                  },
                })}
              ></textarea>
              <label className={s.bmdLabelFloating} htmlFor="message">
                Your Message
              </label>
              {errors.message && (
                <span className={s.errorMessage}>{errors.message.message}</span>
              )}
            </div>
          </div>

          <div className={s.cardFooter}>
            <div className={s.formCheck}>
              <label className={s.formCheckLabel}>
                <input
                  type="checkbox"
                  id="subscribe"
                  {...register("subscribe")}
                  className={s.formCheckInput}
                />
                <span className={s.checkboxCustom}></span>
                Subscribe to newsletter
              </label>
            </div>

            <button
              type="submit"
              className={s.btnPrimary}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message to Unigram"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

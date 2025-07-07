import React, { useState } from "react";
import s from "./ContactForm.module.css";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      setSubmitStatus("sending");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send");

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className={s.formContainer}>
      <div className={`${s.card} ${s.card_contact}`}>
        {submitStatus === "success" ? (
          <div className={s.successMessage}>
            <h3>Дякуємо!</h3>
            <p>
              Ваше повідомлення відправлено. Ми зв'яжемося з вами найближчим
              часом.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={s.cardHeader}>
              <h2 className={s.cardTitle}>Зв'язатися з нами</h2>
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
                      required: "Будь ласка, введіть ім'я",
                    })}
                  />
                  <label className={s.bmdLabelFloating} htmlFor="firstName">
                    Ім'я
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
                      required: "Будь ласка, введіть прізвище",
                    })}
                  />
                  <label className={s.bmdLabelFloating} htmlFor="lastName">
                    Прізвище
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
                    required: "Будь ласка, введіть email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Невірний email",
                    },
                  })}
                />
                <label className={s.bmdLabelFloating} htmlFor="email">
                  Email
                </label>
                {errors.email && (
                  <span className={s.errorMessage}>{errors.email.message}</span>
                )}
              </div>

              <div className={s.formGroup}>
                <textarea
                  id="message"
                  className={`${s.formControl} ${
                    errors.message ? s.error : ""
                  }`}
                  rows="6"
                  {...register("message", {
                    required: "Будь ласка, введіть повідомлення",
                    minLength: {
                      value: 10,
                      message: "Мінімум 10 символів",
                    },
                  })}
                ></textarea>
                <label className={s.bmdLabelFloating} htmlFor="message">
                  Ваше повідомлення
                </label>
                {errors.message && (
                  <span className={s.errorMessage}>
                    {errors.message.message}
                  </span>
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
                  Підписатися на розсилку
                </label>
              </div>

              <button
                type="submit"
                className={s.btnPrimary}
                disabled={isSubmitting || submitStatus === "sending"}
              >
                {submitStatus === "sending" ? "Відправка..." : "Надіслати"}
              </button>

              {submitStatus === "error" && (
                <p className={s.submitError}>
                  Помилка відправки. Будь ласка, спробуйте ще раз.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;

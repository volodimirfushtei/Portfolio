import React from "react";
import s from "./ContactForm.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      if (data.subscribe) {
        const response = await fetch("/api/subscribe", {
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
          console.error("❌ Subscribe error:", response.status, errorText);
          toast.error("Subscription failed");
          throw new Error("Subscription failed");
        }

        toast.success("Subscribed successfully!");
      }

      const telegramResponse = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!telegramResponse.ok) {
        const errorText = await telegramResponse.text();
        console.error("❌ Telegram error:", telegramResponse.status, errorText);
        toast.error("Message sending failed");
        throw new Error("Message sending failed");
      }

      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("❌ Error sending form:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={s.formContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={s.card}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={s.form}
          style={{
            pointerEvents: isSubmitting ? "none" : "auto",
            opacity: isSubmitting ? 0.6 : 1,
          }}
        >
          <motion.div className={s.cardHeader} variants={itemVariants}>
            <h2 className={s.cardTitle}>Get in Touch</h2>
            <p className={s.cardSubtitle}>We'll respond within 24 hours</p>
          </motion.div>

          <div className={s.cardBody}>
            <motion.div className={s.nameFields} variants={itemVariants}>
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
                  placeholder=" "
                />
                <label htmlFor="firstName">First name</label>
                {errors.firstName && (
                  <span
                    className={s.errorMessage}
                    role="alert"
                    aria-live="polite"
                  >
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
                  placeholder=" "
                />
                <label htmlFor="lastName">Last name</label>
                {errors.lastName && (
                  <span
                    className={s.errorMessage}
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div className={s.formGroup} variants={itemVariants}>
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
                placeholder=" "
              />
              <label htmlFor="email">Email address</label>
              {errors.email && (
                <span
                  className={s.errorMessage}
                  role="alert"
                  aria-live="polite"
                >
                  {errors.email.message}
                </span>
              )}
            </motion.div>

            <motion.div className={s.formGroup} variants={itemVariants}>
              <textarea
                id="message"
                className={`${s.formControl} ${errors.message ? s.error : ""}`}
                rows="5"
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 characters",
                  },
                })}
                placeholder=" "
              ></textarea>
              <label htmlFor="message">Your Message</label>
              {errors.message && (
                <span
                  className={s.errorMessage}
                  role="alert"
                  aria-live="polite"
                >
                  {errors.message.message}
                </span>
              )}
            </motion.div>
          </div>

          <motion.div className={s.cardFooter} variants={itemVariants}>
            <label className={s.checkboxContainer}>
              <input
                type="checkbox"
                id="subscribe"
                {...register("subscribe")}
                className={s.checkboxInput}
              />
              <span className={s.checkboxCustom}></span>
              Subscribe to newsletter
            </label>

            <motion.button
              type="submit"
              className={s.submitButton}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className={s.spinner}></span>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;

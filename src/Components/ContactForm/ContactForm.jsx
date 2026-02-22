import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import s from "./ContactForm.module.css";

const ContactForm = () => {
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onBlur" });

  /* ── Reveal animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current.children, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (data.subscribe) {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          }),
        });
        if (!res.ok) {
          toast.error("Subscription failed");
          throw new Error("Subscription failed");
        }
        toast.success("Subscribed successfully!");
      }

      const tgRes = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!tgRes.ok) {
        toast.error("Message sending failed");
        throw new Error("Message sending failed");
      }

      toast.success("Message sent successfully!");
      reset();
    } catch (err) {
      console.error("Form error:", err);
    }
  };

  return (
    <div className={s.wrap}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={s.form}
        style={{
          pointerEvents: isSubmitting ? "none" : "auto",
          opacity: isSubmitting ? 0.6 : 1,
        }}
        noValidate
      >
        {/* Header */}
        <div className={s.header}>
          <div className={s.eyebrow}>
            <span className={s.eyebrowLine} />
            <span className={s.eyebrowText}>Let's talk</span>
          </div>
          <h2 className={s.title}>Get in Touch</h2>
          <p className={s.subtitle}>I'll respond within 24 hours</p>
        </div>

        {/* Name row */}
        <div className={s.row}>
          <div className={s.group}>
            <input
              id="firstName"
              type="text"
              placeholder=" "
              className={`${s.input} ${errors.firstName ? s.inputError : ""}`}
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
            />
            <label htmlFor="firstName" className={s.label}>
              First name
            </label>
            {errors.firstName && (
              <span className={s.error} role="alert" aria-live="polite">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className={s.group}>
            <input
              id="lastName"
              type="text"
              placeholder=" "
              className={`${s.input} ${errors.lastName ? s.inputError : ""}`}
              {...register("lastName", { required: "Last name is required" })}
            />
            <label htmlFor="lastName" className={s.label}>
              Last name
            </label>
            {errors.lastName && (
              <span className={s.error} role="alert" aria-live="polite">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className={s.group}>
          <input
            id="email"
            type="email"
            placeholder=" "
            className={`${s.input} ${errors.email ? s.inputError : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <label htmlFor="email" className={s.label}>
            Email address
          </label>
          {errors.email && (
            <span className={s.error} role="alert" aria-live="polite">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div className={s.group}>
          <textarea
            id="message"
            rows="5"
            placeholder=" "
            className={`${s.input} ${s.textarea} ${errors.message ? s.inputError : ""}`}
            {...register("message", {
              required: "Message is required",
              minLength: { value: 10, message: "Minimum 10 characters" },
            })}
          />
          <label htmlFor="message" className={s.label}>
            Your Message
          </label>
          {errors.message && (
            <span className={s.error} role="alert" aria-live="polite">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className={s.footer}>
          <label className={s.checkbox}>
            <input
              type="checkbox"
              id="subscribe"
              className={s.checkboxInput}
              {...register("subscribe")}
            />
            <span className={s.checkboxBox} aria-hidden="true" />
            Subscribe to newsletter
          </label>

          <button
            type="submit"
            className={s.btn}
            disabled={isSubmitting}
            aria-label="Send message"
          >
            {isSubmitting ? (
              <span className={s.spinner} aria-hidden="true" />
            ) : (
              <>
                <span>Send Message</span>
                <span className={s.btnArrow}>→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

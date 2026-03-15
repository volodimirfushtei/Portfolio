import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Logic for subscription if needed
      if (data.subscribe) {
        // Mocking subscription call
        console.log("Subscribing:", data.email);
      }

      const tgRes = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!tgRes.ok) {
        throw new Error("Message sending failed");
      }

      toast.success("Message transmitted successfully", {
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text)",
          border: "1px solid var(--color-border)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          textTransform: "uppercase"
        }
      });
      reset();
    } catch (err) {
      console.error("Form error:", err);
      toast.error("Transmission failed. Please retry.");
    }
  };

  return (
    <div className={styles.wrap}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Direct Communication</span>
          </div>
          <h2 className={styles.title}>Send a Message</h2>
          <p className={styles.subtitle}>Response time typically within 24h</p>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <input
              id="firstName"
              type="text"
              placeholder=" "
              className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
              {...register("firstName", {
                required: "Required",
                minLength: { value: 2, message: "Too short" },
              })}
            />
            <label htmlFor="firstName" className={styles.label}>First name</label>
            {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
          </div>

          <div className={styles.group}>
            <input
              id="lastName"
              type="text"
              placeholder=" "
              className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
              {...register("lastName", { required: "Required" })}
            />
            <label htmlFor="lastName" className={styles.label}>Last name</label>
            {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
          </div>
        </div>

        <div className={styles.group}>
          <input
            id="email"
            type="email"
            placeholder=" "
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid address",
              },
            })}
          />
          <label htmlFor="email" className={styles.label}>Email address</label>
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.group}>
          <textarea
            id="message"
            placeholder=" "
            className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ""}`}
            {...register("message", {
              required: "Message required",
              minLength: { value: 10, message: "Detail your request" },
            })}
          />
          <label htmlFor="message" className={styles.label}>Your inquiry</label>
          {errors.message && <span className={styles.error}>{errors.message.message}</span>}
        </div>

        <div className={styles.footer}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              id="subscribe"
              className={styles.checkboxInput}
              {...register("subscribe")}
            />
            <span className={styles.checkboxBox} />
            Newsletter Opt-in
          </label>

          <button
            type="submit"
            className={styles.btn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <span>Engage</span>
                <i className="ri-arrow-right-line btnArrow" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

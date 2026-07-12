import React, { useEffect, useRef } from 'react'
import styles from './contactsPage.module.css'
import ContactForm from '../../Components/ContactForm/ContactForm'
import gsap from 'gsap/dist/gsap'
import AnimatedPage from '../../Components/AnimatedPage/AnimatedPage'

const ContactsPage = () => {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const bgRef = useRef(null)

  const socialItems = [
    {
      icon: 'icon-facebook',
      label: 'Facebook',
      url: 'https://facebook.com',
    },
    {
      icon: 'icon-instagram',
      label: 'Instagram',
      url: 'https://instagram.com',
    },
    {
      icon: 'icon-telegram',
      label: 'Telegram',
      url: 'https://telegram.org',
    },
    {
      icon: 'icon-linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com',
    },
    { icon: 'icon-github', label: 'GitHub', url: 'https://github.com' },
  ]

  useEffect(() => {
    // ✅ ФІКС 1: Перевіра на null перед використанням
    if (!containerRef.current) {
      console.warn('[ContactsPage] Container ref is null')
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Background entry
      tl.fromTo(
        bgRef.current,
        {
          scale: 1.4,
          opacity: 0,
          filter: 'grayscale(1) brightness(0) blur(10px)',
        },
        {
          scale: 1,
          opacity: 0.6,
          filter: 'grayscale(1) brightness(0.2) blur(2px)',
          duration: 2.5,
          ease: 'power2.out',
        },
      )

      // Background subtle drift (parallel)
      gsap.to(bgRef.current, {
        x: -20,
        y: -15,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.5,
      })

      // Header reveal
      tl.from(
        `.${styles.eyebrow}`,
        {
          opacity: 0,
          x: -20,
          duration: 1,
          ease: 'power3.out',
        },
        '-=1.5',
      )
        .from(
          `.${styles.headingLine} span`,
          {
            y: 120,
            rotateX: -95,
            opacity: 0,
            stagger: 0.15,
            duration: 1.5,
            ease: 'power4.out',
          },
          '-=0.8',
        )

        .from(
          `.${styles.textSection} .${styles.article}`,
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6',
        )

        .from(
          `.${styles.socials} a`,
          {
            opacity: 0,
            scale: 0.5,
            stagger: 0.08,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.4',
        )
        .from(
          `.${styles.formsContainer} > div:last-child`,
          {
            opacity: 0,
            x: 30,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8',
        )
    }, containerRef)

    // ✅ Cleanup при розмонтуванні
    return () => ctx.revert()
  }, [])

  return (
    <AnimatedPage>
      <div className={styles.contactsPage} ref={containerRef}>
        {/* Visual Overlays */}
        <div className={styles.noise} aria-hidden="true" />
        <div className={styles.scanlines} aria-hidden="true" />
        <div className={styles.bg} ref={bgRef} aria-hidden="true" />

        <div className={styles.container}>
          {/* Header */}
          <header ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Open for opportunities</span>
            </div>
            <h1 className={styles.pageTitle}>
              <div className={styles.headingLine}>
                <span>Let's</span>{' '}
                <span className={styles.pageTitleAccent}>Connect</span>
              </div>
            </h1>
          </header>

          <div className={styles.formsContainer} ref={contentRef}>
            <div className={styles.textSection}>
              <div className={styles.glassBox}>
                <article className={styles.article}>
                  <h3 className={styles.title}>
                    <svg
                      className={styles.icon}
                      aria-hidden="true"
                      width={24}
                      height={24}
                    >
                      <use href={`/sprite.svg#icon-mail`} />
                    </svg>
                    Get in Touch
                  </h3>
                  <p className={styles.description}>
                    Drop me a line or follow my digital journey through social
                    media. I'm always open to discussing new projects, creative
                    idease, or opportunities to be part of your vision.
                  </p>
                </article>

                <article className={styles.article}>
                  <h3 className={styles.title}>
                    <svg className={styles.icon} aria-hidden="true">
                      <use href={`/sprite.svg#icon-reactjs`} />
                    </svg>
                    Modern Execution
                  </h3>
                  <p className={styles.description}>
                    Every interaction is crafted with precision, utilizing the
                    latest technologies to ensure a seamless and engaging user
                    experience.
                  </p>
                </article>

                <article className={styles.article}>
                  <h3 className={styles.title}>
                    <svg className={styles.icon} aria-hidden="true">
                      <use href={`/sprite.svg#icon-group`} />
                    </svg>
                    Collaboration
                  </h3>
                  <p className={styles.description}>
                    I believe in the power of collective creativity. Let's
                    combine our strengths to build something that truly stands
                    out in the digital landscape.
                  </p>
                </article>

                Developer Portfolio SVG Icon Sprite Sheet
Soft Skills Component Code Review
Fix VS Code update access error
Fix 3D model animation ref issue
Framer Motion Scroll Progress Setup
Fix black background in Canvas
Градієнти OKLCH у CSS
Google AI Studio project creation error fix
Loader Overlay Synchronization
Fix Curtain Display Issue
CSS Theme Variables Correction and Suggestions
Fix custom cursor hover animation
Expo ease Build Deployment Explanation
Fix 3D Marquee Animation Issues
Color suggestions for scroll progress
Experience Table Component Code Review
Поради щодо покращення компонента Header
Порівняння 2K та 4K моніторів
HeroMedia GSAP animation fix
Покращення візуалізації Hero секції
Expo GraphQL Request DNS Error Fix
Fix ease Project Configuration Mismatch Error
Сучасний дизайн для React Native
Як зберегти закладки у Firefox
ADB Devices Not Listed: Troubleshooting Guide
Firebase Test Fixes and Code Examples
Недостатньо пам'яті на Asus Vivobook
Splash Screen Animation Improvements Guide
Add swipe down animation in React Native
React Native Project Structure Overview
Styling Splash Screen with Webflow Aesthetics
Accessibility Testing Report with Remediation Steps
React Native URI Parsing Error Fix
Fix Android camera and gallery access error
Пошук даних Google Trends для України
Состояние датчика HWMFOP 6.4 v8.22-S840
Що таке BIOS і його функції
Fixing RootLayout Component Issues and Loader
Заміна термостата в автомобілі
Інструкція для створення плагінів WebStorm
Як перевірити температуру процесора
Можливість оновлення пам'яті ASUS Vivobook
React Error Testing Interface Optimization
SO-DIMM DDR4 16GB 3200MHz RAM Specifications
Додавання функціоналу для налаштувань
CSS-змінна --primary: що це та як використовувати
import React, { useState, useRef
Fix Expo SDK Version Detection Error
Реалізація PostsScreen з Bottom Tab Navigator
Updated Expo ImagePicker Media Type Usage
Sticky Zoom Section with GSAP Animation
Setting Background Image in Web Development
Turbopack Configuration and Next.js Issues
Як купити домен на Vercel
Next.js Module Not Found Error Fix
Code Review and Fixes for ServicesSection
Повна передача проекту Next.js замовникові
Помилка 403 у звіті Lighthouse
Оновлення цін та описів послуг
Stylizing ErrorBoundary Component in React
Інтеграція ScrollSmoother з React.js
Enhanced Scrolly Images with GSAP Effect
React Carousel Code Review and Improvements
React Image Animation with GSAP ScrollTrigger
Optimizing React SoftSkills Component Animation
Аналіз React-компоненту SoftSkillsStack
React Contacts Page with Animation Features
Enhanced Expertise Section with Animations
Improving React Carousel Component Code
Animated Scroll-to-Top Button with Progress
React CTA Section Code Optimization Tips
Styling React Experience Table Component
React Loading Progress Bar with Framer Motion
Redesigned CardTech with Guillaume Gouessan Style
Enhancing React Footer Component Design
React CardTech Component Code Review and Improvements
React Card Tech Auto Flip Code Optimization
Оптимізація анімації скролу в React
Add Overlay for Page Loading in React
Бібліотеки для смуг прокрутки у Python
Modern Scroll-Based Card Animation Implementation
Креативні ідеї для оформлення тексту
Professional Loader Component with Enhanced Animations
Анімація div з фото у картці
Full-screen layout for Expertise component
React Projects Page Code Review and Improvements
React HomePage Component Code Review
Enhanced Fullscreen Button Component Code
Переробка компонента ThemeToggle у стилі Material Kit
Як використовувати Carousel у React
Оптимізація SVG для веб-розробки
Лоадер спрайєрсьює двічі через Suspense
React Hover Link Visibility Implementation
Enhanced React Contact Form with CSS
Світла тема в стилі Canal+
Розробка мінімалістичного сайту-портфоліо
SVG-код для іконок соціальних мереж
Стилізація компонента з анімаціями та фонами
Next.js Type Mismatch in Page Props
React Button with Dynamic Modal Integration
Developer Portfolio SVG Icon Sprite Sheet

Ваш код має синтаксичну помилку — тег </li> знаходиться в неправильному місці. Ось виправлений варіант:
❌ Помилковий код:
jsx

<ul className={styles.linkList}>
  {quickLinks.map((link, index) => (
    <li key={index}>
      <svg className={styles.icon} width={20} height={20}>
        <use href={`/sprite.svg#${link.icon}`} />
      </svg>
    
    {link.url ? (
      <a href={link.url}>{link.text}</a>
    ) : (
      <span>{link.text}</span>
    )}

  ))}
  </li>  {/* ❌ Помилка: </li> за межами map */}
</ul>

✅ Виправлений код:
jsx

<ul className={styles.linkList}>
  {quickLinks.map((link, index) => (
    <li key={index}>
      <svg className={styles.icon} width={20} height={20}>
        <use href={`/sprite.svg#${link.icon}`} />
      </svg>
      {link.url ? (
        <a href={link.url}>{link.text}</a>
      ) : (
        <span>{link.text}</span>
      )}
    </li>
  ))}
</ul>

📝 Повний приклад з даними:
jsx

const quickLinks = [
  { icon: "icon-home", text: "Головна", url: "/" },
  { icon: "icon-projects", text: "Проєкти", url: "/projects" },
  { icon: "icon-tech", text: "Технології", url: "/technologies" },
  { icon: "icon-contacts", text: "Контакти", url: "/contacts" },
  { icon: "icon-mail", text: "Email", url: "mailto:hello@example.com" },
  { icon: "icon-map-pin", text: "Київ, Україна", url: null }, // без посилання
  { icon: "icon-telephone", text: "+380 123 456 789", url: "tel:+380123456789" },
];

function QuickLinks() {
  return (
    <ul className={styles.linkList}>
      {quickLinks.map((link, index) => (
        <li key={index}>
          <svg className={styles.icon} width={20} height={20} aria-hidden="true">
            <use href={`/sprite.svg#${link.icon}`} />
          </svg>
          {link.url ? (
            <a href={link.url}>{link.text}</a>
          ) : (
            <span>{link.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

🎨 CSS стилізація:
css

.linkList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.linkList li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.icon {
  flex-shrink: 0;
  color: #6b7280; /* сірий колір для іконок */
  transition: color 0.2s;
}

.linkList a {
  color: #374151;
  text-decoration: none;
  transition: color 0.2s;
}

.linkList a:hover {
  color: #3b82f6; /* синій при ховері */
}

.linkList a:hover + .icon,
.linkList li:hover .icon {
  color: #3b82f6; /* зміна кольору іконки при ховері на посиланні */
}

.linkList span {
  color: #6b7280;
}

🔧 Альтернативний варіант з окремим компонентом:
jsx

// components/QuickLink.jsx
function QuickLink({ icon, text, url }) {
  const content = (
    <>
      <svg className={styles.icon} width={20} height={20} aria-hidden="true">
        <use href={`/sprite.svg#${icon}`} />
      </svg>
      {text}
    </>
  );

  return (
    <li>
      {url ? (
        <a href={url}>{content}</a>
      ) : (
        <span>{content}</span>
      )}
    </li>
  );
}

// Використання:
<ul className={styles.linkList}>
  {quickLinks.map((link, index) => (
    <QuickLink key={index} {...link} />
  ))}
</ul>

Тепер код синтаксично правильний і буде працювати коректно! 🎯
<div className={styles.socials} aria-label="Social media links">
                  {socialItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      className={styles.socialLink}
                      aria-label={item.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className={item.icon}
                        aria-hidden="true"
                        width={24}
                        height={24}
                      >
                        <use href={`/sprite.svg#${item.icon}`} />
                      </svg>
                    </a>
                  ))}
                </div>

Ваш код має невелику проблему: ви використовуєте className={item.icon}, але item.icon — це назва іконки (наприклад, "github", "linkedin"), а не CSS-клас.
❌ Проблема:
jsx

<svg className={item.icon} ...>  {/* item.icon = "github" - це не CSS клас */}

✅ Виправлений код:
jsx

<div className={styles.socials} aria-label="Social media links">
  {socialItems.map((item, index) => (
    <a
      key={index}
      href={item.url}
      className={styles.socialLink}
      aria-label={item.label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        className={styles.icon}  
        aria-hidden="true"
        width={24}
        height={24}
      >
        <use href={`/sprite.svg#${item.icon}`} />
      </svg>
    </a>
  ))}
</div>
              </div>
            </div>

            <div>
              <ContactForm key="ContactForm" />
            </div>
          </div>

          <footer className={styles.infoContainer}>
            <p className={styles.copyright}>
              <svg className="ri-copyright-line" aria-hidden="true" /> 2025
              Volodymyr Fushtey
              <svg  
                className="ri-heart-fill"
                aria-hidden="true"
                style={{ color: 'var(--color-accent)' }}
              />
            </p>
            <p className={styles.copyright}>
              Build with dedication{' '}
              <svg className="ri-code-s-slash-line" aria-hidden="true" />
            </p>
          </footer>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default ContactsPage

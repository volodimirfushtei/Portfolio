import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./SoftSkills.module.css";

export default function SoftSkills() {
  const skills = [
    {
      title: "Communication & Collaboration",
      items: [
        "Able to clearly and effectively communicate ideas",
        "Open to feedback and constructive criticism",
        "Experience working in interdisciplinary teams",
      ],
      icon: "ri-chat-3-line",
    },
    {
      title: "Teamwork",
      items: [
        "Work effectively with colleagues under deadlines",
        "Support team spirit and help others achieve goals",
        "Willing to take on different roles depending on needs",
      ],
      icon: "ri-team-line",
    },
    {
      title: "Critical & Creative Thinking",
      items: [
        "Find unconventional solutions to complex problems",
        "Analyze issues from multiple perspectives",
        "Combine creative approaches with practical solutions",
      ],
      icon: "ri-lightbulb-line",
    },
    {
      title: "Organization & Time Management",
      items: [
        "Prioritize tasks for efficiency",
        "Meet deadlines without compromising quality",
        "Use planning tools (Trello, Notion, Asana)",
      ],
      icon: "ri-time-line",
    },
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "100% 100%"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["700px", "0px"]);
  const itemX = useTransform(scrollYProgress, [0, 1], ["-500px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0.2, 0.6, 1]);
  const delay = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Варіанти для контейнера

  return (
    <motion.section
      ref={ref}
      className="relative w-full max-w-3xl mx-auto p-10 text-white overflow-hidden "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="mb-8 w-100 mx-auto text-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ x, opacity, delay }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.h3
            className={`text-2xl font-semibold flex items-center gap-2 mb-2 border-b pb-2 border-gray-400 ${styles.skillTitle}`}
            style={{ x, opacity, delay }}
          >
            <i
              className={`${skill.icon} p-2 text-secondary rounded-2`}
              aria-hidden="true"
            />
            {skill.title}
          </motion.h3>
          <ul className="list-disc list-inside text-gray-300 text-left text-xl">
            {skill.items.map((item, idx) => (
              <li
                key={idx}
                custom={idx}
                className="mb-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.section>
  );
}

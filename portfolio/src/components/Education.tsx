"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { education } from "@/data/resume";
import { sectionTitles } from "@/data/site";

type SkillCategory = "Languages" | "Frameworks" | "Tools";

const SKILL_CATEGORIES: Record<string, SkillCategory> = {
  Python: "Languages",
  Java: "Languages",
  C: "Languages",
  C++: "Languages",
  JavaScript: "Languages",
  SQL: "Languages",
  PyTorch: "Frameworks",
  NumPy: "Frameworks",
  Pandas: "Frameworks",
  Seaborn: "Frameworks",
  PuLP: "Frameworks",
  matplotlib: "Frameworks",
  React: "Frameworks",
  "Node.js": "Frameworks",
  Express: "Frameworks",
  Flask: "Frameworks",
  "Git/GitHub": "Tools",
  AWS: "Tools",
  Docker: "Tools",
  "REST APIs": "Tools",
  "OpenAI APIs": "Tools",
  GoHighLevel: "Tools",
  Make: "Tools",
  Odoo: "Tools",
};

const CATEGORY_ORDER: SkillCategory[] = ["Languages", "Frameworks", "Tools"];

function groupSkillsByCategory(skills: string[]): Record<SkillCategory, string[]> {
  const grouped: Record<SkillCategory, string[]> = {
    Languages: [],
    Frameworks: [],
    Tools: [],
  };
  for (const skill of skills) {
    const cat = SKILL_CATEGORIES[skill] ?? "Tools";
    grouped[cat].push(skill);
  }
  return grouped;
}

export default function Education() {
  const skillsByCategory = useMemo(
    () => groupSkillsByCategory(education.skills),
    []
  );

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold text-white flex items-center gap-3"
      >
        <span className="text-primary">{sectionTitles.education.num}.</span> {sectionTitles.education.title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left: Education */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-xl font-semibold text-text-main">
            {education.university}
          </p>
          <p className="text-lg text-white">{education.degree}</p>
          <p>
            <span className="text-secondary font-bold">GPA {education.gpa}</span>
          </p>
          <p className="text-sm text-text-muted">
            Expected Graduation: {education.graduation}
          </p>
        </motion.div>

        {/* Right: Skills by category */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {CATEGORY_ORDER.map((category) => {
            const skills = skillsByCategory[category];
            if (skills.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm border border-white/10 rounded-full text-text-main transition-all duration-200 hover:border-primary/40 hover:shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

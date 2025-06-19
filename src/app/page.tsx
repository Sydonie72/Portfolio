"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, FileCode, Briefcase, User } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image"; 

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "À propos", href: "#about", icon: User },
    { name: "Projets", href: "#projects", icon: Briefcase },
    { name: "Compétences", href: "#skills", icon: Code },
    { name: "Contact", href: "#contact", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-100 dark:from-gray-900 dark:to-blue-950 text-gray-900 dark:text-gray-100">
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md z-10 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                Ratovomaro Agnès Sydonie
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-pink-400 transition-colors duration-200 flex items-center gap-2 font-medium"
                >
                  <item.icon className="w-5 h-5 text-blue-500 dark:text-pink-400" />
                  {item.name}
                </a>
              ))}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-pink-900 transition-colors"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-blue-500 dark:text-pink-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="md:hidden bg-white dark:bg-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-pink-900 rounded-md flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-blue-500 dark:text-pink-400" />
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-20 text-center"
        >
          <Image
            src="/images/porfolioSydoni.jpg"
            alt="Ratovomaro Agnès Sydonie"
            width={128} 
            height={128} 
            className="rounded-full mx-auto mb-5 border-2 border-blue-500 dark:border-pink-400 shadow-md hover:shadow-lg transition-all duration-300"
          />
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Bonjour !</p>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Ratovomaro Agnès Sydonie
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Développeuse Web & Étudiante en 3e année d&apos;Informatique</p>
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Voulez-vous me contacter ?
          </a>
        </motion.section>

        <section id="about" className="py-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-500 dark:text-pink-400">
            <User className="w-8 h-8" /> À propos de moi
          </h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-lg text-gray-700 dark:text-gray-300"
          >
            <p>
              Je suis étudiante en troisième année de Licence professionnelle en Informatique à l&apos;École de Management et d&apos;Innovation Technologique (EMIT). Passionnée par le développement web.
            </p>
            <p>
              Mon parcours dans la technologie inclut une expérience pratique avec divers frameworks et technologies, et je m&apos;épanouis en relevant de nouveaux défis pour créer des solutions innovantes et conviviales.
            </p>
          </motion.div>
        </section>

        <section id="projects" className="py-v16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-500 dark:text-pink-400">
            <Briefcase className="w-8 h-8" /> Projets
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Application de gestion de renouvellement de contrat",
                description:
                  "Développement d’une application pour la gestion des renouvellements de contrats pour le personnel non encadré avec Spring Boot, Node.js et Next.js.",
                link: "#",
                role: "Développeuse",
                year: "2024-2025",
              },
             
              {
                title: "Plateforme d’apprentissage interactive",
                description: "Développement d’une plateforme interactive pour apprendre l’informatique de manière ludique, avec un focus sur le front-end.",
                link: "#",
                role: "Responsable Front-End",
                year: "2024-2025",
              },
              {
                title: "Hackathon : Système de gestion des achats",
                description: "Présentation et direction du développement front-end d’un système de gestion des achats avec Node.js, TypeScript et Next.js.",
                link: "#",
                role: "Présentatrice & Responsable Front-End",
                year: "2024-2025",
              },
              {
                title: "Application de renouvellement de contrat (Stage)",
                description:
                  "Conception et réalisation d’une application de renouvellement de contrats lors d’un stage de deux mois à la Circonscription Scolaire, avec JavaFX, Apache NetBeans et MySQL.",
                link: "#",
                role: "Développeuse",
                year: "2023-2024",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-blue-200 dark:border-pink-900"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Rôle : {project.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Année : {project.year}</p>
                <a href={project.link} className="text-blue-500 dark:text-pink-400 hover:underline flex items-center gap-2">
                  <FileCode className="w-5 h-5" /> GitHub
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="py-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-500 dark:text-pink-400">
            <Code className="w-8 h-8" /> Compétences
          </h2>
            <p>
              
            </p>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {["HTML/CSS", "JavaScript", "Next.js", "Node.js", "Spring Boot", "JavaFX", "Java", "MySQL", "PostgreSQL", "Git", "GitHub"].map(
              (skill) => (
                <div
                  key={skill}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center shadow-md hover:shadow-xl transition-all duration-300 border border-blue-200 dark:border-pink-900 text-gray-900 dark:text-gray-100"
                >
                  {skill}
                </div>
              ),
            )}
          </motion.div>
        </section>

        <section id="contact" className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-500 dark:text-pink-400">Contacts</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Intéressé à toute collaboration ? N&apos;hésitez pas à me contacter !
          </p>
          <div className="space-y-4">
            <p>
              Email :{" "}
              <a href="mailto:ratovomaroagnessydonie@gmail.com" className="text-blue-500 dark:text-pink-400 hover:underline">
                ratovomaroagnessydonie@gmail.com
              </a>
            </p>
            <p>
              Téléphone :{" "}
              <a href="tel:+261340903220" className="text-blue-500 dark:text-pink-400 hover:underline">
                +261 34 09 032 20
              </a>
            </p>
            <p>
              LinkedIn :{" "}
              <a href="https://www.linkedin.com/in/agnès-sydonie-799247347" className="text-blue-500 dark:text-pink-400 hover:underline">
                https://www.linkedin.com/in/agnès-sydonie-799247347
              </a>
            </p>
          </div>
          <a
            href="mailto:ratovomaroagnessydonie@gmail.com"
            className="inline-block bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg mt-6"
          >
            Email
          </a>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-6 text-center">
        <p>© 2025 Ratovomaro Agnès Sydonie. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
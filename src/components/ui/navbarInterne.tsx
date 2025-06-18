"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { Avatar } from "./avatar";

export default function Navbar() {
  return (
    <nav className="bg-background p-4 shadow-xl">
      <div className="mx-auto flex justify-between items-center">
        <p className="text-bold text-2xl"> -CodeVerse- </p>
        <div className="hidden md:flex space-x-6">
        
          <Link
            href="/platform"
            className="py-2 px-3 rounded transition-all hover:bg-gray-700"
          >
            Accueil
          </Link>

        
          <Link
            href="/platform/quizzes"
            className="py-2 px-3 rounded transition-all hover:bg-gray-700"
          >
            Quiz
          </Link>

       
          <Link
            href="/chambre"
            className="py-2 px-3 rounded transition-all hover:bg-gray-700"
          >
            Chambre
          </Link>

    
          <Link
            href="/Amis"
            className="py-2 px-3 rounded transition-all hover:bg-gray-700"
          >
            Amis
          </Link>

      
          <Link
            href="/platform#profil"
            className="py-2 px-3 rounded transition-all hover:bg-gray-700"
          >
            Profil
          </Link>
          

          <ThemeToggle />
        </div>
        <div className="flex justify-between gap-3">
          <Avatar />
          <Link
            href="/logout"
            className="bg-black border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Déconnexion
          </Link>
        </div>
        <button className="md:hidden">aaaaa</button>
      </div>
    </nav>
  );
}
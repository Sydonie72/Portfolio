"use client"

import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
    return(
        <nav className="bg-background p-4 shadow-xl">
                <div className="mx-auto flex justify-between items-center">
                    <p className="text-bold text-2xl"> -CodeVerse- </p>
                    <div className="hidden md:flex space-x-6">
                        <Link href="#" className="py-2 px-3 rounded  transition-all"> Accueil</Link>
                        <Link href="#" className="py-2 px-3 rounded  transition-all"> A propos</Link>
                        <Link href="#" className="py-2 px-3 rounded  transition-all"> Fonctionnalité</Link>
                        <Link href="#" className="py-2 px-3 rounded  transition-all"> Contact</Link>
                        <ThemeToggle/>
                        </div>
                    <div className="flex justify-between gap-3">
                        <Link href="#" className="bg-black border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                            Connexion
                        </Link>
                        <Link href="#" className="bg-black border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                            Inscription
                        </Link>
                    </div>
                    <button className="md:hidden">aaaaa</button>
                </div>
        </nav>
    );
}
import React from "react";
import Link from "next/link";
import"./globals.css";

export default function RootLayout(
    {children,}:
        Readonly<{ children: React.ReactNode; }>
){
    return(
        <html lang="en">
            <head>
                <title>Catpedia | mp-4</title>
            </head>
            <body className="flex min-h-screen flex-col bg-cloud text-ink">
                <header className="border-b border-mist bg-white">
                    <div className="mx-auto max-w-4xl p-4 texl-xl font-extrabold">
                        <Link href="/">Catpedia</Link>
                    </div>
                </header>
                <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 py-10">
                    {children}
                </main>
                <footer className="p-6 text-center text-sm text-muted">
                    Data from The Cat API
                </footer>
            </body>
        </html>
    );
}
"use client";

import {useState} from "react";
import Link from "next/link";
import {breedToUrl} from "@/lib/breedURL";

const suggestions = ["Bengal", "Siamese", "Maine Coon", "Sphynx", "Ragdoll", "Persian"];

export default function Home(){
    const [breedName, setBreedName] = useState<string>("");
    const urlName = breedToUrl(breedName);
    return(
        <div className="card mx-auto w-full max-w-lg p-8 text-center">
            <h1 className="mb-2 text-3xl font-extrabold">
                Find a cat breed
            </h1>
            <p className="text-muted">
                Type a breed name to see its profile.
            </p>
            <div className="mb-8 mt-6 flex flex-col gap-3 sm:flex-col">
                <input
                    value={breedName}
                    onChange={(e) => setBreedName(e.target.value)}
                    placeholder="e.g. Scottish Fold"
                    className="flex-1 rounded-xl border border-lavender px-4 py-2.5 outline-none focus:border-ink"
                />
                {
                    breedName
                        ? <Link href={`/${urlName}`} className="button">Search</Link>
                        : <span className="button cursor-not-allowed bg-mist text-muted hover:bg-mist">Search</span>
                }
            </div>
            <p className="text-muted">
                Popular breeds
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {
                    suggestions.map((name) =>
                        <li key={name}>
                            <Link href={`/${breedToUrl(name)}`} className="chip hover:bg-periwinkle">{name}</Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}
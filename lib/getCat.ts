"use server";

import {CatFact, Cat, CatResult} from "@/interfaces/Cat";

const API_URL = "https://api.thecatapi.com/v1";

interface RawBreed {
    name: string;
    origin: string;
    description: string;
    temperament?: string;
    history?: string | null;
    life_span?: string;
    weight?: { metric: string };
    height?: { metric: string };
    breed_group?: string | null;
    alt_names?: string | null;
    image?: { url: string };
}

function friendlyError(status: number): string {
    if (status === 429) {
        return "We've reached today's Cat API request limit. Please come back later.";
    }
    if (status === 401 || status === 403) {
        return "The Cat API didn't accept our key.";
    }
    if (status >= 500) {
        return "The Cat API is down right now. Please try again soon.";
    }
    return `The Cat API sent back an error (${status}).`;
}

async function callCatApi<T>(path: string): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        headers: {"x-api-key": process.env.CAT_API_KEY as string}, // key goes in a header
        cache: "no-store",
    }).catch(() => {
        throw new Error("We can't reach The Cat API right now. Please try again soon.");
    });

    if (!res.ok) {
        throw new Error(friendlyError(res.status));
    }
    return res.json();
}

function toCat(breed: RawBreed): Cat {
    const facts: CatFact[] = [
        {label: "Life span", value: breed.life_span ? `${breed.life_span} years` : ""},
        {label: "Weight", value: breed.weight ? `${breed.weight.metric} kg` : ""},
        {label: "Height", value: breed.height ? `${breed.height.metric} cm` : ""},
        {label: "Breed group", value: breed.breed_group || ""},
        {label: "Also known as", value: breed.alt_names || ""},
    ];

    return {
        name: breed.name,
        origin: breed.origin,
        description: breed.description,
        history: breed.history || "",
        temperament: breed.temperament ? breed.temperament.split(",").map((trait) => trait.trim()) : [],
        imageUrl: breed.image ? breed.image.url : "",
        facts: facts.filter((fact) => fact.value !== ""), // skip facts the API left empty
    };
}

export async function getCat(breedName: string): Promise<CatResult> {
    if (!process.env.CAT_API_KEY) {
        return {cat: null, error: "The server is missing its CAT_API_KEY."};
    }

    try {
        const breeds = await callCatApi<RawBreed[]>(`/breeds/search?q=${breedName}`);

        // Prefer an exact name match, otherwise take the closest result.
        const breed = breeds.find((b) => b.name.toLowerCase() === breedName.toLowerCase()) || breeds[0];
        if (!breed) {
            return {cat: null, error: `No breed called "${breedName}" was found. Check the spelling?`};
        }

        return {cat: toCat(breed), error: ""};
    } catch (e) {
        return {cat: null, error: (e as Error).message};
    }
}
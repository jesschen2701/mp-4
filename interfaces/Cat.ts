export interface CatFact {
    label: string;
    value: string;
}

export interface Cat {
    name: string;
    origin: string;
    description: string;
    history: string;
    temperament: string[];
    imageUrl: string;
    facts: CatFact[];
}

export interface CatResult {
    cat: Cat | null;
    error: string;
}
"use client";

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";
import {CatResult} from "@/interfaces/Cat";
import {getCat} from "@/lib/getCat";
import {urlToBreed} from "@/lib/breedURL";
import CatCard from "@/components/CatCard";
import Message from "@/components/Message";

export default function BreedDetails(){
    const params = useParams<{ breed: string }>();
    const breedName = urlToBreed(params.breed);

    const [result, setResult] = useState<CatResult | null>(null);

    useEffect(() => {
        getCat(breedName)
            .then((data) => setResult(data))
            .catch(() => setResult({cat: null, error: "Our server didn't answer. Please try again."}));
    }, [breedName]);

    if (!result) {
        return <Message title="Loading..." text={`Looking up "${breedName}"`} loading={true}/>;
    }
    if (!result.cat) {
        return <Message title="Something went wrong" text={result.error}/>;
    }

    return (
        <div>
            <Link href="/" className="mb-4 inline-block text-sm font-semibold text-muted hover:underline">
                ← Back to search
            </Link>
            <CatCard cat={result.cat}/>
        </div>
    );
}

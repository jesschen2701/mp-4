import {Cat} from "@/interfaces/Cat";

export default function CatCard({cat}: { cat: Cat }) {
    return (
        <article className="card overflow-hidden md:grid md:grid-cols-2">
            <div className="min-h-72 bg-periwinkle">
                {
                    cat.imageUrl
                        ? <img src={cat.imageUrl} alt={`A ${cat.name} cat`} className="h-72 w-full object-cover md:h-full"/>
                        : <p className="flex h-72 items-center justify-center font-semibold md:h-full">No photo available</p>
                }
            </div>

            <div className="flex flex-col gap-5 p-6">
                <div>
                    <h1 className="text-3xl font-extrabold">{cat.name}</h1>
                    <p className="text-muted">Origin: {cat.origin}</p>
                </div>

                <ul className="flex flex-wrap gap-2">
                    {
                        cat.temperament.map((trait) =>
                            <li key={trait} className="chip">{trait}</li>
                        )
                    }
                </ul>

                <div className="grid grid-cols-2 gap-3">
                    {
                        cat.facts.map((fact) =>
                            <div key={fact.label} className="rounded-xl bg-cloud p-3">
                                <p className="text-xs text-muted">{fact.label}</p>
                                <p className="font-semibold">{fact.value}</p>
                            </div>
                        )
                    }
                </div>

                <p className="leading-relaxed">{cat.description}</p>

                {
                    cat.history &&
                    <div>
                        <h2 className="mb-1 font-bold">History</h2>
                        <p className="leading-relaxed text-muted">{cat.history}</p>
                    </div>
                }
            </div>
        </article>
    );
}
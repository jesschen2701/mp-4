import Link from "next/link";

export default function Message({title, text, loading = false}: {
    title: string;
    text: string;
    loading?: boolean;
}) {
    return(
        <div className="card mx-auto w-full max-w-md p-8 text-center">
            {
                loading &&
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-mist border-t-lavender"/>
            }
            <h2 className="mb-2 text-xl font-bond">{title}</h2>
            <p className="text-muted">{text}</p>
            {!loading && <Link href="/" className="button mt-6">Back to search</Link> }
        </div>
    );
}
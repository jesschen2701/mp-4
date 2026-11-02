import {Suspense} from "react";
import BreedDetails from "@/components/BreedDetails";
import Message from "@/components/Message";

export default function BreedPage() {
    return (
        <Suspense fallback={<Message title="Loading..." text="Getting ready" loading={true}/>}>
            <BreedDetails/>
        </Suspense>
    );
}
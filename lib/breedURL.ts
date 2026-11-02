export function breedToUrl(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((word) => word !== "")
        .join("-");
}

export function urlToBreed(urlPart: string): string {
    return urlPart
        .split("-")
        .join(" ");
}
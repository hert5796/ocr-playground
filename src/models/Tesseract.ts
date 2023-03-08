import { recognize } from "tesseract.js";

export default async function (
    imageUri: string,
    language: string = "eng"
): Promise<string> {
    const result = await recognize(imageUri, language, {
        logger: (m) => {
            // console.log(m); // uncomment to see the progress
        },
    });

    return result.data.text;
}

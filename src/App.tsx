import { useState } from "react";

// https://undraw.co/illustrations
import summer from "./assets/summer.svg";
import Tesseract from "./models/Tesseract";

import sample from "./sample.json";

export default function App() {
    const [imageName, setImageName] = useState(sample.imageName);
    const [imageSrc, setImageSrc] = useState(sample.imageSrc);
    const [text, setText] = useState(sample.text);

    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setImageName(file.name);
        setImageSrc(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const text = await Tesseract(
            imageSrc.length ? imageSrc : "sample0.jpg"
        );
        setText(text);
        setIsLoading(false);
    };

    return (
        <div className="p-3 font-light">
            <h1 className="text-5xl text-center font-extralight">
                <u>Optical Character Recognition</u>
            </h1>
            <br />
            <h3 className="text-xl text-center font-extralight lg:hidden">
                This site is not optimized for mobile devices...yet.
                <img src={summer} alt="Summer SVG" />
            </h3>
            <div className="hidden lg:flex lg:gap-3">
                <div className="w-96">
                    <p className="">
                        Choose an image to recognize the text in it. <br />
                        <span className="text-sm text-teal-600">
                            The image will be processed locally in your browser.
                        </span>
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="my-3 relative m-0 block w-full min-w-0 flex-auto cursor-pointer border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                    />
                    <img src={imageSrc} alt={imageName} className="border" />
                </div>
                <div className="w-96">
                    <p>Choose a library to recognize the text in the image.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-3">
                            <input
                                type="radio"
                                id="tesseract"
                                name="library"
                                value="tesseract"
                                defaultChecked
                            />
                            <label htmlFor="tesseract">Tesseract.js</label>
                        </div>

                        <button
                            className="mt-3 px-3 py-1 bg-teal-500 text-white disabled:bg-gray-300"
                            disabled={isLoading}>
                            Parse image
                        </button>
                    </form>
                </div>
                <div className="grow border flex flex-col">
                    <div className="w-full border-b flex justify-end py-2 px-3">
                        <button
                            className="flex gap-1 items-center text-sm"
                            onClick={async () => {
                                await navigator.clipboard.writeText(text);
                                setIsCopied(true);
                                setTimeout(() => {
                                    setIsCopied(false);
                                }, 2000);
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="w-4 h-4">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                                />
                            </svg>
                            {isCopied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                    <div className="h-full overflow-scroll">
                        {isLoading ? (
                            <div className="h-full flex items-center justify-center text-2xl font-light">
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-200 fill-teal-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                Loading...
                            </div>
                        ) : (
                            <pre className="p-3">{text}</pre>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

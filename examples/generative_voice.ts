
import { CambClient, Languages } from "@camb-ai/browser-sdk";

const client = new CambClient({
    apiKey: process.env.CAMB_API_KEY!,
});

async function main() {
    const response = await client.textToVoice.createTextToVoice({
        text: "This is a prompt for a new voice.",
        voice_description: "A deep, resonant male voice.",
    });

    console.log("Generative Voice Task created:", response.task_id);
}

main();

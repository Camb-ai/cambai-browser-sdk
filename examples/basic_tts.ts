
import { CambClient, Languages } from "@camb-ai/browser-sdk";

const client = new CambClient({
    apiKey: process.env.CAMB_API_KEY!,
});

async function main() {
    const response = await client.textToSpeech.createTts({
        text: "Hello from the Browser SDK",
        voice_id: 20303, // Standard Voice
        language: Languages.EN_US,
    });

    console.log("TTS Task created:", response.task_id);
}

main();

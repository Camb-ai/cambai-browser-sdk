import { CambClient } from "../src/index.js";
import { CreateStreamTtsRequestPayload } from "../src/api/resources/textToSpeech/client/requests/CreateStreamTtsRequestPayload.js";
import * as fs from "fs";

/**
 * Example: Using Baseten Custom Provider
 * 
 * To run this example:
 * 1. Set environment variables:
 *    export BASETEN_API_KEY="your_key"
 *    export BASETEN_URL="your_url"
 * 2. Run with ts-node or compile and run with node.
 */

// 1. Initialize Client
// We don't need Camb.ai API Key if we are using a custom provider exclusively, but types might require it.
const client = new CambClient({
    apiKey: "dummy",
    ttsProvider: "baseten",
    providerParams: {
        api_key: process.env.BASETEN_API_KEY || "dummy",
        mars_pro_url: process.env.BASETEN_URL || "https://model-5qeryx53.api.baseten.co/environments/production/predict"
    }
});

async function main() {
    // Mock base64 audio for demonstration (usually read from file)
    // const audioBase64 = fs.readFileSync("audio.wav").toString("base64");
    const audioBase64 = "UklGRi...";

    console.log("Sending TTS request to Baseten provider...");

    try {
        const response = await client.textToSpeech.tts({
            text: "Hello World and my dear friends",
            // The Baseten provider logic converts this enum/string to lowercase matches
            language: CreateStreamTtsRequestPayload.Language.EnUs,
            speech_model: CreateStreamTtsRequestPayload.SpeechModel.Mars8Flash,
            // voice_id is optional for custom providers
            additional_body_parameters: {
                reference_audio: audioBase64,
                reference_language: "en-us"
            }
        });

        // Save the streaming response to a file
        // response is BinaryResponse which has arrayBuffer() method
        const buffer = await response.arrayBuffer();
        fs.writeFileSync("tts_output.mp3", Buffer.from(buffer));
        console.log("Success! Audio saved to tts_output.mp3");

    } catch (error) {
        console.error("Error during TTS generation:", error);
    }
}

main();

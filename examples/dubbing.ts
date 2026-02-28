
import { CambClient, Languages } from "@camb-ai/browser-sdk";

const client = new CambClient({
    apiKey: process.env.CAMB_API_KEY!,
});

async function main() {
    const response = await client.dub.endToEndDubbing({
        video_url: "https://github.com/Camb-ai/cambai-python-sdk/raw/main/tests/data/test_video.mp4",
        source_language: Languages.EN_US,
        target_languages: [Languages.FR_FR],
    });

    console.log("Dubbing Task created:", response.task_id);
}

main();

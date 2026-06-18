# Camb.ai Browser SDK

<div id="top" align="center">

   ![Banner](assets/banner5_720.jpg)
   <h3>
   <a href="https://camb.ai/"> Camb AI Website </a></h3>

</div>

The official Browser SDK for interacting with [Camb.ai](https://camb.ai)'s powerful voice and audio generation APIs directly from client-side applications.

## ✨ Features

- **Text-to-Speech (TTS)**: Generate high-fidelity speech from text.
- **Dubbing**: End-to-end video dubbing and translation.
- **Generative Voices**: Create new unique voices from text descriptions.
- **Custom Providers**: Extensible architecture to support custom TTS providers.
- **Type-Safe**: Fully typed with TypeScript for a robust development experience.
- **Browser Optimized**: Designed for client-side usage with native `fetch` and `FormData`.

## 📦 Installation

```bash
npm install @camb-ai/browser-sdk@v1.0.1
```

## 🔑 Authentication

Initialize the client with your API key.

```typescript
import { CambClient } from "@camb-ai/browser-sdk";

const client = new CambClient({
  apiKey: "YOUR_CAMB_API_KEY", // Ideally from process.env or a secure source
});
```

## 🚀 Examples

### 1. Text-to-Speech (TTS)

Generate audio from text.

```typescript
import { CambClient, Languages } from "@camb-ai/browser-sdk";

const client = new CambClient({ apiKey: "..." });

async function generateSpeech() {
  const response = await client.tts.create({
    text: "Hello from the Browser SDK!",
    voice_id: 20303, // Standard Voice
    language: Languages.EN_US,
  });

  console.log("TTS Task ID:", response.task_id);
}
```

#### Streaming TTS request options

`client.textToSpeech.tts(...)` accepts the core request fields plus optional controls for model behavior and output format:

| Option | Description |
| :--- | :--- |
| `text` | Text to synthesize. For instruct models, you can include inline emotion or pacing tags. |
| `language` | Locale such as `Languages.EN_US`. |
| `voice_id` | Voice profile ID from the voice list APIs. |
| `speech_model` | Model to use, such as `mars-8-instruct`, `mars-pro`, or `mars-flash`. |
| `user_instructions` | Adds style, tone, pronunciation, or delivery guidance for the request. Available only with an instruct speech model. |
| `output_configuration` | Output settings such as `{ format: "wav" }`. |
| `voice_settings` | Voice behavior controls such as speaking rate, reference enhancement, or accent preservation. |
| `inference_options` | Advanced generation controls for supported models. |
| `enhance_named_entities_pronunciation` | Improves pronunciation for names and other named entities when supported. |

```typescript
const response = await client.textToSpeech.tts({
  text: "[warm, friendly] Great to meet you!",
  voice_id: 20303,
  language: Languages.EN_US,
  speech_model: "mars-8-instruct",
  user_instructions: "Speak warmly and with enthusiasm.",
  output_configuration: { format: "wav" },
});
```

### 2. End-to-End Dubbing

Dub a video from one language to another.

```typescript
import { CambClient, Languages } from "@camb-ai/browser-sdk";

const client = new CambClient({ apiKey: "..." });

async function dubVideo() {
  const response = await client.dubbing.endToEnd({
    video_url: "https://example.com/video.mp4",
    source_language: Languages.EN_US,
    target_languages: [Languages.FR_FR],
  });

  console.log("Dubbing Task ID:", response.task_id);
}
```

## 🛠️ Custom Providers

The SDK supports custom TTS providers through the `TtsProvider` interface. This allows you to integrate third-party services (like Baseten or Vertex AI) while keeping a unified API surface.

### Implementing a Custom Provider

Create a class that implements the `TtsProvider` interface:

```typescript
import { TtsProvider, CambClient } from "@camb-ai/browser-sdk";

class MyCustomProvider implements TtsProvider {
  // Implementation details...
  async generate(text: string, options: any): Promise<any> {
     // specific implementation
  }
}

// Pass provider specific options if supported
const client = new CambClient({
    apiKey: "...",
    // custom settings if extended
});
```

*(Note: Full custom provider integration details typically involve configuring the client to delegate requests, which may vary based on exact SDK version features.)*

## License

MIT

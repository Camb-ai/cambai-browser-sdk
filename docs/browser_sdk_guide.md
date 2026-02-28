# Browser SDK Quickstart

Get started with the Camb.ai Browser SDK in minutes

## Overview

The Camb.ai Browser SDK is designed for client-side applications, providing a simple, type-safe interface to integrate high-quality text-to-speech directly into your web apps.

## Installation

```bash
npm install @camb-ai/browser-sdk
```

## Authentication

> **[!CAUTION] Security Warning**: Hardcoding your API key in client-side code (HTML/JS) is **not secure**. Anyone visiting your site can inspect the source code and steal your key, which can lead to unauthorized usage and charges.

### Recommended: Backend Proxy

For production applications, it is **highly recommended** to route requests through a secure backend proxy:

1. Store your Camb.ai API key securely on your server (e.g., in environment variables).
2. Set up an endpoint on your server that forwards requests to Camb.ai and adds the `x-api-key` header.
3. Implement authentication on your server to control who can use the TTS services.

Initialize the client to point to your proxy URL:

```typescript
import { CambClient } from "@camb-ai/browser-sdk";

const client = new CambClient({
  baseUrl: "https://your-backend.com/api/camb-ai-proxy",
  apiKey: "PROXY_MANAGED", // Current SDK requirement - use a placeholder
});
```

### Development Only (Direct Client)

Use the API key directly **only for local development** or prototyping:

```typescript
import { CambClient } from "@camb-ai/browser-sdk";

const client = new CambClient({
  apiKey: "your_api_key_here",
});
```

## Quick Start

### Streaming Text-to-Speech

Generate and play speech directly in the browser: (Assumes `client` is initialized as shown in the [Authentication](#authentication) section).

```typescript
import { Languages } from "@camb-ai/browser-sdk";

async function playSpeech() {
  const response = await client.textToSpeech.tts({
    text: "Hello! Welcome to Camb.ai text-to-speech.",
    language: Languages.EN_US,
    voice_id: 147320,
    speech_model: "mars-8-flash",
  });

  // Response is a ReadableStream or Blob depending on fetch configuration
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
}
```

### Using the Helper Function

The SDK's `tts` method returns binary data that can be easily converted to a URL for playback:

```typescript
async function streamAndPlay(payload) {
    const stream = await client.textToSpeech.tts(payload);
    const audioUrl = URL.createObjectURL(await stream.blob());
    new Audio(audioUrl).play();
}
```

## Choosing a Model

Camb.ai offers three MARS models optimized for different use cases:

### MARS Flash

```typescript
speech_model: "mars-8-flash"
```

**Best for**: Real-time voice agents, low-latency applications  
**Sample rate**: 22.05kHz

### MARS Pro

```typescript
speech_model: "mars-8-pro"
```

**Best for**: Audio production, high-quality content  
**Sample rate**: 48kHz

### MARS Instruct

```typescript
speech_model: "mars-8-instruct",
user_instructions: "Speak in a warm, friendly tone"
```

**Best for**: Fine-grained control over tone and style  
**Sample rate**: 22.05kHz

## Listing Available Voices

Discover available voices for your application:

```typescript
const voices = await client.voiceCloning.listVoices();

voices.forEach(voice => {
    console.log(`ID: ${voice.id}, Name: ${voice.voiceName}`);
});
```

## Language Support

Camb.ai supports 140+ languages. Specify the language using the `Languages` enum exports:
Languages supported by each model mentioned at [MARS Models](https://docs.camb.ai/models).

```typescript
import { Languages } from "@camb-ai/browser-sdk";

// English (US)
language: Languages.EN_US

// Spanish
language: Languages.ES_ES

// French
language: Languages.FR_FR
```

## Error Handling

Handle common errors gracefully:

```typescript
try {
    const stream = await client.textToSpeech.tts(payload);
} catch (error) {
    console.error("Error generating speech:", error.message);
}
```

## Using Custom Provider

For more details check this guide [Custom Cloud Providers](https://docs.camb.ai/custom-cloud-providers)

### Baseten Deployment

Initialize the client with provider configuration. [Baseten Provider Example](https://github.com/Camb-ai/cambai-browser-sdk/blob/master/examples/baseten_provider.ts)

```typescript
const client = new CambClient({
    ttsProvider: "baseten",
    providerParams: {
        apiKey: "YOUR_BASETEN_API_KEY",
        marsProUrl: "YOUR_BASETEN_URL"
    }
});
```

## Next Steps

| | |
| --- | --- |
| **🎙️ Voice Agents** <br> Build real-time voice agents with Pipecat <br> [Learn more](/tutorials/pipecat) | **🔗 LiveKit Integration** <br> Create voice agents with LiveKit <br> [Learn more](/tutorials/livekit) |
| **📄 API Reference** <br> Explore the full TTS API <br> [Learn more](/api-reference/endpoint/create-tts-stream) | **🔊 Voice Library** <br> Browse available voices <br> [Learn more](/api-reference/endpoint/list-voices) |

## Resources

* [GitHub: camb-ai/cambai-browser-sdk](https://github.com/Camb-ai/cambai-browser-sdk)
* [SDK Examples](https://github.com/Camb-ai/cambai-browser-sdk/tree/master/examples)
* [API Reference](https://docs.camb.ai/api-reference/endpoint/create-tts-stream)

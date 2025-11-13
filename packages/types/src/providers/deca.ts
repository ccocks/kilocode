import type { ModelInfo } from "../model.js"

// https://console.groq.com/docs/models
export type DecaModelId =
	| "moonshotai/kimi-k2-instruct-0905"

export const decaDefaultModelId: DecaModelId = "moonshotai/kimi-k2-instruct-0905"

export const decaModels = {
	"moonshotai/kimi-k2-instruct-0905": {
		maxTokens: 16384,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.6,
		outputPrice: 2.5,
		cacheReadsPrice: 0.15,
		description:
			"Kimi K2 model gets a new version update: Agentic coding: more accurate, better generalization across scaffolds. Frontend coding: improved aesthetics and functionalities on web, 3d, and other tasks. Context length: extended from 128k to 256k, providing better long-horizon support.",
		displayName: "Deca Pro Coder",
	},
} as const satisfies Record<string, ModelInfo>

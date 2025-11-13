import {
	type ProviderName,
	type ModelInfo,
	decaModels,
} from "@roo-code/types"

export const MODELS_BY_PROVIDER: Partial<Record<ProviderName, Record<string, ModelInfo>>> = {
	deca: decaModels,
}

export const PROVIDERS = [
	{ value: "deca", label: "Deca" },
]

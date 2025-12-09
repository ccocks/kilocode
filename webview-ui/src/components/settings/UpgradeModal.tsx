import React, { useState } from "react"
import { VSCodeButton, VSCodeProgressRing } from "@vscode/webview-ui-toolkit/react"
import { AgenticaClient, UpgradeResponse } from "@/services/AgenticaClient"

interface UpgradeModalProps {
    isOpen: boolean
    onClose: () => void
    planId: string
    isDowngrade: boolean
    client: AgenticaClient
    onSuccess: (data: UpgradeResponse) => void
    email: string
    currentCredits: number
    planCost: number
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
    isOpen,
    onClose,
    planId,
    isDowngrade,
    client,
    onSuccess,
    email,
    currentCredits,
    planCost,
}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null

    const handleConfirm = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await client.upgradeSubscription(planId)
            onSuccess(result)
            onClose()
        } catch (err: any) {
            console.error("Upgrade failed", err)
            setError(err.response?.data?.message || err.message || "Failed to upgrade subscription")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}>
            <div
                style={{
                    background: "var(--vscode-editor-background)",
                    border: "1px solid var(--vscode-widget-border)",
                    borderRadius: "8px",
                    padding: "24px",
                    width: "400px",
                    maxWidth: "90%",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}>
                <h2 style={{ margin: 0, fontSize: "1.5em" }}>
                    {isDowngrade ? "Confirm Downgrade" : "Spend Credits"}
                </h2>

                {isDowngrade ? (
                    <div style={{ color: "var(--vscode-foreground)", lineHeight: "1.4" }}>
                        <p>
                            Your plan will switch to <strong style={{ color: "var(--vscode-textLink-foreground)" }}>{planId}</strong> at the end of your current billing cycle.
                        </p>
                        <div
                            style={{
                                marginTop: "12px",
                                padding: "8px 12px",
                                background: "var(--vscode-editor-inactiveSelectionBackground)",
                                borderLeft: "3px solid var(--vscode-charts-yellow)",
                                fontSize: "0.9em"
                            }}>
                            <strong>Note:</strong> No pro-rated refund will be given for the remaining time on your current plan.
                        </div>
                    </div>
                ) : (
                    <div style={{ color: "var(--vscode-foreground)", lineHeight: "1.5" }}>
                        <p style={{ margin: "0 0 12px 0" }}>
                            <strong>{planCost} credits (${planCost / 1000})</strong> will be deducted from your GenLabs Account, <strong>{email}</strong>.
                        </p>
                        <p style={{ margin: "0" }}>
                            You currently have <strong>{currentCredits}</strong>.
                            {currentCredits < planCost && (
                                <span style={{ color: "var(--vscode-errorForeground)", display: "block", marginTop: "8px" }}>
                                    Buy more by signing into your GenLabs account.
                                </span>
                            )}
                        </p>
                    </div>
                )}

                {error && (
                    <div
                        style={{
                            color: "var(--vscode-errorForeground)",
                            background: "rgba(255, 0, 0, 0.1)",
                            padding: "8px",
                            borderRadius: "4px",
                        }}>
                        {error}
                    </div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                    <VSCodeButton appearance="secondary" onClick={onClose} disabled={loading}>
                        Cancel
                    </VSCodeButton>
                    <VSCodeButton
                        onClick={handleConfirm}
                        disabled={loading || (!isDowngrade && currentCredits < planCost)}
                        appearance="primary"
                    >
                        {loading ? <VSCodeProgressRing style={{ height: "16px" }} /> : "Confirm"}
                    </VSCodeButton>
                </div>
            </div>
        </div>
    )
}

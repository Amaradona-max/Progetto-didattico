import { useState } from 'react'

export default function ChatAI({ onEvaluate }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Ciao! Sono EduMind AI. Fammi una domanda sul documento selezionato.',
    },
  ])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isSending) return
    const userMessage = { id: crypto.randomUUID(), role: 'user', text: trimmed }
    const aiMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: 'Sto elaborando la tua richiesta e collego il contenuto al documento.',
    }
    setMessages((prev) => [...prev, userMessage, aiMessage])
    setInput('')
    if (!onEvaluate) return
    setIsSending(true)
    try {
      const result = await onEvaluate(trimmed)
      const answerText = result?.answer || 'Non ho trovato una risposta.'
      setMessages((prev) =>
        prev.map((msg) => (msg.id === aiMessage.id ? { ...msg, text: answerText } : msg))
      )
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessage.id
            ? { ...msg, text: error.message || 'Errore durante la risposta AI.' }
            : msg
        )
      )
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-surface/80 p-4">
      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'ml-auto bg-primary text-white'
                : 'bg-surfaceLight text-textPrimary'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Scrivi una domanda..."
          className="flex-1 rounded-2xl border border-white/10 bg-dark px-4 py-3 text-sm text-textPrimary outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isSending}
          className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSending ? 'Invio...' : 'Invia'}
        </button>
      </div>
    </div>
  )
}

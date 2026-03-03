import { useState, useEffect, useRef } from 'react'
import useSpeechToText from '../hooks/useSpeechToText'

export default function ChatAI({ onEvaluate }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Ciao! Sono il tuo Tutor AI. Sono pronto ad aiutarti con i documenti selezionati in questa atmosfera accogliente. Di cosa vogliamo parlare?',
    },
  ])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef(null)

  const {
    isRecording,
    status,
    transcript,
    partialTranscript,
    error: sttError,
    startRecording,
    stopRecording,
    resetTranscript,
  } = useSpeechToText()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Update input when transcription changes
  useEffect(() => {
    if (transcript || partialTranscript) {
      setInput((transcript ? transcript + ' ' : '') + (partialTranscript || ''))
    }
  }, [transcript, partialTranscript])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isSending) return
    
    if (isRecording) {
      stopRecording()
    }

    const userMessage = { id: crypto.randomUUID(), role: 'user', text: trimmed }
    const aiMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: '...',
    }
    setMessages((prev) => [...prev, userMessage, aiMessage])
    setInput('')
    resetTranscript()
    
    if (!onEvaluate) return
    setIsSending(true)
    try {
      const result = await onEvaluate(trimmed)
      const answerText = result?.answer || 'Non ho trovato una risposta specifica nei documenti.'
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

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className="flex h-full flex-col glass-card rounded-[2.5rem] p-6 relative overflow-hidden border-orange-100">
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none z-10" />
      
      <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto pr-2 scroll-smooth pt-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-[2rem] px-6 py-4 text-sm font-bold leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-orange-600 text-white rounded-tr-none'
                  : 'bg-white border border-orange-100 text-[#451a03] rounded-tl-none'
              }`}
            >
              {msg.text === '...' ? (
                <div className="flex gap-1 py-1">
                  <div className="h-2 w-2 rounded-full bg-orange-400 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              ) : msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {(sttError || status) && (
          <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 px-4 ${sttError ? 'text-red-500' : 'text-orange-600'}`}>
            <span className={`h-1.5 w-1.5 rounded-full bg-current ${isRecording ? 'animate-ping' : ''}`} />
            {sttError || status}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  handleSend()
                }
              }}
              placeholder={isRecording ? 'Ti ascolto...' : 'Chiedi al tuo tutor...'}
              className={`w-full rounded-2xl border border-orange-100 bg-white/50 px-6 py-4 pr-14 text-sm text-[#451a03] font-bold outline-none focus:border-orange-500/50 focus:bg-white transition-all ${
                isRecording ? 'ring-2 ring-orange-500/20' : ''
              }`}
            />
            
            <button
              type="button"
              onClick={toggleRecording}
              className={`absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl flex items-center justify-center transition-all ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-orange-300 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </button>
          </div>

          <button
            type="button"
            onClick={handleSend}
            disabled={isSending || !input.trim()}
            className="h-14 w-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white transition-all hover:bg-orange-700 disabled:opacity-50 disabled:grayscale shadow-lg shadow-orange-500/20 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState, useRef, useCallback, useEffect } from 'react'

export default function useSpeechToText() {
  const [isRecording, setIsRecording] = useState(false)
  const [status, setStatus] = useState('')
  const [transcript, setTranscript] = useState('')
  const [partialTranscript, setPartialTranscript] = useState('')
  const [error, setError] = useState(null)

  const recognitionRef = useRef(null)

  const startRecording = useCallback(async () => {
    setError(null)
    setStatus('Ricerca microfono...')

    try {
      // 1. Chiediamo prima i permessi per assicurarci che il Mac non usi l'iPhone
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioDevices = devices.filter(d => d.kind === 'audioinput')
      
      // Cerchiamo il microfono integrato per evitare di attivare l'iPhone via Continuity
      const builtInMic = audioDevices.find(d => 
        d.label.toLowerCase().includes('built-in') || 
        d.label.toLowerCase().includes('integrato')
      )

      const constraints = {
        audio: builtInMic ? { deviceId: { exact: builtInMic.deviceId } } : true
      }

      // Attiviamo il microfono locale prima di far partire la dettatura
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      
      // Una volta ottenuto il microfono locale, avviamo il riconoscimento
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        throw new Error('Browser non supportato')
      }

      const recognition = new SpeechRecognition()
      recognition.lang = 'it-IT'
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => {
        setIsRecording(true)
        setStatus('In ascolto (Mac Mic)...')
      }

      recognition.onresult = (event) => {
        let interim = ''
        let final = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) final += event.results[i][0].transcript
          else interim += event.results[i][0].transcript
        }
        if (final) setTranscript(prev => prev + ' ' + final)
        setPartialTranscript(interim)
      }

      recognition.onerror = (event) => {
        if (event.error === 'no-speech') return
        console.error('Speech Error:', event.error)
        setError('Errore microfono. Controlla le impostazioni di sistema.')
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
        setStatus('')
        // Fermiamo lo stream audio per rilasciare il microfono
        stream.getTracks().forEach(t => t.stop())
      }

      recognitionRef.current = recognition
      recognition.start()

    } catch (err) {
      console.error('Start Error:', err)
      setError('Impossibile accedere al microfono del Mac.')
      setStatus('')
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
  }, [])

  return {
    isRecording,
    status,
    transcript,
    partialTranscript,
    error,
    startRecording,
    stopRecording,
    resetTranscript: () => { setTranscript(''); setPartialTranscript(''); }
  }
}

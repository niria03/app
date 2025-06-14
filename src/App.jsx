import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// Fix icone Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const App = () => {
  const [language, setLanguage] = useState('it')
  const [message, setMessage] = useState('')
  const [micActive, setMicActive] = useState(false)

  const handleMic = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    recognition.lang = language
    recognition.start()
    setMicActive(true)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setMessage(transcript)
      setMicActive(false)
    }

    recognition.onerror = () => setMicActive(false)
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    speechSynthesis.speak(utterance)
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1>Valle dei Templi - CoopCulture</h1>

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="it">Italiano</option>
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="hi">हिन्दी</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
        <option value="bn">বাংলা</option>
        <option value="pt">Português</option>
        <option value="ru">Русский</option>
        <option value="ja">日本語</option>
      </select>

      <MapContainer center={[37.2906, 13.5858]} zoom={15} style={{ height: '400px', margin: '1rem 0' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[37.2906, 13.5858]}>
          <Popup>Tempio della Concordia</Popup>
        </Marker>
      </MapContainer>

      <button onClick={handleMic}>{micActive ? '🎤 Registrando...' : '🎙️ Parla con la guida'}</button>

      {message && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Hai detto:</strong> {message}</p>
          <button onClick={() => speak("Ecco la mia risposta alla tua domanda")}>🔊 Risposta vocale</button>
        </div>
      )}
    </div>
  )
}

export default App

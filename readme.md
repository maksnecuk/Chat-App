# 🚀 Modern ChatApp

Eine moderne und schnelle Webanwendung für Echtzeit-Kommunikation, basierend auf **TypeScript**, **Vite** und **WebSockets**. Das Projekt nutzt **Tailwind CSS** und **DaisyUI** für eine stilvolle und responsive Benutzeroberfläche.

## ✨ Hauptfunktionen

- 👤 **Schnelle Registrierung**: Gib einfach deinen Nicknamen ein und leg sofort los.
- 🏠 **Raumverwaltung**: Erstelle eigene Chat-Räume oder tritt bestehenden bei.
- 💬 **Echtzeit-Messaging**: Sofortige Zustellung von Nachrichten über WebSockets.
- 🖼️ **Multimedia-Unterstützung**: Sende sowohl Textnachrichten als auch Bilder.
- ✏️ **Nachrichten bearbeiten**: Bearbeite oder aktualisiere deine bereits gesendeten Nachrichten.
- 🛠️ **Systembenachrichtigungen**: Automatische Infos über Benutzer, die den Raum betreten oder verlassen.
- 📱 **Responsive Design**: Dank Tailwind CSS und DaisyUI sieht die App auf jedem Gerät gut aus.

## 🛠️ Tech-Stack

- **Frontend:** [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Kommunikation:** WebSockets (WSS) & REST API
- **State Management:** LocalStorage & SessionStorage

## 📂 Projektstruktur

```text
src/
├── chat.ts                     # Hauptlogik des Chats und WebSocket-Verbindung
├── userRegistration.ts         # Registrierung und Profilverwaltung
├── createRoom.ts               # Logik zum Erstellen neuer Räume
├── enterRoom.ts                # Beitreten zu bestehenden Räumen
├── fetchMessage.ts             # Abrufen des Nachrichtenverlaufs
├── renderMessage.ts            # Hauptmodul für das Rendern von Nachrichten
├── renderMessageType*.ts       # Spezialisierte Renderer (Bild, Text, System)
├── sendNewMessage.ts           # Senden von Textnachrichten
├── sendImageMessage.ts         # Hochladen und Senden von Bildern
└── style.css                   # Globale Stile und Tailwind-Konfiguration
```

## 🚀 Schnellstart

### 1. Repository klonen
```bash
git clone <deine-repository-url>
cd chatapp
```

### 2. Abhängigkeiten installieren
```bash
npm install
```

### 3. Entwicklungsmodus starten
```bash
npm run dev
```

### 4. Build für Produktion
```bash
npm run build
```

## 🔧 API & Backend

Die App kommuniziert mit dem Backend unter `chat.homebin.dev`:
- **WebSocket:** `wss://chat.homebin.dev/join/{roomId}?userId={userId}`
- **REST API:** `https://chat.homebin.dev/rooms/{roomId}/messages`

---
Entwickelt mit ❤️ für ein modernes Chat-Erlebnis.

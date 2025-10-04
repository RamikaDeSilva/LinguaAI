# Interest-Tuned Spanish Anki Deck

Generate personalized Spanish vocabulary decks for Anki based on your interests.

## Features

- **Personalized Vocabulary**: Mix core frequency words with interest-specific terms
- **Interest Domains**: Choose from fitness, guitar, business, travel, programming, and food
- **Customizable**: Adjust deck size (100-2000 cards) and difficulty level (A1-B1)
- **Anki-Ready**: Download CSV files that import directly into Anki
- **Example Sentences**: Get context-specific example sentences for better retention

## Quick Start

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to use the application.

## How It Works

1. **Select Interests**: Choose from 6 interest domains
2. **Configure Settings**: Set deck size and difficulty level
3. **Generate Deck**: Get a personalized CSV file
4. **Import to Anki**: Use the generated file in Anki

## Architecture

- **Backend**: Node.js + Express API
- **Frontend**: React + Vite
- **Data**: Static JSON files with vocabulary and templates
- **Output**: CSV format compatible with Anki

## Interest Domains

- **Fitness**: Exercise, gym, training vocabulary
- **Guitar**: Music, instruments, performance terms
- **Business**: Work, office, professional language
- **Travel**: Tourism, transportation, destinations
- **Programming**: Technology, coding, development
- **Food**: Cooking, restaurants, culinary terms

## Why This Helps Retention

- **Personal Relevance**: Words match your interests
- **Contextual Examples**: Sentences use your domain vocabulary
- **Frequency-Based**: Core words ensure comprehensive coverage
- **Balanced Mix**: 35% interest words, 65% core frequency

## Demo

1. Select "fitness" and "guitar" interests
2. Set deck size to 750 cards
3. Choose A2 level
4. Click "Generate CSV"
5. Import the downloaded file into Anki

The generated deck will include fitness and guitar vocabulary mixed with core Spanish words, complete with relevant example sentences.

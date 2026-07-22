# CoursePilot-AI Course Assistant

An AI-powered Retrieval-Augmented Generation (RAG) application that answers questions about course content by searching lecture subtitles and returning accurate responses with the relevant lesson name and timestamp.

---

##  Features

-  Ask natural language questions about the course.
-  Retrieves the most relevant lecture segments using semantic search.
-  Returns lesson names and timestamps for easy navigation.
-  Uses Retrieval-Augmented Generation (RAG) for accurate, context-aware responses.
-  Fast vector similarity search using Pinecone.
-  Modern React + Tailwind CSS interface.

---

##  Tech Stack

### Frontend

- React
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend

- Node.js
- Express.js
- LangChain
- OpenAI API

### Database & Vector Store

- Pinecone Vector Database

---



##  How It Works

### 1. Subtitle Ingestion

Course subtitle files (`.srt` / `.vtt`) are parsed and cleaned.

---

### 2. Chunking

The subtitles are divided into smaller semantic chunks while preserving metadata such as:

- Lesson name
- Timestamp
- Transcript text

---

### 3. Embedding Generation

Each chunk is converted into vector embeddings using OpenAI Embeddings.

---

### 4. Vector Storage

The embeddings are stored inside Pinecone for efficient semantic similarity search.

---

### 5. User Query

When a user asks a question:

- The query is embedded.
- Pinecone retrieves the most relevant subtitle chunks.
- Retrieved context is passed to the LLM.

---

### 6. AI Response

The LLM generates an answer using only the retrieved context and includes:

- Accurate explanation
- Lesson name
- Timestamp reference

---

##  RAG Pipeline

```
Course Subtitles
        │
        ▼
 Subtitle Parser
        │
        ▼
 Text Chunking
        │
        ▼
 OpenAI Embeddings
        │
        ▼
 Pinecone Vector Store
        │
──────────────────────────────
        │
        ▼
 User Question
        │
        ▼
 Query Embedding
        │
        ▼
 Similarity Search
        │
        ▼
 Relevant Chunks
        │
        ▼
 OpenAI GPT
        │
        ▼
 Final Answer + Lesson + Timestamp
```

---

##  Installation

### Clone the repository

```bash
git clone <repository-url>
cd AI-Course-Assistant
```

---

### Backend

```bash
cd backend

npm install
```

Create a `.env` file

```env
OPENAI_API_KEY=your_openai_key

PINECONE_API_KEY=your_pinecone_key

PINECONE_INDEX_NAME=your_index_name
```

Run subtitle ingestion

```bash
npm run seed
```

Start the backend

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 💻 Example Question

```
How do API routes work in Expo Router?
```

Example Response

```
API Routes allow server-side logic to be written inside the Expo Router project...

Lesson:
Creating API Routes

Timestamp:
08:15 - 10:42
```

---


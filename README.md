# Project Tatva: An AI-Powered All-in-One Platform for Teachers

Project Tatva is a full-stack AI-powered platform designed to be an indispensable assistant for teachers. It leverages a sophisticated multi-agent system built with Google's Agent Development Kit (ADK) to streamline a teacher's entire workflow, from lesson planning and content creation to student assessment and communication.

## Features

### Core Platform
- **Modern CRM Dashboard:** A clean, intuitive, and responsive interface designed to give teachers a comprehensive overview of their classes and students.
- **Multi-Agent System:** A powerful backend built with FastAPI and Google's ADK, featuring a suite of specialized AI agents that can be orchestrated to perform complex tasks.
- **Live Configuration:** A settings sidebar that allows for real-time modification of agent instructions and guardrails, with instant agent rebuilds.

### Agent Capabilities
- **Content Generation:**
    - **Lesson Plan Generator:** Creates complete, multi-modal lesson plans with objectives, activities, and materials.
    - **Quiz & Exam Generator:** Generates quizzes and exams with varied question types.
    - **Flashcard Maker:** Creates digital flashcards for any topic.
    - **Visual Aid Creator:** Generates images, diagrams, and charts.
- **Student Assessment & Feedback:**
    - **Essay Evaluator:** Grades essays based on a detailed, 5-point rubric.
    - **Personalized Learning Path Suggester:** Recommends a personalized learning path for students based on their performance.
- **Research & Analysis:**
    - **Web Search Agent:** Fetches real-time information from the web.
    - **Document Analysis Agent:** Analyzes uploaded documents and provides summaries.
- **And more:** The platform includes agents for in-depth research, web scraping, and interdisciplinary question generation.

## Project Structure

```
.
├── backend/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── cloudbuild.yaml
│   ├── config.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── agents/
│   ├── api/
│   ├── competencies_grading/
│   └── generated_images/
└── frontend/
    ├── .dockerignore
    ├── Dockerfile
    ├── cloudbuild.yaml
    ├── index.html
    ├── package.json
    └── src/
        ├── App.jsx
        ├── App.css
        ├── main.jsx
        ├── assets/
        ├── components/
        └── services/
```

## Getting Started

### Prerequisites
- **Python 3.13+**
- **Node.js 20+** and **npm**
- **Google Cloud SDK** (for deployment)

### 1. Backend Setup

```bash
cd backend
python -m venv venv
# Activate your virtual environment
source venv/bin/activate
pip install -r requirements.txt
```

**Set up your `.env` file in the `backend` directory:**
```
GOOGLE_API_KEY=your_google_api_key_here
```

**Run the backend:**
```bash
uvicorn main:app --reload
```
The backend will be available at `http://localhost:8000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Deployment to Google Cloud

This project is designed to be deployed to Google Cloud, with the backend running on **Agent Engine** and the frontend on **Cloud Run**.

### 1. Deploy the Backend
1.  Navigate to the `backend` directory.
2.  Run the following command:
    ```bash
    gcloud builds submit --config cloudbuild.yaml .
    ```
3.  After the deployment is complete, GCP will provide you with a URL for your Agent Engine service. Copy this URL.

### 2. Deploy the Frontend
1.  Open the `frontend/cloudbuild.yaml` file.
2.  Replace `YOUR_AGENT_ENGINE_URL` with the URL you copied in the previous step.
3.  Navigate to the `frontend` directory.
4.  Run the following command:
    ```bash
    gcloud builds submit --config cloudbuild.yaml .
    ```

### Environment Variables
-   `GOOGLE_API_KEY`: Your Google API key for the backend.
-   `VITE_API_BASE_URL`: The URL of your deployed backend service. This is set in the `frontend/cloudbuild.yaml` file during deployment.

## License
This project is for educational/demo purposes.

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
│   # ... (backend files)
└── frontend/
    ├── apphosting.yaml  # Firebase App Hosting config
    ├── firebase.json    # Firebase project config
    ├── index.html
    ├── package.json
    └── src/
        ├── App.jsx
        # ... (other frontend files)
```

## Getting Started

### Prerequisites
- **Python 3.13+**
- **Node.js 20+** and **npm**
- **Firebase CLI**

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

## Deployment to Firebase App Hosting

This project is configured for deployment to **Firebase App Hosting**.

1.  **Install Dependencies:** Before deploying, ensure you have installed the project's dependencies:
    ```bash
    npm install
    ```
2.  **Enable Experiments:** The Firebase CLI requires a feature flag to be enabled for App Hosting deployments. Run this command once:
    ```bash
    firebase experiments:enable webframeworks
    ```
3.  **Deploy:** Run the standard Firebase deploy command. The CLI will read the `firebase.json` and `apphosting.yaml` files to build and deploy your application.
    ```bash
    firebase deploy
    ```

### Configuration Files

-   **`apphosting.yaml`**: This file configures the build and deployment for Firebase App Hosting. It specifies the build command (`npm run build`), sets environment variables, and configures the server to serve the static files from the `dist` directory.
-   **`firebase.json`**: This file tells the Firebase CLI that this project uses App Hosting.
-   **`.firebaserc`** (not committed): This file should be created to link your local project to your Firebase project ID. Example:
    ```json
    {
      "projects": {
        "default": "your-firebase-project-id"
      }
    }
    ```

## Deployment Notes & Troubleshooting

-   **Node.js Version:** This project's dependencies may require a specific Node.js version. If you encounter an `EBADENGINE` error during `npm install`, check the `vite` version in `package.json` and ensure it's compatible with your Node.js version. We have set it to `vite: "^5.0.0"` which is compatible with Node.js v20.
-   **Backend URL Handling:** The backend service may return `localhost` URLs for generated assets (like images). To fix this, the frontend components (`ChatWindow.jsx` and `ResultCard.jsx`) have been modified to replace `localhost` URLs with the public production URL. This is a workaround; the ideal solution is to configure the backend to be aware of its public-facing URL.

## License
This project is for educational/demo purposes.

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, DocumentTextIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline';
import mathsImg from './assets/maths.png';
import physicsImg from './assets/physics.png';
import historyImg from './assets/history.png';
import ChatWindow from './components/ChatWindow';
import ConfigSidebar from './components/ConfigSidebar';
import ResultCard from './components/ResultCard';
import * as api from './services/api';
import './App.css';

const Dashboard = ({
  input,
  setInput,
  isLoading,
  handleSendMessage,
  results,
  chatEndRef,
  attachedFiles,
  showFilePreview,
  handleFileChange,
  setAttachedFiles,
  plusClicked,
  setPlusClicked,
  handleClearChat
}) => (
  <div>
    <p>Welcome back, FullStackCoders! Here's a snapshot of your classes and student progress</p>
    
    <h2>Upcoming Lessons</h2>
    <div className="card-container">
      <div className="card">
        <img src={mathsImg} alt="Math" />
        <h3>Math 101 - Algebra</h3>
        <p className="card-subtitle">Tomorrow, 9:00 AM - 10:00 AM</p>
      </div>
      <div className="card">
        <img src={physicsImg} alt="Science" />
        <h3>Science 202 - Biology</h3>
        <p className="card-subtitle">Wednesday, 11:00 AM - 12:00 PM</p>
      </div>
      <div className="card">
        <img src={historyImg} alt="History" />
        <h3>History 301 - World History</h3>
        <p className="card-subtitle">Thursday, 1:00 PM - 2:00 PM</p>
      </div>
    </div>

    <h2>Student Performance Summary</h2>
    <div className="card-container">
      <div className="card">
        <h3>Average Grade</h3>
        <p className="large-text">85%</p>
      </div>
      <div className="card">
        <h3>Students Passed</h3>
        <p className="large-text">120</p>
      </div>
      <div className="card">
        <h3>Students Needing Support</h3>
        <p className="large-text">15</p>
      </div>
    </div>

    <h2>Quick Actions</h2>
    <div className="quick-actions">
      <button>Plan a Lesson</button>
      <button>Manage Content</button>
      <button onClick={handleClearChat}>Clear Chat</button>
    </div>

    <div className="chat-card">
      <h2 style={{ textAlign: 'center', margin: '0 0 1.2rem 0', fontWeight: 700, fontSize: '2rem', color: '#1d1d1f' }}>
        ✨ Project Tatva Powered Search, Analysis & Insights
      </h2>
      <p style={{ textAlign: 'center', color: '#6e6e73', marginBottom: '2rem', fontSize: '1.15em' }}>
        Get direct answers from web search or deep insights with Image Generation and AI Agents.
      </p>

      {results.map((result, idx) => (
        <ResultCard key={idx} result={result} />
      ))}

      <div ref={chatEndRef} />
      {attachedFiles.length > 0 && showFilePreview && attachedFiles.map((file, idx) => (
        <div className="file-preview" key={file.name + idx}>
          <span className="file-preview-icon">📄</span>
          <div className="file-preview-details">
            <div className="file-preview-name">{file.name}</div>
            <div className="file-preview-type">
              {file.type ? file.type.split("/")[1]?.toUpperCase() : "File"}
            </div>
          </div>
          <button
            type="button"
            className="file-preview-remove"
            onClick={() => {
              setAttachedFiles(prev => prev.filter((_, i) => i !== idx));
            }}
            aria-label="Remove file"
            title="Remove file"
          >
            ✖
          </button>
        </div>
      ))}

      <form onSubmit={handleSendMessage} className="chat-input-form" encType="multipart/form-data">
        <label
          htmlFor="file-upload"
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => {
            setPlusClicked(true);
            setTimeout(() => setPlusClicked(false), 400);
          }}
        >
          <span
            className={plusClicked ? "plus-animate" : ""}
            style={{
              fontSize: "2em",
              color: "#007aff",
              fontWeight: "bold",
              lineHeight: "1",
              marginLeft: "1rem",
              transition: "transform 0.4s"
            }}
          >
            +
          </span>
          <input
            id="file-upload"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask any question or enter analysis topic..."
          disabled={isLoading}
          aria-label="Chat input"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? <div className="loading-dots"><span>.</span><span>.</span><span>.</span></div> : "Search"}
        </button>
      </form>
      <div style={{ marginTop: '1.2rem', color: '#bdbdbd', fontSize: '0.98em', textAlign: 'center' }}>
        <span style={{ marginRight: '1.2em' }}>🌐 Get instant answers from the web</span>
        <span>🧠 Deep analysis with AI agents</span>
      </div>
    </div>
  </div>
);

const Classes = () => <div>Classes Page</div>;
const Content = () => <div>Content Page</div>;
const Reports = () => <div>Reports Page</div>;
const Settings = () => <div>Settings Page</div>;

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-header">
      <h2>Ms. Harper</h2>
      <p>Teacher</p>
    </div>
    <nav>
      <ul>
        <li><NavLink to="/" end><HomeIcon className="sidebar-icon" />Home</NavLink></li>
        <li><NavLink to="/classes"><UserGroupIcon className="sidebar-icon" />Classes</NavLink></li>
        <li><NavLink to="/content"><DocumentTextIcon className="sidebar-icon" />Content</NavLink></li>
        <li><NavLink to="/reports"><ChartBarIcon className="sidebar-icon" />Reports</NavLink></li>
        <li><NavLink to="/settings"><CogIcon className="sidebar-icon" />Settings</NavLink></li>
      </ul>
    </nav>
  </div>
);

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [config, setConfig] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [plusClicked, setPlusClicked] = useState(false);
  const chatEndRef = useRef(null);

  const handleClearChat = async () => {
    setIsLoading(true);
    try {
      await api.resetChat();
      setResults([]);
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear chat:', error);
      alert('Could not clear the chat. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

  useEffect(() => {
    console.log('Fetching initial configuration...');
    setIsLoading(true);
    api.fetchConfig()
      .then(initialConfig => {
        setConfig(initialConfig);
        console.log('Configuration loaded successfully.');
      })
      .catch(error => {
        console.error('Failed to load initial configuration:', error);
        alert('Could not connect to the backend. Please ensure it is running.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setShowFilePreview(false);
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("prompt", input);
    attachedFiles.forEach(file => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${api.API_BASE_URL}/chat`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      const assistantMessage = {
        role: 'assistant',
        content: `<strong>[${data.agentName}]</strong> ${data.responseText}`
      };
      setMessages(prev => [...prev, assistantMessage]);

      const newResult = {
        query: input,
        directAnswer: data.responseText,
        sources: [],
        agentName: data.agentName,
        file_path: data.file_path
      };

      setResults(prev => [...prev, newResult]);
      setInput("");
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage = {
        role: 'assistant',
        content: `<strong>[System Error]</strong> ${error.message}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
    setShowFilePreview(true);
  };

  const handleApplyChanges = async () => {
    if (isLoading) return;

    console.log('Applying new configuration...', config);
    setIsLoading(true);
    alert("Applying changes... The agents will be rebuilt and the chat will be reset.");

    try {
      const response = await api.updateConfig(config);
      console.log('Backend response:', response.message);
      setMessages([]);
      alert("Configuration applied successfully!");
    } catch (error) {
      console.error("Failed to apply changes:", error);
      alert(`Error applying changes: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <header className="main-header">
        <div className="header-left">
          <span className="header-title">Project Tatva</span>
          <span className="header-subtitle">We do it Better</span>
        </div>
        <button
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? "Hide configuration" : "Show configuration"}
        >
          {sidebarOpen ? "✖" : "⚙️"}
        </button>
      </header>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <Dashboard
                input={input}
                setInput={setInput}
                isLoading={isLoading}
                handleSendMessage={handleSendMessage}
                results={results}
                chatEndRef={chatEndRef}
                attachedFiles={attachedFiles}
                showFilePreview={showFilePreview}
                handleFileChange={handleFileChange}
                setAttachedFiles={setAttachedFiles}
                plusClicked={plusClicked}
                setPlusClicked={setPlusClicked}
                handleClearChat={handleClearChat}
              />
            } />
            <Route path="/classes" element={<Classes />} />
            <Route path="/content" element={<Content />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <ConfigSidebar
          className={`config-sidebar${sidebarOpen ? ' sidebar-open' : ''}`}
          config={config}
          setConfig={setConfig}
          onApplyChanges={handleApplyChanges}
          isApplying={isLoading}
        />
      </div>
    </div>
  );
}

export default App;

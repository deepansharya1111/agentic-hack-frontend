// import React from "react";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import "./ResultCard.css";
// //import MCQBlock from "./MCQBlock.jsx";


// const BACKEND_URL = "http://localhost:8000"; // Or use an environment variable

// const transformMarkdownWithCitations = (markdown) => {
//   const sources = [];
//   const urlToCitation = {};
//   let citationCounter = 1;

//   const updatedMarkdown = markdown.replace(
//     /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
//     (_, label, url) => {
//       if (!urlToCitation[url]) {
//         urlToCitation[url] = citationCounter++;
//         sources.push({ number: urlToCitation[url], url });
//       }
//       const num = urlToCitation[url];
//       return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;"><sup style="color: #60a5fa;">^${num}</sup></a>`;
//     }
//   );

//   return { markdownWithCitations: updatedMarkdown, sources };
// };

// function renderJsonValue(value, depth = 0) {
//   if (Array.isArray(value)) {
//     return (
//       <ul style={{ marginLeft: depth * 16 }}>
//         {value.map((item, idx) => (
//           <li key={idx}>{renderJsonValue(item, depth + 1)}</li>
//         ))}
//       </ul>
//     );
//   }
//   if (typeof value === "object" && value !== null) {
//     return (
//       <div style={{ marginLeft: depth * 16 }}>
//         {Object.entries(value).map(([k, v]) => (
//           <div key={k} style={{ marginBottom: "0.5em" }}>
//             <strong>{k.replace(/_/g, " ")}:</strong> {renderJsonValue(v, depth + 1)}
//           </div>
//         ))}
//       </div>
//     );
//   }
//   return <span>{String(value)}</span>;
// }

// function renderJsonSection(json) {
//   if (!json || typeof json !== "object") return null;
//   return Object.entries(json).map(([key, value]) => {
//     const label = key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
//     return (
//       <section key={key}>
//         <h3>{label}</h3>
//         {renderJsonValue(value)}
//       </section>
//     );
//   });
// }

// function ResultCard({ result }) {
//   const { directAnswer = "No answer available.", file_path } = result;
//   const imageSrc = file_path && file_path.startsWith("/images/")
//     ? `${BACKEND_URL}${file_path}`
//     : file_path;
//   const { markdownWithCitations, sources } = transformMarkdownWithCitations(directAnswer);

//   // Try to parse JSON
//   let parsedJson = null;
//   try {
//     parsedJson = JSON.parse(directAnswer);
//   } catch {
//     parsedJson = null;
//   }

//   console.log('API result:', result); // Log the entire result object

//   return (
//     <div className="result-card">
//       <div className="result-card-header">
//         <span className="result-card-icon">🌐</span>
//         <span className="result-card-title">
//           Web Search Results{" "}
//           {result.agentName && (
//             <span style={{ color: "#38bdf8", fontWeight: 400 }}>
//               ({result.agentName})
//             </span>
//           )}
//         </span>
//         <span className="result-card-query">
//           Query:{" "}
//           <span className="result-card-query-text">
//             "{result.query || "No query"}"
//           </span>
//         </span>
//         <span className="result-card-status result-card-complete">Complete</span>
//       </div>

//       <div className="result-card-answer-section">
//         <div className="result-card-answer-label">
//           <span className="result-card-answer-icon">💡</span> Answer
//         </div>
//         <div className="result-card-answer">
//           {parsedJson
//             ? renderJsonSection(parsedJson)
//             : (
//               <ReactMarkdown
//                 rehypePlugins={[rehypeRaw]}
//                 remarkPlugins={[remarkGfm]}
//                 components={{
//                   table: ({node, ...props}) => <table className="markdown-content" {...props} />,
//                 }}
//               >
//                 {markdownWithCitations}
//               </ReactMarkdown>
//             )
//           }
//           {file_path && (
//             <div className="gemini-image-box" style={{ margin: "2em auto 0 auto", display: "flex", justifyContent: "center" }}>
//               <img
//                 src={imageSrc}
//                 alt="Generated"
//                 style={{
//                   width: "350px",
//                   height: "350px",
//                   objectFit: "cover",
//                   borderRadius: "16px",
//                   boxShadow: "0 4px 24px #0003",
//                   background: "#18181c",
//                   border: "1px solid #23232a",
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="result-card-sources-section">
//         <div className="result-card-sources-label">Sources &amp; Details</div>
//         {sources.length === 0 ? (
//           <div className="result-card-source" style={{ color: "#bdbdbd" }}>
//             No sources available.
//           </div>
//         ) : (
//           <div className="result-card-source-list">
//             {sources.map((src) => (
//               <div key={src.number} className="result-card-source-item">
//                 <sup>^{src.number}</sup>{" "}
//                 <a
//                   href={src.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="result-card-source-link"
//                 >
//                   {src.url}
//                 </a>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ResultCard;

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MCQBlock from "./MCQBlock.jsx";
import "./ResultCard.css";

const BACKEND_BASE_URL = 'https://agent-engine-backend-811982883381.us-central1.run.app';

const transformMarkdownWithCitations = (markdown) => {
  const sources = [];
  const urlToCitation = {};
  let citationCounter = 1;

  const updatedMarkdown = markdown.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_, label, url) => {
      if (!urlToCitation[url]) {
        urlToCitation[url] = citationCounter++;
        sources.push({ number: urlToCitation[url], url });
      }
      const num = urlToCitation[url];
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;"><sup style="color: #60a5fa;">^${num}</sup></a>`;
    }
  );

  return { markdownWithCitations: updatedMarkdown, sources };
};

function extractJsonFromMarkdown(markdown) {
  const match = markdown.match(/```json\s*([\s\S]*?)```/i);
  if (match) {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  }
  try {
    return JSON.parse(markdown);
  } catch {
    return null;
  }
}

function renderJsonValue(value, depth = 0) {
  if (Array.isArray(value)) {
    return (
      <ul style={{ marginLeft: depth * 16 }}>
        {value.map((item, idx) => (
          <li key={idx}>{renderJsonValue(item, depth + 1)}</li>
        ))}
      </ul>
    );
  }
  if (typeof value === "object" && value !== null) {
    // MCQ detection: question, alternatives, correct_answer, explanation
    if (
      value.question &&
      value.alternatives &&
      value.correct_answer &&
      value.explanation
    ) {
      return <MCQBlock data={value} />;
    }
    return (
      <div style={{ marginLeft: depth * 16 }}>
        {Object.entries(value).map(([k, v]) => (
          <div key={k} style={{ marginBottom: "0.5em" }}>
            <strong>{k.replace(/_/g, " ")}:</strong> {renderJsonValue(v, depth + 1)}
          </div>
        ))}
      </div>
    );
  }
  return <span>{String(value)}</span>;
}

function renderJsonSection(json) {
  if (!json || typeof json !== "object") return null;
  return Object.entries(json).map(([key, value]) => {
    const label = key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    return (
      <section key={key}>
        <h3>{label}</h3>
        {renderJsonValue(value)}
      </section>
    );
  });
}

function ResultCard({ result }) {
  const { directAnswer = "No answer available.", file_path, agentName } = result;
  const imageSrc = file_path && file_path.startsWith("http") ? file_path : file_path ? `${BACKEND_BASE_URL}/${file_path.startsWith('/') ? file_path.substring(1) : file_path}` : file_path;
  const { markdownWithCitations, sources } = transformMarkdownWithCitations(directAnswer);

  const parsedJson = extractJsonFromMarkdown(directAnswer);

  return (
    <div className="result-card">
      <div className="result-card-header">
        <span className="result-card-icon">🌐</span>
        <span className="result-card-title">
          Web Search Results{" "}
          {agentName && (
            <span style={{ color: "#38bdf8", fontWeight: 400 }}>
              ({agentName})
            </span>
          )}
        </span>
        <span className="result-card-query">
          Query:{" "}
          <span className="result-card-query-text">
            "{result.query || "No query"}"
          </span>
        </span>
        <span className="result-card-status result-card-complete">Complete</span>
      </div>

      <div className="result-card-answer-section">
        <div className="result-card-answer-label">
          <span className="result-card-answer-icon">💡</span> Answer
        </div>
        <div className="result-card-answer">
          {parsedJson
            ? renderJsonSection(parsedJson)
            : (
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({node, ...props}) => <table className="markdown-content" {...props} />,
                }}
              >
                {markdownWithCitations}
              </ReactMarkdown>
            )
          }
          {file_path && (
            <div className="gemini-image-box" style={{ margin: "2em auto 0 auto", display: "flex", justifyContent: "center" }}>
              <img
                src={imageSrc}
                alt="Generated"
                style={{
                  width: "350px",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  boxShadow: "0 4px 24px #0003",
                  background: "#18181c",
                  border: "1px solid #23232a",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="result-card-sources-section">
        <div className="result-card-sources-label">Sources &amp; Details</div>
        {sources.length === 0 ? (
          <div className="result-card-source" style={{ color: "#bdbdbd" }}>
            No sources available.
          </div>
        ) : (
          <div className="result-card-source-list">
            {sources.map((src) => (
              <div key={src.number} className="result-card-source-item">
                <sup>^{src.number}</sup>{" "}
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="result-card-source-link"
                >
                  {src.url}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultCard;

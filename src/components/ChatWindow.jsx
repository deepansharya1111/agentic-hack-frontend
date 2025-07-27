import React, { useEffect, useRef } from 'react';

/**
 * A presentational component that displays a list of chat messages.
 * It automatically scrolls to the latest message.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.messages - An array of message objects to display.
 *   Each object should have a `role` ('user' or 'assistant') and `content` (string).
 * @param {boolean} props.isLoading - A flag to indicate if the assistant is currently "thinking".
 */
function ChatWindow({ messages, isLoading }) {
  // Create a ref to attach to the last element in the message list.
  // This gives us a direct DOM node reference to scroll to.
  const messagesEndRef = useRef(null);

  /**
   * A function that scrolls the referenced element into view smoothly.
   */
  const scrollToBottom = () => {
    // The ?. is optional chaining, ensuring this doesn't crash if the ref isn't attached yet.
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // The useEffect hook will run the scrollToBottom function whenever the `messages` array changes.
  // This ensures that after a new message is added, the view scrolls down automatically.
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="messages-list">
        {/*
          Iterate over the messages array and render a div for each message.
          Using the index as a key is acceptable here because the list is append-only
          and items are not reordered or deleted.
        */}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-content">
              {/*
                For the assistant's response, we use dangerouslySetInnerHTML.
                This is necessary to render the '<strong>[agentName]</strong>' part as bold HTML.
                IMPORTANT: Only do this when you trust the source of the HTML string. In our case,
                we are constructing it on our frontend from a trusted API response, so it is safe.
              */}
              {msg.role === 'assistant' ? (
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
              ) : (
                // User messages are rendered as plain text.
                msg.content
              )}
            </div>
          </div>
        ))}

        {/*
          Conditionally render a "Thinking..." bubble while waiting for the API response.
          It's styled like an assistant message for visual consistency.
        */}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content thinking">
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </div>
          </div>
        )}

        {/* This empty div is the target for our auto-scroll ref. */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
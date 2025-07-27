import React from 'react';

/**
 * A sidebar component for displaying and editing agent and guardrail configurations.
 *
 * @param {object} props - The component's props.
 * @param {object} props.config - The current configuration object from the parent state.
 *   It should have `agent_configs` and `guardrail_configs` keys.
 * @param {function} props.setConfig - The state setter function from the parent (e.g., from useState)
 *   to update the configuration object as the user types.
 * @param {function} props.onApplyChanges - A callback function to be executed when the "Apply" button is clicked.
 *   This typically triggers an API call in the parent component.
 * @param {boolean} props.isApplying - A boolean to indicate if the apply changes action is in progress.
 */
function ConfigSidebar({ config, setConfig, onApplyChanges, isApplying, className = '' }) {
  // Render a loading state if the configuration hasn't been fetched from the API yet.
  // This prevents errors from trying to access properties of an undefined object.
  if (!config || !config.agent_configs || !config.guardrail_configs) {
    return <div className="sidebar">Loading configuration...</div>;
  }

  /**
   * Handles changes in the instruction textareas for any agent.
   * @param {string} agentName - The name of the agent being edited (e.g., 'tutor', 'math').
   * @param {string} value - The new instruction text from the textarea.
   */
  const handleInstructionChange = (agentName, value) => {
    // Update the parent's state using the provided setConfig function.
    // We use a functional update to ensure we're working with the latest state.
    setConfig(prevConfig => ({
      ...prevConfig, // Keep the rest of the config (like guardrails)
      agent_configs: {
        ...prevConfig.agent_configs, // Keep the other agent configs
        [agentName]: { // Update the specific agent's config
          ...prevConfig.agent_configs[agentName],
          instruction: value,
        },
      },
    }));
  };

  /**
   * Handles changes in the guardrail input fields.
   * @param {string} key - The key of the guardrail setting being changed (e.g., 'blocked_keyword').
   * @param {string} value - The new value from the input field.
   */
  const handleGuardrailChange = (key, value) => {
    setConfig(prevConfig => ({
      ...prevConfig, // Keep the rest of the config (like agents)
      guardrail_configs: {
        ...prevConfig.guardrail_configs, // Keep the other guardrail settings
        [key]: value, // Update the specific setting
      },
    }));
  };

  return (
    <div className={`sidebar ${className}`}>
      <h2>⚙️ Configuration</h2>
      <p className="sidebar-info">
        Modify settings below and click Apply to rebuild the agents and reset the chat session.
      </p>
      
      <button onClick={onApplyChanges} className="apply-button" disabled={isApplying}>
        {isApplying ? 'Applying...' : 'Apply Changes & Reset'}
      </button>

      {/* Collapsible section for Agent Instructions */}
      <details className="config-section" open>
        <summary>Agent Instructions</summary>
        {/*
          Dynamically create a textarea for each agent in the configuration.
          This makes it easy to add/remove agents in the backend without changing the frontend code.
        */}
        {Object.entries(config.agent_configs).map(([agentName, agentConfig]) => (
          <div key={agentName} className="config-item">
            <label htmlFor={`${agentName}-instruction`}>
              {/* Capitalize the first letter for a nicer display name */}
              {agentName.charAt(0).toUpperCase() + agentName.slice(1)} Agent
            </label>
            <textarea
              id={`${agentName}-instruction`}
              value={agentConfig.instruction}
              onChange={(e) => handleInstructionChange(agentName, e.target.value)}
              rows={10}
              disabled={isApplying}
            />
          </div>
        ))}
      </details>

      {/* Collapsible section for Guardrail Parameters */}
      <details className="config-section">
        <summary>Guardrail Parameters</summary>
        <div className="config-item">
          <label htmlFor="blocked-keyword">Keyword to Block (Model Input Guardrail)</label>
          <input
            id="blocked-keyword"
            type="text"
            value={config.guardrail_configs.blocked_keyword}
            onChange={(e) => handleGuardrailChange('blocked_keyword', e.target.value)}
            disabled={isApplying}
          />
        </div>
        <div className="config-item">
          <label htmlFor="blocked-language">Language to Block (Spanish Tool Guardrail, e.g., 'French')</label>
          <input
            id="blocked-language"
            type="text"
            value={config.guardrail_configs.blocked_language_tool}
            onChange={(e) => handleGuardrailChange('blocked_language_tool', e.target.value)}
            disabled={isApplying}
          />
        </div>
      </details>
    </div>
  );
}

export default ConfigSidebar;

/* Usage Example:
<ConfigSidebar
  className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}
  config={config}   
  setConfig={setConfig}
  onApplyChanges={handleApplyChanges}
  isApplying={isLoading}
/>
*/
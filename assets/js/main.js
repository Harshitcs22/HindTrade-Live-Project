document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

function scrollToAgents() { document.getElementById('agents').scrollIntoView({ behavior: 'smooth' }); }

function activateAgentFrame() { document.getElementById('agent-interface').classList.remove('hidden'); }
function closeAgentFrame() { document.getElementById('agent-interface').classList.add('hidden'); }
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

function switchDashView(viewId) {
    document.querySelectorAll('.dash-section').forEach(el => el.classList.remove('active'));
    document.getElementById('view-' + viewId).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active', 'active-domestic', 'text-white', 'text-orange-400');
        if(el.id === 'nav-domestic') el.classList.add('text-gray-400'); 
        else el.classList.add('text-gray-400');
    });

    const activeNav = document.getElementById('nav-' + viewId);
    if(viewId === 'domestic') {
        activeNav.classList.remove('text-gray-400');
        activeNav.classList.add('active-domestic');
    } else {
        activeNav.classList.remove('text-gray-400');
        activeNav.classList.add('active');
    }
    lucide.createIcons();
}
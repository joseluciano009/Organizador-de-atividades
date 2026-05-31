// Array para armazenar as atividades
let activities = [];

// Elementos do DOM
const activityForm = document.getElementById('activityForm');
const activitiesList = document.getElementById('activitiesList');

// Carregar atividades do localStorage ao iniciar
window.addEventListener('load', () => {
    loadActivities();
    renderActivities();
});

// Adicionar nova atividade
activityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const subject = document.getElementById('subject').value;
    const professor = document.getElementById('professor').value;
    const dueDate = document.getElementById('dueDate').value;
    const description = document.getElementById('description').value;
    
    const newActivity = {
        id: Date.now(),
        subject,
        professor,
        dueDate,
        description
    };
    
    activities.push(newActivity);
    
    // Salvar no localStorage
    saveActivities();
    
    // Atualizar a visualização
    renderActivities();
    
    // Limpar o formulário
    activityForm.reset();
});

// Função para salvar atividades no localStorage
function saveActivities() {
    localStorage.setItem('activities', JSON.stringify(activities));
}

// Função para carregar atividades do localStorage
function loadActivities() {
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
        activities = JSON.parse(savedActivities);
    }
}

// Função para renderizar a lista de atividades
function renderActivities() {
    activitiesList.innerHTML = '';
    
    if (activities.length === 0) {
        activitiesList.innerHTML = '<p>Nenhuma atividade cadastrada.</p>';
        return;
    }
    
    // Ordenar por data de entrega (mais próximas primeiro)
    activities.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        
        const formattedDate = new Date(activity.dueDate).toLocaleDateString('pt-BR');
        
        activityElement.innerHTML = `
            <div class="activity-details">
                <h3>${activity.subject}</h3>
                <p><strong>Professor:</strong> ${activity.professor}</p>
                <p><strong>Data de Entrega:</strong> ${formattedDate}</p>
                <p><strong>Descrição:</strong> ${activity.description}</p>
            </div>
        `;
        
        activitiesList.appendChild(activityElement);
    });
}
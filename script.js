// Intro animation
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro").classList.add("hide");
  }, 1500);
});

// Elementos
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const overlay = document.getElementById("overlayBackground");
const closeBtn = document.querySelector(".close-sidebar-btn");

// === CHARTS ===
const statusChart = new Chart(document.getElementById('statusChart').getContext('2d'), {
  type: 'doughnut',
  data: {
    labels: ['Concluídos', 'Em andamento', 'Atrasados'],
    datasets: [{
      data: [8, 3, 1],
      backgroundColor: ['#2ea043', '#1f6feb', '#d73a49']
    }]
  }
});
const teamChart = new Chart(document.getElementById('teamChart').getContext('2d'), {
  type: 'bar',
  data: {
    labels: ['Equipe A', 'Equipe B', 'Equipe C'],
    datasets: [{
      label: 'Projetos',
      data: [5, 4, 3],
      backgroundColor: '#1f6feb'
    }]
  },
  options: { plugins: { legend: { display: false } } }
});
const progressChart = new Chart(document.getElementById('progressChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [{
      label: 'Tarefas concluídas',
      data: [5, 9, 14, 18],
      borderColor: '#7257a8',
      backgroundColor: 'rgba(114,87,168,0.3)',
      tension: 0.3
    }]
  }
});
const allCharts = [statusChart, teamChart, progressChart];

// Atualiza os gráficos (apenas update, sem resize)
function refreshCharts() {
  allCharts.forEach(chart => {
    chart.update();
  });
}

// Abre o menu
function openSidebar() {
  sidebar.classList.add("visible");
  overlay.classList.add("active");
  refreshCharts();
}

// Fecha o menu
function closeSidebar() {
  sidebar.classList.remove("visible");
  overlay.classList.remove("active");
  refreshCharts();
}

// Toggle do botão hamburguer
toggleBtn.addEventListener("click", () => {
  if (sidebar.classList.contains("visible")) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

// Fecha clicando no overlay
overlay.addEventListener("click", () => {
  closeSidebar();
});

// Fecha clicando no botão X da sidebar
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    closeSidebar();
  });
}

// Drag and Drop para reordenar cards (mantido igual ao seu código)
const cardsContainer = document.querySelector('.dashboard');
let draggedCard = null;

cardsContainer.querySelectorAll('.card').forEach(card => {
  card.setAttribute('draggable', 'true');

  card.addEventListener('dragstart', (e) => {
    draggedCard = card;
    e.dataTransfer.effectAllowed = "move";
    card.style.opacity = '0.5';
  });

  card.addEventListener('dragend', () => {
    draggedCard.style.opacity = '';
    draggedCard = null;
  });

  card.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const target = e.currentTarget;
    if (target !== draggedCard) {
      const bounding = target.getBoundingClientRect();
      const offset = e.clientY - bounding.top;
      const middle = bounding.height / 2;

      if (offset > middle) {
        target.after(draggedCard);
      } else {
        target.before(draggedCard);
      }
    }
  });

  card.addEventListener('drop', (e) => {
    e.preventDefault();
  });
});

// Bloquear aumento dos cards & restaurar com double-click (igual seu código)
document.querySelectorAll('.card').forEach(card => {
  const originalWidth = card.offsetWidth;
  const originalHeight = card.offsetHeight;
  let isResizing = false;

  let resizeHandle = card.querySelector('.resize-handle');
  if (!resizeHandle) {
    resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');
    card.appendChild(resizeHandle);
  }

  resizeHandle.style.position = 'absolute';
  resizeHandle.style.width = '15px';
  resizeHandle.style.height = '15px';
  resizeHandle.style.right = '2px';
  resizeHandle.style.bottom = '2px';
  resizeHandle.style.cursor = 'nwse-resize';
  resizeHandle.style.background = 'transparent';

  const line1 = document.createElement('div');
  line1.style.position = 'absolute';
  line1.style.width = '2px';
  line1.style.height = '8px';
  line1.style.backgroundColor = '#888';
  line1.style.borderRadius = '1px';
  line1.style.right = '4px';
  line1.style.bottom = '3px';
  line1.style.transform = 'rotate(45deg)';

  const line2 = document.createElement('div');
  line2.style.position = 'absolute';
  line2.style.width = '2px';
  line2.style.height = '8px';
  line2.style.backgroundColor = '#888';
  line2.style.borderRadius = '1px';
  line2.style.right = '8px';
  line2.style.bottom = '3px';
  line2.style.transform = 'rotate(45deg)';

  if (!resizeHandle.querySelector('div')) {
    resizeHandle.appendChild(line1);
    resizeHandle.appendChild(line2);
  }

  card.style.position = 'relative';

  resizeHandle.addEventListener('mousedown', e => {
    e.preventDefault();
    isResizing = true;
  });

  window.addEventListener('mouseup', () => {
    isResizing = false;
  });

  window.addEventListener('mousemove', e => {
    if (!isResizing) return;

    const rect = card.getBoundingClientRect();
    let newWidth = e.clientX - rect.left;
    let newHeight = e.clientY - rect.top;

    if (newWidth > originalWidth) newWidth = originalWidth;
    if (newHeight > originalHeight) newHeight = originalHeight;

    if (newWidth < 150) newWidth = 150;
    if (newHeight < 100) newHeight = 100;

    card.style.width = newWidth + 'px';
    card.style.height = newHeight + 'px';
  });

  card.addEventListener('dblclick', () => {
    card.style.width = originalWidth + 'px';
    card.style.height = originalHeight + 'px';
  });
});

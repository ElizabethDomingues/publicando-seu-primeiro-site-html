// Script principal - Carrega componentes dinamicamente

document.addEventListener('DOMContentLoaded', function() {
  // Inicialização do projeto
  console.log('Projeto carregado com sucesso!');
  
  // Carregar componentes
  loadComponent('components/navbar.html', 'navbar-container');
  loadComponent('components/hero.html', 'hero-container');
  loadComponent('components/about.html', 'about-container');
  loadComponent('components/skills.html', 'skills-container');
  loadComponent('components/projects.html', 'projects-container');
  loadComponent('components/contact.html', 'contact-container');
  loadComponent('components/footer.html', 'footer-container');
});

// Função para carregar componentes HTML
function loadComponent(filePath, containerId) {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.warn(`Container com ID "${containerId}" não encontrado`);
    return;
  }
  
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar ${filePath}: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;
      // Após carregar o contato, adicionar event listener ao botão de copiar email
      if (containerId === 'contact-container') {
        setupCopyEmailButton();
      }
    })
    .catch(error => {
      console.error('Erro ao carregar componente:', error);
      container.innerHTML = `<p class="text-red-500">Erro ao carregar componente: ${filePath}</p>`;
    });
}

// Função para configurar o botão de copiar email
function setupCopyEmailButton() {
  const copyBtn = document.getElementById('copy-email-btn');
  
  if (copyBtn) {
    copyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const email = this.getAttribute('data-email');
      
      // Copiar para clipboard
      navigator.clipboard.writeText(email).then(function() {
        // Feedback visual
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Email Copiado! ✓';
        
        setTimeout(function() {
          copyBtn.textContent = originalText;
        }, 2000);
      }).catch(function(err) {
        console.error('Erro ao copiar email:', err);
        alert('Erro ao copiar email. Tente novamente.');
      });
    });
  }
}

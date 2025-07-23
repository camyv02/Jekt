document.addEventListener('DOMContentLoaded', () => {
  const profileRoot = document.getElementById('profile-root');
  if (!profileRoot) return;

  profileRoot.innerHTML = `
    <div class="profile-container" id="profileContainer">
      <img src="profile-pic.png" alt="Foto do Perfil" class="profile-icon" id="profileIcon" />
      <input type="file" id="profileInput" accept="image/*" style="display:none" />
      <div class="profile-dropdown" id="profileDropdown" aria-hidden="true">
        <ul class="profile-menu">
          <li id="changePhotoBtn"><span class="material-icons">photo_camera</span> Trocar Foto</li>
          <li><span class="material-icons">person</span> Meu Perfil</li>
          <li><span class="material-icons">settings</span> Configurações</li>
          <li><span class="material-icons">folder</span> Meus Projetos</li>
          <li><span class="material-icons">warning</span> Riscos Designados</li>
        </ul>
      </div>
    </div>
  `;

  const profileIcon = document.getElementById('profileIcon');
  const profileDropdown = document.getElementById('profileDropdown');
  const profileInput = document.getElementById('profileInput');
  const changePhotoBtn = document.getElementById('changePhotoBtn');

  // Toggle dropdown ao clicar no ícone do perfil
  profileIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = profileDropdown.getAttribute('aria-hidden') === 'true';
    profileDropdown.setAttribute('aria-hidden', !isHidden);
  });

  // Fechar dropdown ao clicar fora
  document.addEventListener('click', () => {
    profileDropdown.setAttribute('aria-hidden', 'true');
  });

  // Abrir seletor de arquivos ao clicar no "Trocar Foto"
  changePhotoBtn.addEventListener('click', () => {
    profileInput.click();
  });

  // Quando o usuário selecionar uma foto, atualizar o ícone
  profileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      profileIcon.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // Fechar dropdown após trocar
    profileDropdown.setAttribute('aria-hidden', 'true');
  });
});

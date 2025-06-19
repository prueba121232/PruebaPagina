document.addEventListener('DOMContentLoaded', function() {
  // Manejo de la foto de perfil
  const photoInput = document.getElementById('foto');
  const photoPreview = document.getElementById('photo-preview');
  
  photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        // Limpiar el contenido previo
        photoPreview.innerHTML = '';
        // Crear y mostrar la imagen
        const img = document.createElement('img');
        img.src = event.target.result;
        img.alt = 'Foto de perfil';
        photoPreview.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });

  // Añadir experiencia laboral
  const addExpBtn = document.getElementById('add-experiencia');
  const expContainer = document.getElementById('experiencia-container');
  
  addExpBtn.addEventListener('click', function() {
    const expItem = document.createElement('div');
    expItem.className = 'exp-item';
    expItem.innerHTML = `
      <button type="button" class="remove-exp"><i class="fas fa-times"></i></button>
      <label>Puesto*
        <input type="text" class="exp-puesto" placeholder="Ej. Desarrollador Frontend" required>
      </label>
      <label>Empresa*
        <input type="text" class="exp-empresa" placeholder="Nombre de la empresa" required>
      </label>
      <div class="date-range">
        <label>Fecha inicio*
          <input type="month" class="exp-inicio" required>
        </label>
        <label>Fecha fin
          <input type="month" class="exp-fin">
        </label>
        <label class="current-checkbox">
          <input type="checkbox" class="exp-actual"> Actualmente trabajando aquí
        </label>
      </div>
      <label>Descripción*
        <textarea class="exp-descripcion" rows="3" placeholder="Describe tus responsabilidades y logros" required></textarea>
      </label>
    `;
    expContainer.appendChild(expItem);
    
    // Manejar el checkbox "Actualmente trabajando aquí"
    const currentCheckbox = expItem.querySelector('.exp-actual');
    const endDateInput = expItem.querySelector('.exp-fin');
    
    currentCheckbox.addEventListener('change', function() {
      endDateInput.disabled = this.checked;
      if (this.checked) {
        endDateInput.value = '';
      }
    });
    
    // Manejar el botón de eliminar
    expItem.querySelector('.remove-exp').addEventListener('click', function() {
      expItem.remove();
    });
  });

  // Añadir formación académica
  const addEduBtn = document.getElementById('add-formacion');
  const eduContainer = document.getElementById('formacion-container');
  
  addEduBtn.addEventListener('click', function() {
    const eduItem = document.createElement('div');
    eduItem.className = 'edu-item';
    eduItem.innerHTML = `
      <button type="button" class="remove-edu"><i class="fas fa-times"></i></button>
      <label>Título*
        <input type="text" class="edu-titulo" placeholder="Ej. Grado en Informática" required>
      </label>
      <label>Institución*
        <input type="text" class="edu-institucion" placeholder="Nombre de la universidad/centro" required>
      </label>
      <div class="date-range">
        <label>Año de finalización*
          <input type="month" class="edu-fin" required>
        </label>
      </div>
    `;
    eduContainer.appendChild(eduItem);
    
    // Manejar el botón de eliminar
    eduItem.querySelector('.remove-edu').addEventListener('click', function() {
      eduItem.remove();
    });
  });

  // Añadir habilidades
  const addSkillBtn = document.getElementById('add-habilidad');
  const skillsContainer = document.getElementById('habilidades-container');
  
  addSkillBtn.addEventListener('click', function() {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
      <input type="text" class="skill-nombre" placeholder="Ej. JavaScript">
      <select class="skill-nivel">
        <option value="100">Experto</option>
        <option value="75" selected>Avanzado</option>
        <option value="50">Intermedio</option>
        <option value="25">Básico</option>
      </select>
      <button type="button" class="remove-skill"><i class="fas fa-times"></i></button>
    `;
    skillsContainer.appendChild(skillItem);
    
    // Manejar el botón de eliminar
    skillItem.querySelector('.remove-skill').addEventListener('click', function() {
      skillItem.remove();
    });
  });

  // Añadir idiomas
  const addLangBtn = document.getElementById('add-idioma');
  const langsContainer = document.getElementById('idiomas-container');
  
  addLangBtn.addEventListener('click', function() {
    const langItem = document.createElement('div');
    langItem.className = 'language-item';
    langItem.innerHTML = `
      <input type="text" class="lang-nombre" placeholder="Ej. Inglés">
      <select class="lang-nivel">
        <option value="Nativo">Nativo</option>
        <option value="Avanzado">Avanzado</option>
        <option value="Intermedio" selected>Intermedio</option>
        <option value="Básico">Básico</option>
      </select>
      <button type="button" class="remove-lang"><i class="fas fa-times"></i></button>
    `;
    langsContainer.appendChild(langItem);
    
    // Manejar el botón de eliminar
    langItem.querySelector('.remove-lang').addEventListener('click', function() {
      langItem.remove();
    });
  });

  // Reiniciar formulario
  document.getElementById('reset-form').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que quieres reiniciar el formulario? Se perderán todos los datos.')) {
      document.getElementById('cv-form').reset();
      expContainer.innerHTML = '';
      eduContainer.innerHTML = '';
      skillsContainer.innerHTML = '';
      langsContainer.innerHTML = '';
      photoPreview.innerHTML = '<i class="fas fa-user-circle"></i><span>Sin foto</span>';
      
      // Añadir campos iniciales
      addExpBtn.click();
      addEduBtn.click();
      addSkillBtn.click();
      addLangBtn.click();
    }
  });

  // Manejar el envío del formulario
  document.getElementById('cv-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Recoger datos básicos
    const formData = {
      nombre: document.getElementById('nombre').value,
      profesion: document.getElementById('profesion').value,
      correo: document.getElementById('correo').value,
      telefono: document.getElementById('telefono').value,
      direccion: document.getElementById('direccion').value,
      web: document.getElementById('web').value,
      perfil: document.getElementById('perfil').value,
      foto: photoInput.files.length > 0 ? 
            document.getElementById('photo-preview').querySelector('img').src : null
    };
    
    // Recoger experiencias laborales
    formData.experiencias = [];
    document.querySelectorAll('.exp-item').forEach(item => {
      formData.experiencias.push({
        puesto: item.querySelector('.exp-puesto').value,
        empresa: item.querySelector('.exp-empresa').value,
        inicio: item.querySelector('.exp-inicio').value,
        fin: item.querySelector('.exp-actual').checked ? 'Presente' : item.querySelector('.exp-fin').value,
        descripcion: item.querySelector('.exp-descripcion').value,
        actual: item.querySelector('.exp-actual').checked
      });
    });
    
    // Recoger formación académica
    formData.formaciones = [];
    document.querySelectorAll('.edu-item').forEach(item => {
      formData.formaciones.push({
        titulo: item.querySelector('.edu-titulo').value,
        institucion: item.querySelector('.edu-institucion').value,
        fin: item.querySelector('.edu-fin').value
      });
    });
    
    // Recoger habilidades
    formData.habilidades = [];
    document.querySelectorAll('.skill-item').forEach(item => {
      if (item.querySelector('.skill-nombre').value.trim() !== '') {
        formData.habilidades.push({
          nombre: item.querySelector('.skill-nombre').value,
          nivel: parseInt(item.querySelector('.skill-nivel').value)
        });
      }
    });
    
    // Recoger idiomas
    formData.idiomas = [];
    document.querySelectorAll('.language-item').forEach(item => {
      if (item.querySelector('.lang-nombre').value.trim() !== '') {
        formData.idiomas.push({
          nombre: item.querySelector('.lang-nombre').value,
          nivel: item.querySelector('.lang-nivel').value
        });
      }
    });
    
    // Guardar en localStorage y redirigir
    localStorage.setItem('cvData', JSON.stringify(formData));
    window.location.href = 'curriculum.html';
  });
  
  // Añadir campos iniciales al cargar la página
  addExpBtn.click();
  addEduBtn.click();
  addSkillBtn.click();
  addLangBtn.click();
});
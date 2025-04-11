<template>
  <div class="page-layout">
    <AppSideBar />
    
    <main class="main-content">
      <!-- Header con título y botón de regreso -->
      <div class="page-header">
        <NuxtLink to="/categorias" class="btn btn-back">
          <i class='bx bx-arrow-back'></i> Volver a Categorías
        </NuxtLink>
        <h1 class="page-title">
          <i class='bx bx-category'></i> Nueva Categoría Turística
        </h1>
      </div>

      <!-- Tarjeta del formulario -->
      <div class="form-card">
        <form @submit.prevent="registrarCat" class="category-form">
          <!-- Campo del formulario -->
          <div class="form-group">
            <label for="nombre" class="form-label">
              <i class='bx bx-rename'></i> Nombre de la Categoría*
            </label>
            <input
              type="text"
              class="form-control"
              id="nombre"
              placeholder="Ej: Playas, Museos, Parques Nacionales"
              v-model="categoria.nombre"
              required
              minlength="3"
              maxlength="50"
            />
            <div class="form-hint">Ingrese un nombre descriptivo (3-50 caracteres)</div>
          </div>

          <!-- Botón de submit -->
          <div class="form-actions">
            <button type="submit" class="btn btn-submit">
              <i class='bx bx-check'></i> Guardar Categoría
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { registrarCategoria } = useCategorias();

const categoria = ref({
  nombre: "",
});

const registrarCat = async () => {
  // Validación del formulario
  if (!categoria.value.nombre || categoria.value.nombre.trim().length < 3) {
    alert("El nombre de la categoría debe tener al menos 3 caracteres");
    return;
  }

  if (categoria.value.nombre.length > 50) {
    alert("El nombre de la categoría no puede exceder los 50 caracteres");
    return;
  }

  const error = await registrarCategoria(categoria.value);
  if (!error) {
    alert("¡Categoría registrada exitosamente!");
    navigateTo("/categorias");
  } else {
    console.error("Error al registrar la categoría:", error);
    alert("Ocurrió un error al registrar la categoría");
  }
};
</script>

<style scoped>
/* Estructura principal */
.page-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

.main-content {
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

/* Header de página */
.page-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.btn-back {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  background-color: transparent;
  border: none;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-back:hover {
  background-color: #f1f5f9;
  color: #3b82f6;
}

.page-title {
  color: #1e293b;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
}

.page-title i {
  color: #3b82f6;
  font-size: 1.2em;
}

/* Tarjeta del formulario */
.form-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.category-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Grupo de formulario */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
}

.form-label i {
  font-size: 1.2rem;
  color: #3b82f6;
}

.form-control {
  border-radius: 8px;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  width: 100%;
  font-size: 1rem;
}

.form-control:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.form-hint {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
  font-style: italic;
}

/* Botón de enviar */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-submit {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.btn-submit:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.btn-submit:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 992px) {
  .main-content {
    margin-left: 84px;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .form-card {
    padding: 1.75rem;
  }
}

@media (max-width: 576px) {
  .page-header {
    padding: 0;
  }
  
  .btn-back {
    padding: 0.5rem;
  }
  
  .btn-submit {
    width: 100%;
    justify-content: center;
  }
  
  .form-card {
    padding: 1.5rem;
  }
}
</style>
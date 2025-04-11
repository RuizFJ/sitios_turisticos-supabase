<template>
  <div class="page-layout">
    <AppSideBar />
    
    <main class="main-content">
      <!-- Header con título y botón de regreso -->
      <div class="page-header">
        <NuxtLink to="/sitios-turisticos" class="btn btn-back">
          <i class='bx bx-arrow-back'></i> Volver a Sitios Turísticos
        </NuxtLink>
        <h1 class="page-title">
          <i class='bx bx-edit-alt'></i> Actualizar Sitio Turístico
        </h1>
      </div>

      <!-- Tarjeta del formulario -->
      <div class="form-card">
        <form @submit.prevent="actualizarSitio" class="update-form">
          <!-- Sección de información básica -->
          <div class="form-section">
            <h3 class="section-title">
              <i class='bx bx-info-circle'></i> Información Básica
            </h3>
            
            <div class="mb-4">
              <label for="nombre" class="form-label">Nombre del Sitio*</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                placeholder="Ej: Volcán Masaya"
                v-model="sitio.nombre"
                required
              />
              <div class="form-hint">Nombre oficial del sitio turístico</div>
            </div>

            <div class="mb-4">
              <label for="descripcion" class="form-label">Descripción*</label>
              <textarea
                class="form-control"
                id="descripcion"
                rows="4"
                placeholder="Describa las características principales del sitio..."
                v-model="sitio.descripcion"
                required
              ></textarea>
              <div class="form-hint">Mínimo 50 caracteres</div>
            </div>

            <div class="mb-4">
              <label for="direccion" class="form-label">Dirección Exacta*</label>
              <input
                type="text"
                class="form-control"
                id="direccion"
                placeholder="Ej: Carretera a Masaya km 23"
                v-model="sitio.direccion"
                required
              />
              <div class="form-hint">Incluya puntos de referencia importantes</div>
            </div>
          </div>

          <!-- Sección de clasificación -->
          <div class="form-section">
            <h3 class="section-title">
              <i class='bx bx-category'></i> Clasificación
            </h3>
            
            <div class="row g-3">
              <div class="col-md-6">
                <label for="categoria" class="form-label">Categoría*</label>
                <select 
                  class="form-select" 
                  id="categoria" 
                  v-model="sitio.categoria_id" 
                  required
                >
                  <option disabled value="0">Seleccione una categoría</option>
                  <option
                    v-for="cat in categorias.data.value"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.nombre }}
                  </option>
                </select>
                <div class="form-hint">Ej: Parque Nacional, Playa, Museo</div>
              </div>

              <div class="col-md-6">
                <label for="ciudad" class="form-label">Ciudad*</label>
                <select 
                  class="form-select" 
                  id="ciudad" 
                  v-model="sitio.ciudad_id" 
                  required
                >
                  <option disabled value="0">Seleccione una ciudad</option>
                  <option
                    v-for="ciudad in ciudades.data.value || []"
                    :key="ciudad.id"
                    :value="ciudad.id"
                  >
                    {{ ciudad.nombre }}
                  </option>
                </select>
                <div class="form-hint">Ubicación principal del sitio</div>
              </div>
            </div>
          </div>

          <!-- Botón de submit -->
          <div class="form-actions">
            <button type="submit" class="btn btn-update">
              <i class='bx bx-save'></i> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type AddSitioTuristico from '~/interfaces/addSitioTuristico.interface';

const client: any = useSupabaseClient();
const { categorias, ciudades, obtenerSitioTuristicoById } = useSitiosT();
const route = useRoute();
const id = ref(route.params.id);

const sitio = ref<AddSitioTuristico>({
  nombre: "",
  descripcion: "",
  direccion: "",
  categoria_id: 0,
  ciudad_id: 0,
});

onMounted(async () => {
  // Cargar datos necesarios
  await Promise.all([categorias.execute(), ciudades.execute()]);
  
  // Obtener datos del sitio
  const data = await obtenerSitioTuristicoById(Number(id.value));
  
  if (data) {
    sitio.value = {
      nombre: data.nombre,
      descripcion: data.descripcion,
      direccion: data.direccion,
      categoria_id: data.categoria_id.id,
      ciudad_id: data.ciudad_id.id,
    };
  }
});

const actualizarSitio = async () => {
  // Validaciones
  if (!sitio.value.nombre || sitio.value.nombre.trim().length < 3) {
    alert("El nombre debe tener al menos 3 caracteres");
    return;
  }
  
  if (!sitio.value.descripcion || sitio.value.descripcion.trim().length < 50) {
    alert("La descripción debe tener al menos 50 caracteres");
    return;
  }
  
  if (sitio.value.categoria_id === 0 || sitio.value.ciudad_id === 0) {
    alert("Debe seleccionar una categoría y una ciudad");
    return;
  }

  // Actualizar datos
  const { error } = await client
    .from("sitio_turistico")
    .update({
      nombre: sitio.value.nombre,
      descripcion: sitio.value.descripcion,
      direccion: sitio.value.direccion,
      categoria_id: sitio.value.categoria_id,
      ciudad_id: sitio.value.ciudad_id,
    })
    .eq("id", id.value);

  if (error) {
    console.error("Error al actualizar:", error);
    alert("Ocurrió un error al actualizar el sitio");
  } else {
    alert("¡Sitio actualizado con éxito!");
    navigateTo("/sitios-turisticos");
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

.update-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Secciones del formulario */
.form-section {
  background-color: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #3b82f6;
}

.section-title {
  color: #1e293b;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title i {
  color: #3b82f6;
}

/* Campos del formulario */
.form-label {
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.5rem;
  display: block;
}

.form-control {
  border-radius: 8px;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.form-control:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-hint {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
}

textarea.form-control {
  min-height: 120px;
  resize: vertical;
}

/* Botón de actualizar */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-update {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.btn-update:hover {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
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
  
  .form-card {
    padding: 1.5rem;
  }
  
  .section-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 576px) {
  .form-section {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .btn-update {
    width: 100%;
    justify-content: center;
  }
}
</style>
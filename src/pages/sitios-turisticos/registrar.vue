<template>
  <div class="page-layout">
    <AppSideBar />
    
    <main class="main-content">
      <!-- Header con título y botón de regreso -->
      <div class="page-header">
        <NuxtLink to="/sitios-turisticos" class="btn btn-back">
          <i class='bx bx-arrow-back'></i> Volver
        </NuxtLink>
        <h1 class="page-title">
          <i class='bx bx-map-alt'></i> Registrar Sitio Turístico
        </h1>
      </div>

      <!-- Tarjeta del formulario -->
      <div class="form-card">
        <form @submit.prevent="agregarSitio" class="sitio-form">
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
                placeholder="Ej: Cañón de Somoto"
                v-model="sitio.nombre"
                required
              />
              <div class="form-hint">Ingrese el nombre oficial del sitio turístico</div>
            </div>

            <div class="mb-4">
              <label for="descripcion" class="form-label">Descripción*</label>
              <textarea
                class="form-control"
                id="descripcion"
                rows="3"
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
                placeholder="Ej: Carretera a Matagalpa km 73"
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
                <select class="form-select" id="categoria" v-model="sitio.categoria_id" required>
                  <option disabled value="0">Seleccione una categoría</option>
                  <option
                    v-for="cat in categorias.data.value || []"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.nombre }}
                  </option>
                </select>
                <div class="form-hint">Ej: Senderismo, Actividad Acuatica, Museo</div>
              </div>

              <div class="col-md-6">
                <label for="ciudad" class="form-label">Ciudad*</label>
                <select class="form-select" id="ciudad" v-model="sitio.ciudad_id" required>
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
            <button type="submit" class="btn btn-submit">
              <i class='bx bx-save'></i> Guardar Sitio Turístico
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import AppSideBar from "~/components/AppSideBar.vue";
import type AddSitioTuristico from "~/interfaces/addSitioTuristico.interface";

const client: any = useSupabaseClient();
const { categorias, ciudades } = useSitiosT();

const sitio = ref<AddSitioTuristico>({
  nombre: "",
  descripcion: "",
  direccion: "",
  categoria_id: 0,
  ciudad_id: 0,
});

const agregarSitio = async () => {
  if (!validateForm()) return;
  
  const { error } = await client.from("sitio_turistico").insert({
    nombre: sitio.value.nombre,
    descripcion: sitio.value.descripcion,
    direccion: sitio.value.direccion,
    categoria_id: sitio.value.categoria_id,
    ciudad_id: sitio.value.ciudad_id,
  });

  if (error) {
    console.error("Error al agregar el sitio turístico:", error);
    alert("Ocurrió un error al guardar el sitio turístico");
    return;
  }

  alert("Sitio turístico registrado exitosamente");
  navigateTo("/sitios-turisticos");
};

const validateForm = () => {
  if (sitio.value.nombre.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres");
    return false;
  }
  if (sitio.value.descripcion.length < 50) {
    alert("La descripción debe tener al menos 50 caracteres");
    return false;
  }
  if (sitio.value.categoria_id === 0 || sitio.value.ciudad_id === 0) {
    alert("Debe seleccionar una categoría y una ciudad");
    return false;
  }
  return true;
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
  padding: 0.5rem 0;
  margin-bottom: 1rem;
}

.btn-back:hover {
  color: #3b82f6;
}

.page-title {
  color: #1e293b;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
}

.page-title i {
  font-size: 1.5em;
  color: #3b82f6;
}

/* Tarjeta del formulario */
.form-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.sitio-form {
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

/* Botón de enviar */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-submit {
  background-color: #3b82f6;
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

.btn-submit:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
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
}
</style>
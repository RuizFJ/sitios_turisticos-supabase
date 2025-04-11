<template>
  <div class="page-layout">
    <AppSideBar class="sidebar" />

    <main class="main-content">
      <!-- Header con título y breadcrumbs -->
      <div class="page-header">
        <nav aria-label="breadcrumb" class="breadcrumb-nav">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <NuxtLink to="/ciudades">
                <i class="bx bxs-city"></i> Ciudades
              </NuxtLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Editar ciudad
            </li>
          </ol>
        </nav>

        <div class="header-content">
          <h1 class="page-title">
            <i class="bx bx-edit-alt text-primary"></i> Editar Ciudad
          </h1>
          <p class="page-subtitle">
            Actualiza la información de esta ciudad turística
          </p>
        </div>
      </div>

      <!-- Tarjeta del formulario -->
      <div class="form-card">
        <div class="card-header">
          <h2 class="card-title">
            <i class="bx bx-current-location"></i> Información de la Ciudad
          </h2>
        </div>

        <div class="card-body">
          <form @submit.prevent="actualizarCiudad" class="city-form">
            <!-- Campo del formulario -->
            <div class="form-group">
              <label for="nombre" class="form-label">
                <span class="label-icon"><i class="bx bx-rename"></i></span>
                Nombre de la Ciudad
                <span class="required-asterisk">*</span>
              </label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  placeholder="Ej: Granada, León, Matagalpa"
                  v-model="ciudad.nombre"
                  required
                  minlength="3"
                  maxlength="50"
                />
                <span class="input-icon">
                  <i class="bx bx-map"></i>
                </span>
              </div>
              <div class="form-hint">
                <i class="bx bx-info-circle"></i> Ingrese el nombre completo de
                la ciudad (3-50 caracteres)
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="form-actions">
              <NuxtLink to="/ciudades" class="btn btn-cancel">
                <i class="bx bx-x"></i> Cancelar
              </NuxtLink>
              <button type="submit" class="btn btn-submit">
                <i class="bx bx-save"></i> Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type AddCiudad from "~/interfaces/addCiudad.interface";

const client: any = useSupabaseClient();
const { obtenerCiudadById } = useCiudades();
const route = useRoute();
const id = ref(route.params.id);

const ciudad = ref<AddCiudad>({
  nombre: "",
});

onMounted(async () => {
  const data = await obtenerCiudadById(Number(id.value));
  if (data) {
    ciudad.value = data;
  }
});

const actualizarCiudad = async () => {
  if (ciudad.value.nombre.trim().length < 3) {
    alert("El nombre debe tener al menos 3 caracteres");
    return;
  }

  if (ciudad.value.nombre.length > 50) {
    alert("El nombre no puede exceder los 50 caracteres");
    return;
  }

  const { error } = await client
    .from("ciudad")
    .update({ nombre: ciudad.value.nombre })
    .eq("id", Number(id.value));

  if (error) {
    console.error("Error al actualizar:", error);
    alert("Ocurrió un error al actualizar");
  } else {
    navigateTo("/ciudades");
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
  padding: 2rem 3rem;
  margin-left: 250px;
  transition: all 0.3s ease;
}

/* Header de página */
.page-header {
  margin-bottom: 2.5rem;
}

.breadcrumb-nav {
  margin-bottom: 1.5rem;
}

.breadcrumb {
  display: flex;
  padding: 0;
  list-style: none;
  background: transparent;
}

.breadcrumb-item {
  display: flex;
  align-items: center;

  + .breadcrumb-item::before {
    content: ">";
    padding: 0 0.5rem;
    color: #94a3b8;
  }

  a {
    color: #64748b;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #3b82f6;
    }
  }

  &.active {
    color: #334155;
  }
}

.header-content {
  margin-bottom: 1.5rem;
}

.page-title {
  color: #1e293b;
  font-weight: 700;
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

/* Tarjeta del formulario */
.form-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f1f5f9;
  background-color: #f8fafc;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-body {
  padding: 2rem;
}

/* Formulario */
.city-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.75rem;
  display: block;
}

.label-icon {
  color: #3b82f6;
  margin-right: 0.5rem;
}

.required-asterisk {
  color: #ef4444;
  margin-left: 0.25rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.form-control {
  border-radius: 8px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  width: 100%;
  font-size: 1rem;
  background-color: #f8fafc;
}

.form-control:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: white;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #94a3b8;
}

.form-hint {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Botones */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-cancel {
  background-color: #f1f5f9;
  color: #64748b;

  &:hover {
    background-color: #e2e8f0;
  }
}

.btn-submit {
  background-color: #3b82f6;
  color: white;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 992px) {
  .main-content {
    margin-left: 84px;
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1.25rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .card-header,
  .card-body {
    padding: 1.25rem;
  }

  .form-control {
    padding-left: 2.25rem;
  }
}
</style>

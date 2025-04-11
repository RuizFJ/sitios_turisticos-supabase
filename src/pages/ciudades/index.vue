<template>
  <div class="page-container">
    <AppSideBar class="sidebar" />
    
    <main class="main-content">
      <!-- Header con título y botón de acción -->
      <div class="page-header">
        <div class="header-content">
          <i class='bx bxs-city header-icon'></i>
          <h1 class="page-title">Gestión de Ciudades</h1>
        </div>
        <NuxtLink to="/ciudades/registrar" class="btn btn-primary add-button">
          <i class='bx bx-plus'></i> Nueva Ciudad
        </NuxtLink>
      </div>

      <!-- Contenido principal -->
      <div class="content-card">
        <div v-if="data && data.length > 0">
          <!-- Barra de herramientas -->
          <div class="toolbar">
            <div class="search-box">
              <i class='bx bx-search'></i>
              <input type="text" placeholder="Buscar ciudad..." class="search-input">
            </div>
            <div class="items-count">
              Mostrando {{ data.length }} ciudades
            </div>
          </div>

          <!-- Tabla de ciudades -->
          <div class="table-responsive">
            <table class="cities-table">
              <thead>
                <tr>
                  <th width="80">#</th>
                  <th>Nombre</th>
                  <th width="180" class="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ciudad, index) in data" :key="ciudad.id">
                  <td class="index-cell">{{ index + 1 }}</td>
                  <td>
                    <div class="city-info">
                      <i class='bx bxs-city'></i>
                      <span>{{ ciudad.nombre }}</span>
                    </div>
                  </td>
                  <td class="actions-cell">
                    <div class="actions-container">
                      <NuxtLink 
                        :to="`/ciudades/actualizar/${ciudad.id}`" 
                        class="btn btn-action btn-edit"
                        title="Editar"
                      >
                        <i class='bx bx-edit-alt'></i>
                      </NuxtLink>
                      <button 
                        class="btn btn-action btn-delete" 
                        @click="handleDelete(ciudad.id)"
                        title="Eliminar"
                      >
                        <i class='bx bx-trash'></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Estado vacío -->
        <div v-else class="empty-state">
          <div class="empty-state-content">
            <i class='bx bxs-city empty-state-icon'></i>
            <h4>No hay ciudades registradas</h4>
            <p class="text-muted">Comienza agregando tu primera ciudad</p>
            <NuxtLink to="/ciudades/registrar" class="btn btn-primary">
              <i class='bx bx-plus'></i> Agregar Ciudad
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useCiudades } from '~/composables/useCiudad';

const { data, eliminarCiudad } = useCiudades();

const handleDelete = async (id: number) => {
  const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta ciudad?");
  if (confirmacion) {
    const error = await eliminarCiudad(id);
    if (!error) {
      alert("Ciudad eliminada correctamente");
      data.value = data.value!.filter((ciudad: any) => ciudad.id !== id);
    } else {
      console.error("Error al eliminar la ciudad");
    }
  }
};
</script>

<style scoped>
/* Estructura principal */
.page-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.sidebar {
  flex: 0 0 auto;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  font-size: 2rem;
  color: #3b82f6;
}

.page-title {
  color: #1e293b;
  font-weight: 600;
  margin: 0;
  font-size: 1.5rem;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
}

/* Tarjeta de contenido */
.content-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

/* Barra de herramientas */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  width: 300px;
  border: 1px solid #e2e8f0;
}

.search-box i {
  color: #94a3b8;
  margin-right: 0.5rem;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
}

.items-count {
  color: #64748b;
  font-size: 0.875rem;
}

/* Tabla de ciudades */
.cities-table {
  width: 100%;
  border-collapse: collapse;
}

.cities-table th {
  background-color: #f1f5f9;
  color: #334155;
  font-weight: 600;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
}

.cities-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.cities-table tr:last-child td {
  border-bottom: none;
}

.cities-table tr:hover {
  background-color: #f8fafc;
}

.index-cell {
  color: #64748b;
  font-weight: 500;
}

.city-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.city-info i {
  color: #3b82f6;
  font-size: 1.25rem;
}

/* Acciones */
.actions-cell {
  text-align: center;
}

.actions-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.btn-action {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  transition: all 0.2s ease;
}

.btn-edit {
  background-color: #e0f2fe;
  color: #0ea5e9;
}

.btn-edit:hover {
  background-color: #bae6fd;
}

.btn-delete {
  background-color: #fee2e2;
  color: #ef4444;
}

.btn-delete:hover {
  background-color: #fecaca;
}

/* Estado vacío */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  text-align: center;
  padding: 2rem;
}

.empty-state-content {
  max-width: 400px;
}

.empty-state-icon {
  font-size: 3rem;
  color: #cbd5e1;
  margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 992px) {
  .main-content {
    margin-left: 84px;
  }
  
  .toolbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .search-box {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .cities-table {
    display: block;
    overflow-x: auto;
  }
}
</style>
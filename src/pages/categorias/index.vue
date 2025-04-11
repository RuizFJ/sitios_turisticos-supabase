<template>
  <div class="page-layout">
    <AppSideBar class="sidebar" />
    
    <main class="main-content">
      <!-- Header con título y botón de acción -->
      <div class="page-header">
        <h1 class="page-title">
          <i class='bx bx-category'></i> Lista de Categorías
        </h1>
        <NuxtLink to="/categorias/registrar" class="btn btn-primary add-button">
          <i class='bx bx-plus'></i> Nueva Categoría
        </NuxtLink>
      </div>

      <!-- Contenido principal -->
      <div class="content-card">
        <div v-if="data && data.length > 0">
          <!-- Tabla de categorías -->
          <div class="table-responsive">
            <table class="categories-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col" class="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(categoria, index) in data" :key="categoria.id">
                  <td class="fw-semibold">{{ index + 1 }}</td>
                  <td>
                    <span class="category-name">{{ categoria.nombre }}</span>
                  </td>
                  <td class="text-end">
                    <div class="actions-container">
                      <NuxtLink 
                        :to="`/categorias/actualizar/${categoria.id}`" 
                        class="btn btn-sm btn-edit"
                      >
                        <i class='bx bx-edit'></i> Editar
                      </NuxtLink>
                      <button 
                        class="btn btn-sm btn-delete" 
                        @click="handleDelete(categoria.id)"
                      >
                        <i class='bx bx-trash'></i> Eliminar
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
            <i class='bx bx-category empty-state-icon'></i>
            <h4>No hay categorías registradas</h4>
            <p class="text-muted">Comienza agregando tu primera categoría</p>
            <NuxtLink to="/categorias/registrar" class="btn btn-primary">
              <i class='bx bx-plus'></i> Crear Categoría
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { data } = useCategorias();
const { eliminarCategoria } = useCategorias();

const handleDelete = async (id: number) => {
  const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta categoría?");
  if (confirmacion) {
    const error = await eliminarCategoria(id);
    if (!error) {
      alert("Categoría eliminada correctamente");
      data.value = data.value!.filter((cat: any) => cat.id !== id);
    } else {
      console.error("Error al eliminar la categoría");
    }
  }
};
</script>

<style scoped>
/* Estructura principal */
.page-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 auto;
}

.main-content {
  flex: 1;
  padding: 2rem;
  margin-left: 250px; /* Ajustar según ancho del sidebar */
  transition: margin-left 0.3s ease;
}

/* Header de página */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-title i {
  font-size: 1.75rem;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}

/* Tarjeta de contenido */
.content-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

/* Tabla de categorías */
.categories-table {
  width: 100%;
  border-collapse: collapse;
}

.categories-table th {
  background-color: #f8f9fa;
  color: #495057;
  font-weight: 600;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e9ecef;
}

.categories-table td {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.categories-table tr:last-child td {
  border-bottom: none;
}

.categories-table tr:hover {
  background-color: #f8f9fa;
}

.category-name {
  font-weight: 500;
  color: #2c3e50;
}

/* Botones de acción */
.actions-container {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn-edit {
  background-color: #e9f7fe;
  color: #0d6efd;
  border: 1px solid #cfe2ff;
}

.btn-edit:hover {
  background-color: #d0e3fb;
}

.btn-delete {
  background-color: #fef0f0;
  color: #dc3545;
  border: 1px solid #f5c2c7;
}

.btn-delete:hover {
  background-color: #f5d7da;
}

/* Estado vacío */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  text-align: center;
}

.empty-state-content {
  max-width: 400px;
}

.empty-state-icon {
  font-size: 3rem;
  color: #adb5bd;
  margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 992px) {
  .main-content {
    margin-left: 84px; /* Ajustar cuando el sidebar está contraído */
  }
  
  .actions-container {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn-edit, .btn-delete {
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
  
  .categories-table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
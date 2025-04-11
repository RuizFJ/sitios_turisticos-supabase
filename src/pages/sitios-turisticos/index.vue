<template>
  <AppSideBar />
  <div class="page-container">
    <!-- Header con título y botón de acción -->
    <div class="page-header">
      <h1 class="page-title">Lista de Sitios Turísticos</h1>
      <NuxtLink to="/sitios-turisticos/registrar" class="btn btn-primary add-button">
        <i class='bx bx-plus'></i> Nuevo Sitio
      </NuxtLink>
    </div>

    <!-- Contenedor principal -->
    <div class="content-container">
      <!-- Sección de búsqueda y filtros -->
      <div class="search-section">
        <div class="search-container">
          <h4 class="section-title">Buscar Sitio Turístico</h4>
          <form class="search-form" v-on:submit.prevent="buscarSitioTuristico">
            <div class="input-group">
              <span class="input-group-text"><i class='bx bx-search'></i></span>
              <input
                type="text"
                class="form-control search-input"
                placeholder="Buscar por nombre..."
                v-model="nombreSitio"
              />
              <button class="btn btn-primary search-button">Buscar</button>
            </div>
          </form>
        </div>

        <div class="pagination-controls">
          <div class="items-per-page">
            <label for="itemsPerPage" class="form-label">Elementos por página:</label>
            <select v-model="elementosPorPagina" class="form-select" id="itemsPerPage">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tabla de resultados -->
      <div v-if="data && data.length > 0" class="table-section">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-header">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Dirección</th>
                <th scope="col">Ciudad</th>
                <th scope="col" class="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sitio, index) in datosPaginados" :key="sitio.id" class="table-row">
                <th scope="row">{{ (currentPage - 1) * elementosPorPagina + index + 1 }}</th>
                <td class="fw-semibold">{{ sitio.nombre }}</td>
                <td class="text-truncate" style="max-width: 250px;" :title="sitio.descripcion">
                  {{ sitio.descripcion }}
                </td>
                <td>{{ sitio.direccion }}</td>
                <td>
                  <span class="badge bg-primary">{{ sitio.ciudad_id.nombre }}</span>
                </td>
                <td class="text-end">
                  <div class="dropdown action-dropdown">
                    <button
                      class="btn btn-sm btn-outline-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class='bx bx-dots-vertical-rounded'></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <NuxtLink
                          class="dropdown-item"
                          :to="`/sitios-turisticos/actualizar/${sitio.id}`"
                        >
                          <i class='bx bx-edit me-2'></i>Editar
                        </NuxtLink>
                      </li>
                      <li><hr class="dropdown-divider"></li>
                      <li>
                        <button class="dropdown-item text-danger" @click="handleDelete(sitio.id)">
                          <i class='bx bx-trash me-2'></i>Eliminar
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <nav aria-label="Page navigation" class="pagination-container">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPreviousPage">
                <i class='bx bx-chevron-left'></i>
              </button>
            </li>
            <li
              v-for="pagina in totalPaginas()"
              :key="pagina"
              class="page-item"
              :class="{ active: currentPage === pagina }"
              @click="getDataPaginada(pagina)"
            >
              <a class="page-link" href="#">{{ pagina }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPaginas() }">
              <button class="page-link" @click="goToNextPage">
                <i class='bx bx-chevron-right'></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Mensaje cuando no hay datos -->
      <div v-else class="empty-state">
        <div class="empty-state-content">
          <i class='bx bx-map-alt empty-state-icon'></i>
          <h4>No hay sitios turísticos disponibles</h4>
          <p class="text-muted">Parece que no se han registrado sitios turísticos todavía.</p>
          <NuxtLink to="/sitios-turisticos/registrar" class="btn btn-primary">
            <i class='bx bx-plus'></i> Agregar primer sitio
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppSideBar from '~/components/AppSideBar.vue';
import type SitioTuristico from '~/interfaces/sitioTuristico.interface';

const { data, eliminarSitio } = useSitiosT();

const handleDelete = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar este sitio turístico?')) {
    await eliminarSitio(id);
    datosPaginados.value = datosPaginados.value.filter((sitio) => sitio.id !== id);
    data.value = data.value!.filter((sit: any) => sit.id !== id);
  }
};

watch(data, () => {
  getDataPaginada(1);
});

// Paginación
const elementosPorPagina = ref(10);
let datosPaginados = ref<SitioTuristico[]>([]);
const currentPage = ref(1);

function totalPaginas() {
  return Math.ceil(data.value!.length / elementosPorPagina.value);
}

onBeforeMount(() => {
  getDataPaginada(1);
});

watch(elementosPorPagina, () => {
  getDataPaginada(1);
});

function getDataPaginada(pagina: number) {
  currentPage.value = pagina;
  const inicio = (pagina * elementosPorPagina.value) - elementosPorPagina.value;
  const fin = pagina * elementosPorPagina.value;
  datosPaginados.value = data.value!.slice(inicio, fin);
}

function goToPreviousPage() {
  if (currentPage.value > 1) {
    getDataPaginada(currentPage.value - 1);
  }
}

function goToNextPage() {
  if (currentPage.value < totalPaginas()) {
    getDataPaginada(currentPage.value + 1);
  }
}

// Búsqueda
let nombreSitio = ref<string>('');

function buscarSitioTuristico() {
  if (nombreSitio.value === '') {
    getDataPaginada(1);
    return;
  }
  datosPaginados.value = data.value!.filter((sitio) => 
    sitio.nombre.toLowerCase().includes(nombreSitio.value.toLowerCase())
  );
}
</script>

<style scoped>
/* Estilos generales */
.page-container {
  margin-left: 250px;
  padding: 2rem;
  transition: margin-left 0.3s ease;
}

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
}

.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.content-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

/* Sección de búsqueda */
.search-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.search-container {
  flex: 1;
}

.section-title {
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 1rem;
}

.search-form {
  width: 100%;
}

.input-group-text {
  background-color: #f8f9fa;
}

.search-input {
  border-left: none;
}

.search-input:focus {
  box-shadow: none;
  border-color: #ced4da;
}

.search-button {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.pagination-controls {
  display: flex;
  flex-direction: column;
}

.items-per-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-label {
  margin-bottom: 0;
  white-space: nowrap;
}

.form-select {
  width: auto;
}

/* Tabla */
.table-section {
  margin-top: 1.5rem;
}

.table-header {
  background-color: #f8f9fa;
}

.table-header th {
  font-weight: 600;
  color: #495057;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.action-dropdown .dropdown-toggle::after {
  display: none;
}

/* Paginación */
.pagination-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.page-link {
  padding: 0.5rem 0.75rem;
  color: #2c3e50;
}

.page-item.active .page-link {
  background-color: #3b82f6;
  border-color: #3b82f6;
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
  color: #6c757d;
  margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 992px) {
  .page-container {
    margin-left: 84px;
  }
  
  .search-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .items-per-page {
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .page-container {
    margin-left: 0;
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .table td {
    white-space: nowrap;
  }
}
</style>
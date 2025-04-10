<template>
    <AppHeader />
    <h1 class="text-center">Lista de Sitios Turisticos</h1>

    <div class="container mt-5 mb-5">
        <h4>Buscar Sitio Turistico</h4>
        <div class="row d-flex align-items-center">
            <!-- Formulario de búsqueda -->
            <div class="col-md-6 d-flex align-items-center">
                <form class="form-inline w-100 d-flex" v-on:submit.prevent="buscarSitioTuristico">
                    <input type="text" class="form-control me-2" placeholder="Introduce el evento..."
                        v-model="nombreSitio" />
                    <button class="btn btn-primary">Buscar</button>
                </form>
            </div>

            <!-- Selector de elementos por página -->
            <div class="col-md-6 d-flex align-items-center">
                <h4 class="me-3 mb-0">Mostrar elementos por página</h4>
                <div class="input-group w-auto">
                    <label class="input-group-text" for="itemsPerPage">Elementos</label>
                    <select v-model="elementosPorPagina" class="form-select" id="itemsPerPage">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </div>
    </div>



    <div v-if="data" class=" container mt-5 mb-5">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Ciudad</th>
                    
                </tr>
            </thead>
            <tbody class="table-group-divider">

                <tr v-for="(sitio, index) in datosPaginados" :key="index">
                    <th scope="row">{{ (currentPage - 1) * elementosPorPagina + index + 1 }}</th>
                    <td>{{ sitio.nombre }}</td>
                    <td>{{ sitio.descripcion }}</td>
                    <td>{{ sitio.direccion }}</td>
                    <td>{{ sitio.ciudad_id.nombre }}</td>
                    <td>
                        <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Editar Sitio
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <NuxtLink class="dropdown-item" :to="`/sitios-turisticos/actualizar/${sitio.id}`">Actualizar
                                </NuxtLink>
                            </li>
                            <li><button class="dropdown-item" @click="handleDelete(sitio.id)">Eliminar</button></li>

                        </ul>
                    </div>
                    </td>
                    
                </tr>


            </tbody>
        </table>
    </div>
    <div v-else>
        <p>No hay sitios turisticos disponibles</p>
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <button class="page-link" aria-label="Previous" @click="goToPreviousPage">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
            <li v-for="pagina in totalPaginas()" @click="getDataPaginada(pagina)" class="page-item"><a class="page-link"
                    href="#">{{ pagina }}</a></li>
            <li class="page-item">
                <button class="page-link" aria-label="Next" @click="goToNextPage">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import type SitioTuristico from '~/interfaces/sitioTuristico.interface';


// instanciamos el composable useEvents
const { data, eliminarSitio } = useSitiosT()


const handleDelete = async (id: number) => {
    await eliminarSitio(id)
    datosPaginados.value = datosPaginados.value.filter((sitio) => sitio.id !== id);
    data.value = data.value!.filter((sit: any) => sit.id !== id);
}

watch(data, () => {
    console.log('Data cargada:', data.value);
    getDataPaginada(1);
})




//Pagination 

const elementosPorPagina = ref(10);
let datosPaginados = ref<SitioTuristico[]>([]);
const currentPage = ref(1);


function totalPaginas() {
    return Math.ceil(data.value!.length / elementosPorPagina.value);
}

// hook que muestra los datos paginados antes de montar el componente
onBeforeMount(() => {
    getDataPaginada(1);
})
//watch para actualizar la paginacion segun el numero de elementos por pagina
watch(elementosPorPagina, () => {
    getDataPaginada(1);
})
function getDataPaginada(pagina: number) {
    currentPage.value = pagina;
    datosPaginados.value = [];
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

//search
// se necesita optimizar la busqueda
let nombreSitio = ref<string>('');

function buscarSitioTuristico() {
    if (nombreSitio.value === '') {
        getDataPaginada(1);
        return;
    }

    datosPaginados.value = data.value!.filter((sitio) => sitio.nombre.toLowerCase().includes(nombreSitio.value.toLowerCase()));
}


</script>

<style scoped></style>
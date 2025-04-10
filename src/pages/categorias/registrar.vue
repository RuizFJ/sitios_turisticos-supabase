<template>
    <AppHeader />
    <h1 class="text-center">Registrar Categoria</h1>
    
    <section class="container mt-5 mb-5">
        <form @submit.prevent="registrarCat">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input
            type="text"
            class="form-control"
            id="nombre"
            aria-describedby="nombreHelp"
            v-model="categoria.nombre"
            />
            <div id="nombreHelp" class="form-text">Nombre de la Categoria</div>
        </div>
    
        <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
    </section>
</template>

<script lang="ts" setup>


const {registrarCategoria} = useCategorias()
const categoria = ref({
    nombre: ''
})

const registrarCat = async () => {

    const error = await registrarCategoria(categoria.value)
    if (!error) {
        alert('Categoria registrada correctamente')
        navigateTo('/categorias')
    } else {
        console.error('Error al registrar la categoria')
    }
}
</script>
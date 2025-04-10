<template>
    <AppHeader />
    <h1 class="text-center">Registrar Ciudades</h1>
    
    <section class="container mt-5 mb-5">
        <form @submit.prevent="registrarCiud">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input
            type="text"
            class="form-control"
            id="nombre"
            aria-describedby="nombreHelp"
            v-model="ciudad.nombre"
            />
            <div id="nombreHelp" class="form-text">Nombre de la Categoria</div>
        </div>
    
        <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
    </section>
</template>

<script lang="ts" setup>
import { useCiudades } from '~/composables/useCiudad'



const {registrarCiudad} = useCiudades()

const ciudad = ref({
    nombre: ''
})

const registrarCiud = async () => {

    const error = await registrarCiudad(ciudad.value)
    if (!error) {
        alert('Ciudad registrada correctamente')
        navigateTo('/ciudades')
    } else {
        console.error('Error al registrar la ciudades')
    }
}
</script>
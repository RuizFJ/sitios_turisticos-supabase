<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <NuxtLink class="navbar-brand" to="/">Home</NuxtLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/sitios-turisticos">Sitios Turisticos</NuxtLink>
                        </li>
                        <li class="nav-item"> 
                            <NuxtLink class="nav-link" to="/sitios-turisticos/registrar">Registrar Sitio Turistico</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/categorias">Categorias</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/categorias/registrar">Registrar Categoria</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/">Ciudades</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/ciudades/registrar">Registrar Ciudad</NuxtLink>
                        </li>
                        
                    </ul>
                    <button @click="logout" class="btn btn-secondary">Logout</button>
                    
                </div>
            </div>
        </nav>
    </header>
</template>

<script lang="ts" setup>

const client = useSupabaseClient()
const logout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}

</script>

<style scoped>

</style>
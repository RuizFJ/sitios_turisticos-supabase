<template>
    <AppHeader />
    <h1 class="text-center">Lista de Ciudades</h1>
  
    <div v-if="data" class="container mt-5 mb-5">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(ciudad, index) in data" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ ciudad.nombre }}</td>
            <td>
              <button class="btn btn-danger" @click="handleDelete(ciudad.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No hay categorias disponibles</p>
    </div>
  </template>
  
  <script lang="ts" setup>
import { useCiudades } from '~/composables/useCiudad';

  // instanciamos el composable useEvents
  const { data, eliminarCiudad } = useCiudades();
  

  
  const handleDelete = async (id: number) => {
    const confirmacion = confirm(
      "¿Estás seguro de que deseas eliminar esta categoria?"
    );
    if (confirmacion) {
      const error = await eliminarCiudad(id);
      if (!error) {
        alert("ciudad eliminada correctamente");
        data.value = data.value!.filter((cat: any) => cat.id !== id);
      } else {
        console.error("Error al eliminar la ciudad");
      }
    }
  };
  </script>
  
  <style scoped></style>
  
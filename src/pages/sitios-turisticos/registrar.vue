import type AddSitioTuristico from '~/interfaces/addSitioTuristico.interface';
<template>
  <AppHeader />
  <h1 class="container mt-2">Registrar un sitio Turistico</h1>
  <section class="container mt-5 shadow-lg p-3 mb-5 bg-body rounded">
    <form @submit.prevent="agregarSitio">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          aria-describedby="nombreHelp"
          v-model="sitio.nombre"
        />
        <div id="nombreHelp" class="form-text">Nombre del Sitio Turistico</div>
      </div>
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <input
          type="text"
          class="form-control"
          id="descripcion"
          aria-describedby="descripcionHelp"
          v-model="sitio.descripcion"
        />
        <div id="descripcionHelp" class="form-text">
          Descripción del Sitio Turistico
        </div>
      </div>

      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección</label>
        <input
          type="text"
          class="form-control"
          id="direccion"
          aria-describedby="direccionHelp"
          v-model="sitio.direccion"
        />
        <div id="direccionHelp" class="form-text">
          Dirección del Sitio Turistico
        </div>
      </div>

      <div class="mb-3">
        <label for="categoria" class="form-label">Categoría</label>
        <select class="form-select" id="categoria" v-model="sitio.categoria_id">
          <option disabled value="0">Selecciona una categoría</option>
          <option
            v-for="cat in categorias.data.value || []"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.nombre }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="ciudad" class="form-label">Ciudad</label>
        <select class="form-select" id="ciudad" v-model="sitio.ciudad_id">
          <option disabled value="0">Selecciona una ciudad</option>
          <option
            v-for="ciudad in ciudades.data.value || []"
            :key="ciudad.id"
            :value="ciudad.id"
          >
            {{ ciudad.nombre }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Agregar</button>
    </form>
  </section>
</template>

<script lang="ts" setup>
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
  const { error } = await client.from("sitio_turistico").insert({
    nombre: sitio.value.nombre,
    descripcion: sitio.value.descripcion,
    direccion: sitio.value.direccion,
    categoria_id: sitio.value.categoria_id,
    ciudad_id: sitio.value.ciudad_id,
  });
  if (error) {
    console.error("Error al agregar el sitio turístico:", error);
    return null;
  }

  alert("Sitio turístico agregado");
  navigateTo("/sitios-turisticos");
};
</script>

<style scoped></style>

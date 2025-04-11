<template>
  <div class="nav" :class="{ 'show-menu': showMenu }" id="nav">
    <nav class="nav__content">
      <div class="nav__toggle" id="nav-toggle" @click="toggleMenu">
        <i class='bx bx-chevron-right' :class="{ 'rotate-icon': showMenu }"></i>
      </div>

      <NuxtLink to="/" class="nav__logo">
        <img class="nicaway_image" src="../assets/images/NicaWay_prev_ui.png" alt="">
        <span class="nav__logo-name">NicaWay</span>
      </NuxtLink>

      <div class="nav__list">
        <NuxtLink to="/sitios-turisticos/" class="nav__link" :class="{ 'active-link': $route.path.startsWith('/sitios-turisticos') && !$route.path.includes('/registrar') }">
          <i class='bx bx-map-alt'></i>
          <span class="nav__name">Sitios Turísticos</span>
        </NuxtLink>

        <NuxtLink to="/categorias/" class="nav__link" :class="{ 'active-link': $route.path.startsWith('/categorias') && !$route.path.includes('/registrar') }">
          <i class='bx bx-category'></i>
          <span class="nav__name">Categorías</span>
        </NuxtLink>

        <NuxtLink to="/ciudades/" class="nav__link" :class="{ 'active-link': $route.path.startsWith('/ciudades') && !$route.path.includes('/registrar') }">
          <i class='bx bxs-city'></i>
          <span class="nav__name">Ciudades</span>
        </NuxtLink>

        <div class="nav__section-divider">
          <span class="nav__section-title">Operaciones</span>
        </div>

        <NuxtLink to="/sitios-turisticos/registrar" class="nav__link" :class="{ 'active-link': $route.path.startsWith('/sitios-turisticos/registrar') }">
          <i class='bx bx-trip'></i>
          <span class="nav__name name2">Nuevo Sitio Turístico</span>
        </NuxtLink>
        <NuxtLink to="/categorias/registrar" class="nav__link" :class="{ 'active-link': $route.path.startsWith('/categorias/registrar') }">
          <i class='bx bx-message-square-add'></i>
          <span class="nav__name name2">Agregar Categoría</span>
        </NuxtLink>
        <NuxtLink to="/ciudades/registrar" class="nav__link" :class="{ 'active-link': $route.path.startsWith('/ciudades/registrar') }">
          <i class='bx bx-location-plus'></i>
          <span class="nav__name name2">Agregar Ciudad</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
const showMenu = ref(false)
const cookie = useCookie('sidebarState')

// Al montar el componente, recuperamos el estado de la cookie
onMounted(() => {
  showMenu.value = cookie.value === 'expanded'
})

const toggleMenu = () => {
  showMenu.value = !showMenu.value
  // Guardamos el estado en la cookie
  cookie.value = showMenu.value ? 'expanded' : 'collapsed'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
@import url('https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css');

:root {
--first-color: hsl(228, 81%, 49%);
--first-color-light: hsl(228, 81%, 65%);
--title-color: hsl(228, 12%, 15%);
--text-color: hsl(228, 8%, 50%);
--body-color: hsl(228, 100%, 99%);
--container-color: #fff;
--body-font: 'Poppins', sans-serif;
--normal-font-size: .938rem;
--transition: all 0.3s ease;
--shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
--border-radius: 8px;
}

@media screen and (min-width: 968px) {
:root {
  --normal-font-size: 1rem;
}
}

* {
box-sizing: border-box;
padding: 0;
margin: 0;
}

.nav {
position: fixed;
left: 0;
background-color: var(--container-color);
box-shadow: 1px 0 4px hsla(228, 81%, 49%, .15);
width: 84px;
height: 100vh;
padding: 1.5rem 1rem;
transition: var(--transition);
z-index: 100;
}

.nav.show-menu {
width: 260px;
}

.nav__content {
height: 100%;
display: flex;
flex-direction: column;
overflow: hidden;
}

.nav__logo {
display: flex;
align-items: center;
column-gap: 1rem;
margin-bottom: 2rem;
padding: 0.5rem;
border-radius: var(--border-radius);
transition: var(--transition);
}

.nav__logo:hover {
background-color: rgba(72, 122, 255, 0.1);
}

.nicaway_image {
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
transition: var(--transition);
}

.show-menu .nicaway_image {
width: 45px;
height: 45px;
}

.nav__logo-name {
color: var(--title-color);
font-weight: 600;
font-size: 1.1rem;
opacity: 0;
transition: opacity 0.3s ease;
white-space: nowrap;
}

.show-menu .nav__logo-name {
opacity: 1;
}

.nav__toggle {
position: absolute;
width: 24px;
height: 24px;
background-color: hsl(228, 81%, 49%);
color: #fff;
border-radius: 50%;
font-size: 1.1rem;
display: grid;
place-items: center;
top: 1.5rem;
right: -12px;
cursor: pointer;
transition: var(--transition);
box-shadow: var(--shadow);
z-index: 1;
}


.nav__toggle:hover {

transform: scale(1.1);
}

.rotate-icon {
transform: rotate(180deg);
}

.nav__list {
display: flex;
flex-direction: column;
row-gap: 1rem;
flex-grow: 1;
}

.nav__link {
display: flex;
align-items: center;
color: var(--text-color);
padding: 0.75rem;
border-radius: var(--border-radius);
transition: var(--transition);
column-gap: 1rem;
}

.nav__link i {
font-size: 1.25rem;
min-width: 24px;
display: flex;
justify-content: center;
}

.nav__link:hover {
color: var(--first-color);
background-color: rgba(72, 122, 255, 0.1);
}

.active-link {
color: var(--first-color);
background-color: rgba(72, 122, 255, 0.1);
font-weight: 500;
}

.nav__name {
font-size: 0.875rem;
white-space: nowrap;
opacity: 0;
transition: opacity 0.3s ease;
}

.name2 {
font-size: 0.8rem;
}

.show-menu .nav__name {
opacity: 1;
}

.nav__section-divider {
margin: 1rem 0 0.5rem;
padding: 0 0.75rem;
}

.nav__section-title {
font-size: 0.75rem;
text-transform: uppercase;
color: var(--text-color);
letter-spacing: 0.5px;
opacity: 0;
transition: opacity 0.3s ease;
}

.show-menu .nav__section-title {
opacity: 1;
}

/* Responsive styles */
@media screen and (max-width: 767px) {
.nav {
  width: 100%;
  height: auto;
  bottom: 0;
  top: auto;
  padding: 0.5rem;
}

.nav.show-menu {
  width: 100%;
}

.nav__content {
  flex-direction: row;
  justify-content: center;
}

.nav__logo, 
.nav__toggle, 
.nav__logo-name,
.nav__section-title {
  display: none;
}

.nav__list {
  flex-direction: row;
  margin: 0;
  column-gap: 1.5rem;
  padding: 0.5rem;
  width: 100%;
  justify-content: center;
}

.nav__link {
  flex-direction: column;
  row-gap: 0.25rem;
  padding: 0.5rem;
  font-size: 0.75rem;
}

.nav__name {
  opacity: 1;
  font-size: 0.65rem;
}

.name2 {
  display: none;
}

.nav__section-divider {
  display: none;
}
}

@media screen and (max-width: 480px) {
.nav__list {
  column-gap: 1rem;
}

.nav__link i {
  font-size: 1.1rem;
}

.nav__name {
  font-size: 0.6rem;
}
}
</style>
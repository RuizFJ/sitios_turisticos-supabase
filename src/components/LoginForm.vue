<template>
    <section v-if="!user" class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem">
                        <div class="card-body p-5 text-center">
                            <form @submit.prevent="handleSubmit" class="mb-md-5 mt-md-4 pb-5">
                                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                <p class="text-white-50 mb-5">
                                    Please enter your login and password!
                                </p>

                                <div data-mdb-input-init class="form-outline form-white mb-4">
                                    <input v-model="email" type="email" id="typeEmailX"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="typeEmailX">Email</label>
                                </div>

                                <div data-mdb-input-init class="form-outline form-white mb-4"
                                    style="position: relative;">
                                    <input :type="passwordFieldType" v-model="password"
                                        class="form-control form-control-lg" placeholder="Enter your password" />
                                        <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
                                    <span @click="togglePasswordVisibility" class="iconn">
                                        
                                        <font-awesome-icon :icon="[ 'fas', passwordVisible ? 'eye-slash' : 'eye' ]"  class="icon-black" />
                                    </span>
                                    <label class="form-label" for="typePasswordX">Password</label>
                                </div>


                                <p class="small mb-5 pb-lg-2">
                                    <a class="text-white-50" href="#!">Forgot password?</a>
                                </p>

                                <button data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-outline-light btn-lg px-5" type="submit">
                                    Login
                                </button>

                                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                                    <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                                    <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                    <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>

import { ref } from 'vue'


const {login} = useAuth()   // This is a composables function that returns the login function
const user = useSupabaseUser() // This is a function that returns the current user
const errors = reactive({
  password: ''
});
const email = ref('')
const password = ref('')


onBeforeMount(() => {
    if (user) {
        navigateTo('/')
    }
})

const handleSubmit = async () => {
    if (!password.value) {
        errors.password = 'Password cannot be empty.';
    }
    else{
        await login(email.value, password.value)
        email.value = ''
        password.value = ''
    }
}


const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};

const passwordFieldType = computed(() => (passwordVisible.value ? 'text' : 'password'));


</script>

<style scoped>
.gradient-custom {

    background: #6a11cb;

    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}


.iconn {
    position: absolute;
    right: 10px; /* Ajusta el valor para el espacio a la derecha */
    top: 25px; /* Centrado verticalmente en relación con el input */
    transform: translateY(-50%); /* Mueve el ícono para que esté centrado verticalmente */
    cursor: pointer;
    z-index: 10; /* Asegura que el ícono esté por encima del input */
    background-color: white; /* Opcional: agrega un fondo blanco detrás del ícono */
    padding: 5px; /* Opcional: espacio alrededor del ícono */
}

.icon-black {
    color: black;
}   


</style>
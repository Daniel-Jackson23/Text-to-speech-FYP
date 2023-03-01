<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-primary-blue mb-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <img src="../assets/text-to-speech-svgrepo-com%20(1).svg" class="max-md:hidden w-9" alt="Flowbite Logo"/>

      <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
        <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
           href="#pablo">
          Text to Speech
        </a>
        <button
            class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button" v-on:click="toggleNavbar()">
          <i class="fas fa-bars">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"/>
            </svg>
          </i>
        </button>
      </div>
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            >
              <i class="fab fa-facebook-square text-lg leading-lg text-white opacity-75"/>
              <RouterLink to="/"
                          class="ml-2">Home
              </RouterLink>
            </a>
          </li>
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
              <i class="fab fa-twitter text-lg leading-lg text-white opacity-75"/>
              <RouterLink to="/about" class="ml-2">About</RouterLink>
            </a>
          </li>
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
              <i class="fab fa-pinterest text-lg leading-lg text-white opacity-75"/><RouterLink to="/login" class="ml-2">Login</RouterLink>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>
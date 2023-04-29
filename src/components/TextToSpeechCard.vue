<template>
  <div class="container flex justify-center h-96">
    <!-- <transition name="fade" v-if="isLoading">
      <PulseLoader></PulseLoader>
    </transition> -->
    <!-- <transition name="fade" v-if="!isLoading"> -->
    <div
      class="lg:w-full p-6 bg-white text-black border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700 dark:text-white"
    >
      <form @submit.prevent="reading" class="">
        <h2 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Text to Speech
        </h2>
        <div class="" v-if="voiceList.length">
          <div class="pb-6">
            <label
              for="voices"
              class="block mb-2 font-bold text-md font-medium text-black dark:text-white"
              >Select a voice</label
            >
            <select
              class="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-100 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="voices"
              v-model="selectedVoice"
            >
              <option v-for="(voice, index) in voiceList" :data-lang="voice.lang" :value="index">
                {{ voice.name }} ({{ voice.lang }})
              </option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="your-text" class="block mb-2 text-sm font-medium text-black dark:text-white"
            >Enter your text</label
          >
          <textarea
            class="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-50 focus:border-blue-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="your-text"
            placeholder="Enter text..."
            type="text"
            v-model="read"
            required
          />
        </div>
        <div>
          <label for="rate">Rate</label>
          <input
            ref="rate "
            :value="2.4"
            type="range"
            id="rate"
            min="0"
            max="16"
            step="0.1"
            list="tickmarks"
          />
          <datalist id="tickmarks">
            <option type="number" :value="1"></option>
            <option :value="1"></option>
            <option :value="0"></option>
            <option :value="2"></option>
            <option :value="3"></option>
            <option :value="4"></option>
            <option :value="5"></option>
            <option :value="6"></option>
            <option :value="7"></option>
            <option :value="8"></option>
            <option :value="9"></option>
            <option :value="10"></option>
            <option :value="11"></option>
            <option :value="12"></option>
            <option :value="13"></option>
            <option :value="14"></option>
            <option :value="15"></option>
            <option :value="16"></option>
          </datalist>
        </div>
        <div class="flex space-x-4 pt-2">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Speak Out Load
          </button>
          <button
            value="pause"
            @click="pause"
            type="button"
            class="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
          >
            Pause
          </button>
          <button
            value="resume"
            id="resume"
            @click="resume"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Resume
          </button>
          <button value="speechStop" id="stop" @click="stop" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Stop
          </button>
        </div>
      </form>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'TextToSpeechCard',
  components: {
    // PulseLoader
  },
  data() {
    return {
      isLoading: false,
      read: '',
      selectedVoice: 0,
      synth: window.speechSynthesis,
      voiceList: [],
      textSpeech: new window.SpeechSynthesisUtterance()
    }
  },
  mounted() {
    this.voiceList = this.synth.getVoices()
    if (this.voiceList.length) {
      this.isLoading = false
    }
    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices
      this.voiceList = this.synth.getVoices()
      setTimeout(() => {
        this.isLoading = false
      })
      this.listenForSpeechEvents()
      this.textSpeech.rate = this.rate.value()
    }
  },
  methods: {
    listenForSpeechEvents() {
      this.textSpeech.onstart = () => {
        this.isLoading = true
      }
      this.textSpeech.onend = () => {
        this.isLoading = false
      }
    },
    setOption() {
      this.textSpeech[this.name] = this.value
    },
    reading() {
      this.textSpeech.text = `${this.read}`
      this.textSpeech.voice = this.voiceList[this.selectedVoice]
      this.synth.speak(this.textSpeech)
    },
    pause() {
      window.speechSynthesis.pause()
    },
    resume() {
      window.speechSynthesis.resume()
    },
    stop() {
      window.speechSynthesis.cancel()
    }
  }
}
</script>

<style>
/* https://github.com/tjFogarty/speech-synthesis */
</style>

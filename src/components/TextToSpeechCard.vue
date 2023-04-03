<template>
  <div class="container flex justify-center h-96">
    <transition name="fade" v-if="isLoading">
      <PulseLoader></PulseLoader>
    </transition>
    <transition name="fade" v-if="!isLoading">
      <div
        class="max-w-lg p-6 bg-white text-black border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700 dark:text-white"
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
          <div id="rangeWrapper" class="flex justify-center py-4">
            <label for="range" class="m-1">Pitch</label>
              <input type="range" name="range" id="pitch" class="">
          </div>
          <button type="submit" class="btn btn-success">Read</button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'TextToSpeechCard',
  components: {
    PulseLoader
  },
  data() {
    return {
      isLoading: true,
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
      }, 700)
      this.listenForSpeechEvents()
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
    reading() {
      this.textSpeech.text = `${this.read}`

      this.textSpeech.voice = this.voiceList[this.selectedVoice]
      this.synth.speak(this.textSpeech)
    }
  }
}
</script>

<style>
/* https://github.com/tjFogarty/speech-synthesis */
</style>

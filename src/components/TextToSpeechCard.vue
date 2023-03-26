<template>
  <div class=" container ">
    <div
      class="flex justify-center bg-white border border-blue-200 h-80 max-h-full rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <transition name="fade" v-if="isLoading">
        <PulseLoader></PulseLoader>
      </transition>
      <transition name="fade" v-if="!isLoading">
        <div class="form-container">
          <form @submit.prevent="reading">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Text to Speech</h2>
            <div class="" v-if="voiceList.length">
              <label for="voices">Select a voice</label>
              <select class="" id="voices" v-model="selectedVoice">
                <option v-for="(voice, index) in voiceList" :data-lang="voice.lang" :value="index">{{ voice.name }}
                  ({{ voice.lang }})
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="your-text">Enter your text</label>
              <input class="" id="your-text" type="text" v-model="read" required />
            </div>
            <button type="submit" class="btn btn-success">Read</button>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: "TextToSpeechCard",
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
<template>
  <div>
    <transition name="fade" v-if="isLoading">
      <PulseLoader></PulseLoader>
    </transition>
    <transition name="fade" v-if="!isLoading">
      <div class="form-container">
        <form @submit.prevent="reading">
          <h2>Text to Speech</h2>
          <div class="form-group" v-if="voiceList.length">
            <label for="voices">Select a voice</label>
            <select class="form-control" id="voices" v-model="selectedVoice">
              <option v-for="(voice, index) in voiceList" :data-lang="voice.lang" :value="index">{{ voice.read }}
                ({{ voice.lang }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="your-text">Enter your text</label>
            <input class="form-control" id="your-text" type="text" v-model="read" required/>
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
  mounted: function () {
    this.voiceList = this.synth.getVoices()

    if (this.voiceList.length) {
      this.isLoading = false
    }

    this.synth.onvoiceschanged = () => {
    }
    this.voiceList = this.synth.getVoices()
    setTimeout(() => {
      this.isLoading = false
    }, 700)
    this.listenForSpeechEvents()
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
// https://github.com/tjFogarty/speech-synthesis


body, button, input, optgroup, select, textarea {
  font-family: 'Open Sans', sans-serif;
}

.form-container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 10px 30px 10px rgba(0, 0, 0, 0.1);
}

.v-spinner {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity ease .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.btn-success {
  background: #43C6AC;
  border-color: #43C6AC;
  cursor: pointer;
}

h1 {
  margin-bottom: 25px;
}
</style>
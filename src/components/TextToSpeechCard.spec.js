import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import TextToSpeechCard from "@/components/TextToSpeechCard.vue";

const wrapper = mount(TextToSpeechCard);

it("testing GuessAge component props", async () => {
    expect(TextToSpeechCard.props.title).toContain("Guess User Age App");
  });

  it("Test if data is a function", () => {
    expect(typeof GuessAge.data).toBe("function");
  });
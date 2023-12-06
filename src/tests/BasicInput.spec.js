import BasicInput from "@/components/BasicInput.vue";

import { shallowMount } from "@vue/test-utils";

const wrapper = shallowMount(BasicInput, {
  props: {
    name: "Test",
    type: "text",
    label: "Label",
  },
});

const input = wrapper.find("input");

jest.mock("vee-validate", () => {
  return {
    useField: jest.fn(() => {
      return {
        value: "Input model value",
        errorMessage: "Error Message",
      };
    }),
  };
});

describe("Basic Input", () => {
  it("should have received prop data", () => {
    expect(wrapper.props().name).toBe("Test");
    expect(wrapper.props().type).toBe("text");
    expect(wrapper.props().label).toBe("Label");
  });
  it("should attach label prop to label element", () => {
    const label = wrapper.find("label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain("Label");
    expect(label.text()).toBe("Label:");
  });
  it("should have input type text", () => {
    expect(input.exists()).toBe(true);
    expect(input.attributes("type")).toBe("text");
  });
  it("should show errorMessage coming from useField()", () => {
    const errorMessageSpan = wrapper.find("span");
    expect(errorMessageSpan.exists()).toBe(true);
    expect(errorMessageSpan.text()).toBe("Error Message");
  });
  it("should use value from useField() for the v-model", () => {
    expect(input.element.value).toBe("Input model value");
  });
});

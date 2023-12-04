import RegisterPage from "@/pages/RegisterPage/RegisterPage.vue";
import { shallowMount } from "@vue/test-utils";
describe("RegisterPage.vue", () => {
  it("renders the correct <h1> text", () => {
    const wrapper = shallowMount(RegisterPage);

    const expectedHeaderText = "Register Page";

    expect(wrapper.contains("h1")).toBe(true);

    expect(wrapper.find("h1").text()).toBe(expectedHeaderText);
  });
});

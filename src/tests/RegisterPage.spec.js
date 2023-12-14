import RegisterPage from "@/pages/RegisterPage/RegisterPage.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import BasicInput from "@/components/BasicInput.vue";

let wrapper;

beforeEach(() => {
  wrapper = mount(RegisterPage, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            user: {
              currentUser: { email: "adming@gmail.com", timezone: "Europe/Riga" },
            },
          },
        }),
      ],
    },
  });
});

jest.mock("@/services/firebaseConfig.js", () => {
  return {
    fireStore: jest.fn(),
    fireAuth: jest.fn(),
  };
});

jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/components/BasicInput.vue", () => {
  return {
    template: "<div>Mocked Input</div>",
  };
});

describe("RegisterPage.vue", () => {
  it("renders the component", () => {
    const wrapper = mount(RegisterPage);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render the right basic inputs", () => {
    const inputs = wrapper.findAllComponents(BasicInput);

    expect(inputs.length).toBe(4);
  });
});

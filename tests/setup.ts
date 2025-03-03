jest.mock("../config", () => ({
  supabase: {
    from: jest.fn(),
    auth: {
      getUser: jest.fn(),
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
    },
  },
  stripe: {
    paymentIntents: {
      create: jest.fn(),
      retrieve: jest.fn(),
    },
  },
}));

beforeAll(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

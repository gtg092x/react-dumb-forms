const SimpleFormSchema = {
    firstName: { presence: true, length: {minimum: 1} },
    lastName: { presence: false, length: {minimum: 3} }
};

const RadioFormSchema = {
    favoriteColor: { presence: true },
    overEngineered: { presence: true },
    isFlake: { presence: true }
};

export {SimpleFormSchema, RadioFormSchema};
const sayHello1 = (name) => console.log("Hi " + name);

const sayHello2 = (name, greeting = "Hiho ") => console.log(greeting + name);
const sayHello3 = () => console.log("Salutations, User");
const sayHello4 = (name) => "Greetings " + name;

const checkInput = (callback, ...strings) => {
  for (const str of strings) {
    if (!str) {
      return;
    }
  }
  callback();
};

sayHello1("Rafael");
sayHello2("Rafael", "Hello, ");
sayHello3();
console.log(sayHello4("Rafael"));

sayHello2("Rafael");

checkInput(() => console.log("No empty strings."), "foo", "bar", "baz");

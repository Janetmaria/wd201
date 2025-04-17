const firstName = () => {
    console.log("John");
};
const lastName = () => {
    console.log("Doe");
};
const printName = () => {
    console.log("i'm ");
    setTimeout(firstName());
    lastName();
};
printName()

/*function generateGreetings(name) {
    function spanish() {
        console.log(`Hola ${name}`);
    }
    function english() {
        console.log(`Hello ${name}`);
    }
    return {spanish, english};
}

const name = "John";
const greetings = generateGreetings(name);

console.log(typeof(greetings.spanish));

greetings.spanish();
greetings.english();*/
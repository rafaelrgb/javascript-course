const task3Element = document.getElementById('task-3');

function showText() {
    alert('This is some text of my choice.');
}

function greetUser(name) {
    alert('Hello ' + name + '!');
}

function combineStrings(str1, str2, str3) {
    return str1 + str2 + str3;
}

task3Element.addEventListener('click', showText);

showText();
greetUser('Rafael');
alert(combineStrings('Foo ', 'Bar ', 'Baz.'));
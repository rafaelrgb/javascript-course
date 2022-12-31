const title = document.getElementById('main-title');

title.style.color = 'white';
title.style.textContent = 'Some new Title!';
title.style.backgroundColor = 'black';

//const listItems = document.querySelectorAll('li');
const listItems = document.getElementsByTagName('li');

for (const listItem of listItems) {
  console.dir(listItem);
}

const ul = document.body.firstElementChild.nextElementSibling;
const firstLi = ul.firstElementChild;
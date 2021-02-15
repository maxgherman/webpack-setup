import { Text } from './text-component'

function component() {
  const element = document.createElement('div');

  element.innerHTML = Text('Hello webpack');

  return element;
}

document.body.appendChild(component());
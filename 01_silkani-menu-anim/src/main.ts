import './style.scss';
import Menu from './scripts/menu/menu'; 

export default class Main{

  elMenu:HTMLElement;
  constructor(){
    this.elMenu = document.querySelector('.menu') as HTMLElement;
    new Menu(this.elMenu);
    // console.log(typeof Object.keys(images)[0]);
  }

  bindings(){

  }

}

new Main();
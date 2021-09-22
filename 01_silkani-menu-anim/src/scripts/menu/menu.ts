import MenuItem from '../menuItem/menu-item';

export default class Menu {
    DOM:any;
    sources:Array<string>;
    animatableProperties: {
        tx: any,
        ty: any,
        rotation: any,
        brightness: any,
      };
    menuItems:Array<MenuItem>;

    constructor(el:HTMLElement) {
        this.DOM = {el: el};
        this.DOM.menuItems = this.DOM.el.querySelectorAll('.menu__item');
        this.sources = new Array<string>();
        document.querySelectorAll('.preload').forEach((el)=>{
            this.sources.push((el as HTMLImageElement).src);
        })
        this.animatableProperties = {
            // translationX
            tx: {previous: 0, current: 0, amt: 0.08},
            // translationY
            ty: {previous: 0, current: 0, amt: 0.08},
            // Rotation angle
            rotation: {previous: 0, current: 0, amt: 0.08},
            // CSS filter (brightness) value
            brightness: {previous: 1, current: 1, amt: 0.08}
        };
        this.menuItems = [];
        [...this.DOM.menuItems].forEach((item, pos) => this.menuItems.push(new MenuItem(item, pos, this.animatableProperties)));
        // this.showMenuItems();
    }
    // initial animation for revealing the menu items
    // showMenuItems() {
    //     gsap.to(this.menuItems.map(item => item.DOM.textInner), {
    //         duration: 1.2,
    //         ease: 'Expo.easeOut',
    //         startAt: {y: '100%'},
    //         y: 0,
    //         delay: pos => pos*0.06
    //     });
    // }
}
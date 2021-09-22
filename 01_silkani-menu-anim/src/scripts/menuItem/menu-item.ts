import { gsap } from "gsap";

export default class MenuItem {

    DOM:any;
    inMenuPosition:number;

    animatableProperties:{
        tx: {previous: number, current: number, amt: number},
        // translationY
        ty: {previous: number, current: number, amt: number},
        // Rotation angle
        rotation: {previous: number, current: number, amt: number},
        // CSS filter (brightness) value
        brightness: {previous: number, current: number, amt: number}
    };

    bounds!: {
        el: DOMRect;
    };

    requestId: any;

    mouseenterFn!: Function;
    mouseleaveFn!: Function;
    
    tl!:GSAPTimeline;
    direction:number=1;

    firstRAFCycle: boolean = false;

    constructor(el:HTMLElement, inMenuPosition:number, animatableProperties:any) {
        this.DOM = {el: el};
        this.inMenuPosition = inMenuPosition;
        this.animatableProperties = animatableProperties;
        this.DOM.revealElements = new Array<any>();

        this.layout();
        this.initEvents();
    }
    layout() {
        for(let i=0; i<2; i++){
            this.DOM.revealElements[i] = new Object();
            this.DOM.revealElements[i].reveal = document.createElement('div');
            this.DOM.revealElements[i].reveal.className = 'hover-reveal';
            this.DOM.revealElements[i].revealInner = document.createElement('div');
            this.DOM.revealElements[i].revealInner.className = 'hover-reveal__inner';
            this.DOM.revealElements[i].revealImage = document.createElement('img');
            this.DOM.revealElements[i].revealImage.className = 'hover-reveal__img';
            this.DOM.revealElements[i].revealImage.src = `${(document.querySelectorAll('.menu__image')[2*this.inMenuPosition + i%2] as HTMLImageElement).src}`;
            this.DOM.revealElements[i].revealInner.appendChild(this.DOM.revealElements[i].revealImage);
            this.DOM.revealElements[i].reveal.appendChild(this.DOM.revealElements[i].revealInner);
            this.DOM.el.appendChild(this.DOM.revealElements[i].reveal);
        }        
       const elementDisplacement = (document.querySelector(`.menu .menu__item:nth-child(${this.inMenuPosition+1})`) as HTMLElement).clientWidth*0.25;
        this.DOM.revealElements.forEach((element: any, i: number) => {
            const disp = elementDisplacement+element.reveal.clientWidth;
            gsap.set(element.reveal, {x:`+=${i%2 ? disp: -disp}px`});
        });
    }

    calcBounds() {
        this.bounds = {
            el: this.DOM.el.getBoundingClientRect(),
        };
    }

    initEvents() {
        this.mouseenterFn = () => {
            // show the image element
            this.showImage();
            // this.firstRAFCycle = true;
            // start the render loop animation (rAF)
        };
        this.mouseleaveFn = () => {
            // stop the render loop animation (rAF)
            // hide the image element
            this.hideImage();
        };
        
        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
    }

    showImage() {
        this.killTweens();
        this.tl = gsap.timeline({
            defaults:{duration: 1.5},
            onStart: () => {
                // show the image element
                this.DOM.el.style.zIndex = 1;
                [...this.DOM.revealElements].forEach ((el)=>{
                    el.reveal.style.zIndex = -1;
                })
            }
        });
        this.tl.to(this.DOM.el, {color: 'white'},0);
        [...this.DOM.revealElements].forEach ((el)=>{
            this.tl.to(el.reveal, {opacity:1, duration: 1}, 0);
            this.tl.fromTo(el.revealInner, {borderRadius: '5vw'}, {borderRadius: '10vw',  duration: 1}, 0);
            this.tl.fromTo(el.revealImage, {scale: 1.25}, {scale:1}, 0);
        });

    }
    // hide the image element
    hideImage() {
        this.tl.kill();
        this.tl = gsap.timeline({
            onStart: () => {
                // show the image element
                [...this.DOM.revealElements].forEach ((el)=>{
                    el.reveal.style.opacoty = 0;
                })
            },
            onComplete:()=>{
                this.DOM.el.style.zIndex = 0;
            }
        });
        this.tl.to(this.DOM.el, {color: 'rgba(255, 255, 255, 0.3)'},0);
        [...this.DOM.revealElements].forEach ((el)=>{
            this.tl.to(el.reveal, {opacity:0}, 0);
            this.tl.to(el.revealImage, {scale: 1.25}, 0);
        });
    }

    killTweens(){
        // kill any current tweens
        // [...this.DOM.revealElements].forEach (()=>{
        //     gsap.killTweensOf(this.DOM.reveal);
        //     gsap.killTweensOf(this.DOM.revealInner);
        //     gsap.killTweensOf(this.DOM.revealImage);

        // });
    }
}
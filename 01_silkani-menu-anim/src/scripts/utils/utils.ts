
// Map number x from range [a, b] to [c, d]
const map = (x:number, a:number, b:number, c:number, d:number) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a:number, b:number, n:number) => (1 - n) * a + n * b;

const clamp = (num:number, min:number, max:number) => num <= min ? min : num >= max ? max : num;

// Gets the mouse position
const getMousePos = (e:MouseEvent) => {
    let posx = 0;
    let posy = 0;

    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY)    {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    
    return { x : posx, y : posy }
};

export { map, lerp, clamp, getMousePos };
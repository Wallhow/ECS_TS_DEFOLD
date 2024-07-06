
/** @noResolution */
declare module 'debug-draw.debug-draw' {
    function box(cx:number, cy:number, w:number, h:number, color?: null | string | vmath.vector4, rot?: number):void;
    function text(text : string, x: number, y: number, color? : null | string | vmath.vector4): void;
}
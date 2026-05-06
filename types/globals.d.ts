// Tell TypeScript to allow CSS side-effect imports
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}
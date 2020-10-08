declare module '*.less' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.css' {
  const content: any;
  export default content;
}
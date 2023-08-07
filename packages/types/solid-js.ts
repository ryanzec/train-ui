declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      // solid-dnd directives
      sortable: boolean;
      droppable: boolean;

      // custom directives
      form: boolean;
      clickOutside: (() => void) | undefined;
    }
  }
}

export {};

import { clickOutsideDirective } from '$/directives/click-outside-directive';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      // custom directives
      formDirective: boolean;
      clickOutsideDirective: (() => void) | undefined;
    }
  }
}

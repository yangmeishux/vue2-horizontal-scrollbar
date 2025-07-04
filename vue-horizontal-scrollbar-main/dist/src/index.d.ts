import VueHorizontalScrollbar from './components/VueHorizontalScrollbar.vue';
import type { HorizontalScrollbarProps, HorizontalScrollbarEmits, HorizontalScrollbarExpose } from './types';
export type { HorizontalScrollbarProps, HorizontalScrollbarEmits, HorizontalScrollbarExpose };
declare const HorizontalScrollbarPlugin: {
    install(VueCtor: any): void;
};
export { VueHorizontalScrollbar, HorizontalScrollbarPlugin };
export default HorizontalScrollbarPlugin;
export declare const version = "__VERSION__";

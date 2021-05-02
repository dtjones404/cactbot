import { LocaleObject } from '../types/trigger';
declare type LocaleTextOrArray = LocaleObject<string | string[]>;
declare type HuntData = {
    [huntName: string]: {
        readonly id: string;
        readonly name: LocaleTextOrArray;
        readonly rank: string;
    };
};
declare const data: HuntData;
export default data;
//# sourceMappingURL=hunt.d.ts.map
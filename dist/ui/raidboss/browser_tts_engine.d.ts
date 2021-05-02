import { Lang } from 'types/global';
interface TTSItem {
    play: () => void;
}
declare type TTSItemDictionary = {
    [key: string]: TTSItem;
};
export default class BrowserTTSEngine {
    readonly ttsItems: TTSItemDictionary;
    readonly googleTTSLang: string;
    private engineType;
    private speechLang?;
    private speechVoice?;
    constructor(lang: Lang);
    play(text: string): void;
    playTTS(text: string): void;
    playSpeechTTS(text: string): void;
    playGoogleTTS(text: string): void;
}
export {};
//# sourceMappingURL=browser_tts_engine.d.ts.map
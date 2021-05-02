import { ResponseFunc, TargetedMatches } from '../types/trigger';
declare type TargetedResponseFunc = ResponseFunc<TargetedMatches>;
declare type StaticResponseFunc = ResponseFunc<unknown>;
declare type Severity = 'info' | 'alert' | 'alarm';
declare type SevText = 'infoText' | 'alertText' | 'alarmText';
export declare const builtInResponseStr = "cactbot-builtin-response";
export declare const triggerFunctions: string[];
export declare const triggerTextOutputFunctions: string[];
export declare const triggerOutputFunctions: string[];
export declare const severityMap: {
    [sev in Severity]: SevText;
};
declare type SingleSevToResponseFunc = (sev: Severity) => TargetedResponseFunc | StaticResponseFunc;
declare type DoubleSevToResponseFunc = (targetSev: Severity, otherSev: Severity) => TargetedResponseFunc;
declare type ResponsesMap = {
    [response: string]: SingleSevToResponseFunc | DoubleSevToResponseFunc;
};
export declare const Responses: ResponsesMap;
export {};
//# sourceMappingURL=responses.d.ts.map
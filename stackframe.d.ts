// Type definitions for StackFrame v1.0.0
// Project: https://github.com/stacktracejs/stackframe
// Definitions by: Eric Wendelin <https://www.eriwen.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export as namespace StackFrame;  // global for non-module UMD users

export = StackFrame;

declare namespace StackFrame {
    export interface StackFrameOptions {
        isConstructor?: boolean;
        isEval?: boolean;
        isNative?: boolean;
        isToplevel?: boolean;
        columnNumber?: number;
        lineNumber?: number;
        fileName?: string;
        functionName?: string;
        source?: string;
        args?: any[];
    }
}

declare class StackFrame {
    constructor(obj: StackFrame.StackFrameOptions);

    getArgs(): any[] | undefined;
    setArgs(args: any[]): void;
    getEvalOrigin(): StackFrame | undefined;
    setEvalOrigin(stackframe: StackFrame): void;
    getIsConstructor(): boolean | undefined;
    setIsConstructor(isConstructor: boolean): void;
    getIsEval(): boolean | undefined;
    setIsEval(isEval: boolean): void;
    getIsNative(): boolean | undefined;
    setIsNative(isNative: boolean): void;
    getIsToplevel(): boolean | undefined;
    setIsToplevel(isToplevel: boolean): void;
    getColumnNumber(): number | undefined;
    setColumnNumber(columnNumber: number): void;
    getLineNumber(): number | undefined;
    setLineNumber(lineNumber: number): void;
    getFileName(): string | undefined;
    setFileName(fileName: string): void;
    getFunctionName(): string | undefined;
    setFunctionName(functionName: string): void;
    getSource(): string | undefined;
    setSource(source: string): void;
    toString(): string;
}

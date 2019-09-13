/* global StackFrame: false */
describe('StackFrame', function() {
    describe('#constructor', function() {
        it('should allow empty arguments', function() {
            expect(function() {
                new StackFrame();
            }).not.toThrow();
        });

        it('throws an error given an illogical line number', function() {
            var fn = function() {
                new StackFrame({lineNumber: 'BOGUS'});
            };
            expect(fn).toThrow();
        });
    });

    describe('#setFunctionName', function() {
        var unit = new StackFrame();
        it('coerces input to String', function() {
            unit.setFunctionName('foo');
            expect(unit.getFunctionName()).toBe('foo');

            unit.setFunctionName({foo: 'bar'});
            expect(unit.getFunctionName()).toBe('[object Object]');
        });
    });

    describe('#setArgs', function() {
        var unit = new StackFrame();

        it('throws an error given anything but an Array', function() {
            expect(function() {
                unit.setArgs('BOGUS');
            }).toThrow(new TypeError('Args must be an Array'));
        });

        it('returns args that were set', function() {
            unit.setArgs(['foo', 42, {}]);
            expect(unit.getArgs()).toEqual(['foo', 42, {}]);
        });
    });

    describe('#setEvalOrigin', function() {
        var unit = new StackFrame();

        it('throws an error given a non-Object', function() {
            expect(function() {
                unit.setEvalOrigin('BOGUS');
            }).toThrow(new TypeError('Eval Origin must be an Object or StackFrame'));
        });

        it('handles given StackFrame', function() {
            unit.setEvalOrigin(new StackFrame({lineNumber: 2}));
            expect(unit.getEvalOrigin().getLineNumber()).toEqual(2);
        });

        it('handles given Object', function() {
            unit.setEvalOrigin({functionName: 'evalFn'});
            expect(unit.getEvalOrigin().getFunctionName()).toEqual('evalFn');
        });
    });

    describe('#setFileName', function() {
        var unit = new StackFrame();
        it('coerces input to String', function() {
            unit.setFileName('foo.js');
            expect(unit.getFileName()).toBe('foo.js');

            unit.setFileName({foo: 'bar.js'});
            expect(unit.getFileName()).toBe('[object Object]');
        });
    });

    describe('#setLineNumber', function() {
        var unit = new StackFrame();
        it('coerces input to Number', function() {
            unit.setLineNumber('43');
            expect(unit.getLineNumber()).toEqual(43);
        });

        it('throws an error given input that cannot be coerced', function() {
            expect(function() {
                unit.setLineNumber('BOGUS');
            }).toThrow(new TypeError('lineNumber must be a Number'));
        });
    });

    describe('#setColumnNumber', function() {
        var unit = new StackFrame();
        it('coerces input to Number', function() {
            unit.setColumnNumber('75');
            expect(unit.getColumnNumber()).toEqual(75);
        });

        it('throws an error given input that cannot be coerced', function() {
            expect(function() {
                unit.setColumnNumber('BOGUS');
            }).toThrow(new TypeError('columnNumber must be a Number'));
        });
    });

    describe('#setIsEval', function() {
        var unit = new StackFrame();
        it('coerces input to Boolean', function() {
            unit.setIsEval('true');
            expect(unit.getIsEval()).toBe(true);
        });
    });

    describe('#setIsConstructor', function() {
        var unit = new StackFrame();
        it('coerces input to Boolean', function() {
            unit.setIsConstructor(0);
            expect(unit.getIsConstructor()).toBe(false);
            expect(unit.isConstructor).toBe(false);
        });
    });

    describe('#setIsNative', function() {
        var unit = new StackFrame();
        it('coerces input to Boolean', function() {
            unit.setIsNative(undefined);
            expect(unit.getIsNative()).toBe(false);
            expect(unit.isNative).toBe(false);
        });
    });

    describe('#setIsToplevel', function() {
        var unit = new StackFrame();
        it('coerces input to Boolean', function() {
            unit.setIsToplevel(null);
            expect(unit.getIsToplevel()).toBe(false);
            expect(unit.isToplevel).toBe(false);
        });
    });

    describe('#setSource', function() {
        var unit = new StackFrame();
        it('coerces input to String', function() {
            unit.setSource(9999);
            expect(unit.getSource()).toEqual('9999');
        });
    });

    describe('#fromString', function() {
        it('converts a string into a StackFrame object', function() {
            var serializedFrame = 'fun(arg1,arg2)@http://site.com/path.js:1:4567';
            var expected = new StackFrame({
                functionName: 'fun',
                args: ['arg1', 'arg2'],
                fileName: 'http://site.com/path.js',
                lineNumber: 1,
                columnNumber: 4567
            });
            expect(StackFrame.fromString(serializedFrame)).toEqual(expected);
        });
    });

    describe('#toString', function() {
        it('represents empty StackFrame as "::"', function() {
            expect(new StackFrame().toString()).toEqual('::');
        });
        it('represents complete StackFrame same as old stacktrace.js', function() {
            var unit = new StackFrame({
                functionName: 'fun',
                args: ['arg1', 'arg2'],
                fileName: 'http://site.com/path.js',
                lineNumber: 1,
                columnNumber: 4567,
                isEval: false,
                isNative: false,
                source: 'SOURCE'
            });
            expect(unit.toString()).toEqual('fun (http://site.com/path.js:1:4567)');
        });
    });
});

/* global StackFrame: false */
/* jshint nonew: false */
describe('StackFrame', function () {
    describe('#constructor', function () {
        it('should allow empty arguments', function () {
            expect(function() { new StackFrame(); }).not.toThrow();
        });

        it('throws an error given an illogical line number', function() {
            var fn = function () {
                new StackFrame('foo', [], 'path/to/file.js', 'BOGUS');
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
            expect(function() { unit.setArgs('BOGUS'); }).toThrow(new TypeError('Args must be an Array'));
        });

        it('returns args that were set', function() {
            unit.setArgs(['foo', 42, {}]);
            expect(unit.getArgs()).toEqual(['foo', 42, {}]);
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
            expect(function() { unit.setLineNumber('BOGUS'); }).toThrow(new TypeError('Line Number must be a Number'));
        });
    });

    describe('#setColumnNumber', function() {
        var unit = new StackFrame();
        it('coerces input to Number', function() {
            unit.setColumnNumber('75');
            expect(unit.getColumnNumber()).toEqual(75);
        });

        it('throws an error given input that cannot be coerced', function() {
            expect(function() { unit.setColumnNumber('BOGUS'); }).toThrow(new TypeError('Column Number must be a Number'));
        });
    });

    describe('#setSource', function() {
        var unit = new StackFrame();
        it('coerces input to String', function() {
            unit.setSource(9999);
            expect(unit.getSource()).toEqual('9999');
        });
    });

    describe('#toString', function() {
        it('represents empty StackFrame as "{anonymous}()"', function() {
            expect(new StackFrame().toString()).toEqual('{anonymous}()');
        });
        it('represents complete StackFrame same as old stacktrace.js', function() {
            var unit = new StackFrame('fun', [1, 2], 'http://site.com/path.js', 1, 4567, 'SOURCE');
            expect(unit.toString()).toEqual('fun(1,2)@http://site.com/path.js:1:4567');
        });
    });
});

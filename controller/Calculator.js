/**
 * A calculator-class that behave, almost, exactly like the IOS one (at least in IOS14.3)
 */
export default class Calculator {

    /**
     * 
     * @param {number} maxLength | maximum length number to display
     * @param {bool} icelandicFormat | if true: instead of 50,000.43 the calculator displays 50.000,43
     */
    constructor(maxLength = 9, icelandicFormat = true) {
        this.number = "0"
        this.valueA = 0
        this.currentOperator = ""
        this.maxLength = maxLength
        this.icelandicFormat = icelandicFormat
        this.isAllClear = true

        this.operationsEnum = {
            addition: "+",
            subtraction: "-",
            multiplication: "x",
            division: "÷",
            percentage: "%",
            plusMinus: "+/-",
            equal: "=",
            allClear: "AC",
            clear: "C",
        }


        this.STATES = {
            TYPING_OPERAND: "TYPING_OPERAND",
            AWAITING_OPERAND: "AWAITING_OPERAND"
        }

        this.state = this.STATES.AWAITING_OPERAND
    }

    /**
     * 
     * @param {string} x | a number (as a string) in traditional format (i.e. 50000.43, no commas and dots for decimals)
     * @returns the number as a string in icelandic format
     */
    _toIcelandicFormat(x) {
        var parts = x.toString().split(".");//Split into decimal and integer parts. (i.e. 50.000,55 => 50.000 & 55)
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."); //Set . for each thousand (i.e. 50000 => 50.000)
        return parts.join(",");//Join formatted integer with decimal part (i.e. 50.000,55)
    }


    /**
     * 
     * @returns number as a string that is to be displayed to user
     */
    displayValue() {
        let displayNumber = (this.number).toString()
        if (displayNumber.match(/^\./)) displayNumber = "0" + displayNumber
        if (displayNumber.length > this.maxLength) {
            displayNumber = parseFloat(displayNumber).toPrecision(6).toString()
        }
        if (this.icelandicFormat) {
            return this._toIcelandicFormat(displayNumber)
        }
        return this.displayNumber
    }


    /**
     * Add number to the back of the currently displayed number
     * @param {number} number | 
     */
    addNumber(number) {
        if (this.number.length >= this.maxLength && this.state === this.STATES.TYPING_OPERAND) return

        if (this.state == this.STATES.TYPING_OPERAND) {
            this.number += number.toString()
        } else if (this.state == this.STATES.AWAITING_OPERAND) {
            if (number == "0") { return }

            this.number = number.toString()
            this.state = this.STATES.TYPING_OPERAND
        }
        this.isAllClear = false
    }

    /**
     * When user presses one of the binary-operator buttons (division, addition, multiplication and subtraction)
     * @param {string} operator | One of the binary-operators defined in operationsEnum.
     */
     addBinaryOperator(operator) {
        this.currentOperator = operator
        this.state = this.STATES.AWAITING_OPERAND
        this.valueA = parseFloat(this.number)
    }

    /**
     * 
     * @param {string} operator | One of the unary-operators defined in operationsEnum (percentage or plusMinus)
     */
    handleUnaryOperator(operator) {
        switch (operator) {
            case this.operationsEnum.percentage:
                this.number = (parseFloat(this.number) / 100).toString()
                break
            case this.operationsEnum.plusMinus:
                this.number = -this.number
                break
        }
    }

    /**
     * When user presses C/AC.
     */
    handleClear() {
        if (this.isAllClear) {
            this.state = this.STATES.AWAITING_OPERAND
            this.number = "0"
            this.valueA = 0
            this.currentOperator = ""
        } else {
            this.state = this.STATES.AWAITING_OPERAND
            this.number = "0"
            this.isAllClear = true
        }
    }

    /**
     * Turn back time for user i.e. erase the last input digit
     */
    handleBackSpace() {
        if (this.state == this.STATES.AWAITING_OPERAND) { return }

        if (this.number.length == 1) {
            this.state = this.STATES.AWAITING_OPERAND
            return this.number = "0"
        }

        this.number = this.number.substring(0, this.number.length - 1);
    }
    

    _add(a, b) { return (a + b) }
    _subtract(a, b) { return (a - b) }
    _multiply(a, b) { return (a * b) }
    _divide(a, b) { return (a / b) }

    /**
     * Handle functionality of calculator when user clicks "="
     */
    handleEquals() {
        //For the use case when user enters an operand and then presses '=' we want to stop adding to that operand
        if (this.currentOperator === "") {
            this.valueA = parseFloat(this.number)
            this.state = this.STATES.AWAITING_OPERAND
            return
        }
        var method;
        switch (this.currentOperator) {
            case this.operationsEnum.addition:
                method = this._add
                break
            case this.operationsEnum.subtraction:
                method = this._subtract
                break
            case this.operationsEnum.multiplication:
                method = this._multiply
                break
            case this.operationsEnum.division:
                method = this._divide
                break
        }

        //Swapping the order of 'this.number' and 'this.valueA' is necessary because of the way we store 
        // previous numbers for subtraction and division (Multiplication/addition are communitative (i.e. Abelian) 
        // so strictly speaking not necessary for them)
        if (this.state === this.STATES.AWAITING_OPERAND) {
            this.number = method(parseFloat(this.number), this.valueA).toString()
        } else if (this.state === this.STATES.TYPING_OPERAND) {
            var temp = parseFloat(this.number)
            this.number = method(this.valueA, parseFloat(this.number)).toString()
            this.valueA = temp
            this.state = this.STATES.AWAITING_OPERAND
        }
    }

    
}
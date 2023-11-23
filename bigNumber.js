class BigNumber{
    #intDigits = [];

    constructor(digits){
        String(digits);
        console.log(digits.length);
        for(let i = 0; i<digits.length; i++){
            this.#intDigits[i] = digits[i]
        }
    }

    print(){
        for(let i = 0; i<this.#intDigits.length; i++){
            process.stdout.write(this.#intDigits[i]);
        }
    }
}


x = new BigNumber('12358647919723496279547931972109909097294179019701970497210910');
x.print();
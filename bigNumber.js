//RootKid

class BigNumber {
    #intDigits = [];

    constructor(digits) {
        digits = String(digits);
        this.#intDigits = digits.split("").map(Number);
    }

    sum(x) {
        let c = new BigNumber(0);
        if (!(x instanceof BigNumber)) {
            return "error. Arguments should be BigNumber type";
        }

        let i = 1;
        let carry = 0;
        let n1 = x.#intDigits.length;
        let n2 = this.#intDigits.length;
        let n = Math.max(n1, n2);

        while (n > 0) {
            let m = (x.#intDigits[n1 - i] || 0) + (this.#intDigits[n2 - i] || 0) + carry;
            c.#intDigits[n-1] = m%10;
            carry = Math.floor(m / 10);
            i++;
            n--;
        }

        if (carry > 0) {
            c.#intDigits.unshift(carry);
        }
        return c;
    }


    print(){
        for(let i = 0; i<this.#intDigits.length; i++){
            process.stdout.write(String(this.#intDigits[i]));
        }
        console.log();
    }

}

const num1 = new BigNumber("332");
const num2 = new BigNumber("456");
const result = num1.sum(num2);
num1.print();
num2.print();
result.print();
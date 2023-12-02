//RootKid
class BigNumber {
    #intDigits = [];
    #sign = "+";

    constructor(digits, sign = "+") {
        digits = String(digits);
        this.#intDigits = digits.split("").map(Number);
        this.#sign = sign;
    }

    sum(x) {
        if (!(x instanceof BigNumber)) {
            return "error. Arguments should be BigNumber type";
        }
        let c = new BigNumber(0);
        if(this.#sign == "-" && x.#sign =="-"){
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
            c.#sign = "-";
        }
        else if(this.#sign == "-"){
            c = x.diff(this);
        }
        else if(x.#sign == "-"){
            c = this.diff(x);
        }
        
        else{
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
        }
        return c;
    }

    diff(x){
        let result = new BigNumber("");
        if (!(x instanceof BigNumber)) {
            return "error. Arguments should be BigNumber type";
        }
        let i = 1;
        let carry = 0;
        let n1 = x.#intDigits.length;
        let n2 = this.#intDigits.length;
        let n = Math.max(n1, n2);
        if(n2>n1){
            for(let i = n1; i<n2; i++){
                x.#intDigits.unshift(0);
                n1++;
            }
            while(n>0){
                let m = (this.#intDigits[n2 - i]) - (x.#intDigits[n1 - i]) - carry;
                if(m<0) {
                    m += 10;
                    carry = 1;
                }
                else{
                    carry = 0;
                }
                result.#intDigits.unshift(m);
                i++;
                n--;
            }
        }
        else if(n1>n2){
            for(let i = n2; i<n1; i++){
                this.#intDigits.unshift(0);
                n2++;
            }
            while(n>0){
                let m = (x.#intDigits[n1 - i] ) - (this.#intDigits[n2 - i]) - carry;
                if(m<0) {
                    m += 10;
                    carry = 1;
                }
                else{
                    carry = 0;
                }
                result.#intDigits.unshift(m);
                i++;
                n--;
            }
            result.#sign = "-";
        }
        else{
            if(this.isBiggerThan(x)){
                while(n>0){
                    let m = (this.#intDigits[n2 - i]) - (x.#intDigits[n1 - i]) - carry;
                    if(m<0) {
                        m += 10;
                        carry = 1;
                    }
                    else{
                        carry = 0;
                    }
                    result.#intDigits.unshift(m);
                    i++;
                    n--;
                }
            }
            else if(this.isSmallerThan(x)){
                while(n>0){
                    let m = (x.#intDigits[n1 - i] ) - (this.#intDigits[n2 - i]) - carry;
                    if(m<0) {
                        m += 10;
                        carry = 1;
                    }
                    else{
                        carry = 0;
                    }
                    result.#intDigits.unshift(m);
                    i++;
                    n--;
                }
                result.#sign = "-";
            }
            else if(this.isEqualTo(x)){
                result.#intDigits[0] = 0;
            }
        }

        return result;
    }

    isBiggerThan(x){
        if(this.#intDigits.length > x.#intDigits.length){
            return true;
        }
        else if(this.#intDigits.length == x.#intDigits.length){
            for(let i=0; i<this.#intDigits.length; i++) {
                if(this.#intDigits[i]>x.#intDigits[i]){
                    return true;
                }
            }
        }
        else{
            return false;
        }
        
    }
    isSmallerThan(x){
        if(this.#intDigits.length < x.#intDigits.length){
            return true;
        }
        else if(this.#intDigits.length == x.#intDigits.length){
            for(let i=0; i<this.#intDigits.length; i++) {
                if(this.#intDigits[i] < x.#intDigits[i]){
                    return true;
                }
            }
        }
        else{
            return false;
        }
    }
    isEqualTo(x){
        if(this.#intDigits.length == x.#intDigits.length){
            for(let i=0; i<this.#intDigits.length; i++) {
                if(this.#intDigits[i] != x.#intDigits[i]){
                    return false;
                }
            }
            return true;
        }
        else{
            return false;
        }
    }    


    removeZero(){
        let i = 0;
        while(this.#intDigits[i] == 0){ 
            if(this.#intDigits[i] != 0) break;   
            if(this.#intDigits.length == 1 ) break;  
            this.#intDigits.shift();
    
        }
    }

    print(){
        this.removeZero();
        process.stdout.write(this.#sign);
        for(let i = 0; i<this.#intDigits.length; i++){
            process.stdout.write(String(this.#intDigits[i]));
        }
        console.log();
    }

}

const num1 = new BigNumber("1222", "-");
const num2 = new BigNumber("1022", "-");
const result = num1.sum(num2);
num1.isEqualTo(num2);
num1.print();
num2.print();
result.print();
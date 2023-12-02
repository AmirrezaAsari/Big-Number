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

        if(this.#sign == "-" && x.#sign =="-"){
            let tmpX = x;
            let tmpThis = this;
            tmpX.#sign = "+";
            tmpThis.#sign = "+";
            result = tmpX.diff(tmpThis);
            this.#sign = "-";
            x.#sign = "-";
        }
        else if(this.#sign == "-"){
            while (n > 0) {
                let m = (x.#intDigits[n1 - i] || 0) + (this.#intDigits[n2 - i] || 0) + carry;
                result.#intDigits[n-1] = m%10;
                carry = Math.floor(m / 10);
                i++;
                n--;
            }
    
            if (carry > 0) {
                result.#intDigits.unshift(carry);
            }
            result.#sign = "-";
        }
        else if(x.#sign == "-"){

            while (n > 0) {
                let m = (x.#intDigits[n1 - i] || 0) + (this.#intDigits[n2 - i] || 0) + carry;
                result.#intDigits[n-1] = m%10;
                carry = Math.floor(m / 10);
                i++;
                n--;
            }
    
            if (carry > 0) {
                result.#intDigits.unshift(carry);
            }
            result.#sign = "+";
        }
        else{
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
        }
        

        return result;
    }

    division(x){
        let result = new BigNumber("0");
        let baghimande = new BigNumber("");
        let adder = new BigNumber("1");
        x.removeZero();
        if(x.#intDigits[0] == 0){
            result.#intDigits[0] = undefined;
            return result;
        }
        if (!(x instanceof BigNumber)) {
            return "error. Arguments should be BigNumber type";
        }

        if(this.#sign == "-" && x.#sign =="-"){
            this.#sign = "+";
            x.#sign = "+";
            baghimande = this;
            while(baghimande.isBiggerThan(x) || baghimande.isEqualTo(x)){
                baghimande = baghimande.diff(x);
                result = result.sum(adder);
            }
            this.#sign = "-";
            x.#sign = "-";
            result.#sign = "+";
        }
        else if(this.#sign == "-"){
            this.#sign = "+";
            x.#sign = "+";
            baghimande = this;
            while(baghimande.isBiggerThan(x) || baghimande.isEqualTo(x)){
                baghimande = baghimande.diff(x);
                result = result.sum(adder);
            }
            this.#sign = "-";
            result.#sign = "-";
        }
        else if(x.#sign == "-"){
            this.#sign = "+";
            x.#sign = "+";
            baghimande = this;
            while(baghimande.isBiggerThan(x) || baghimande.isEqualTo(x)){
                baghimande = baghimande.diff(x);
                result = result.sum(adder);
            }
            x.#sign = "-";
            result.#sign = "-";
        
        }
        else{
            baghimande = this;
            while(baghimande.isBiggerThan(x) || baghimande.isEqualTo(x)){
                baghimande = baghimande.diff(x);
                result = result.sum(adder);
            }
        }
        return result;

    }

    multiply(x){
        if (!(x instanceof BigNumber)) {
            return "error. Arguments should be BigNumber type";
        }  

        let counter = new BigNumber("1");
        let result = new BigNumber("");
        let xSign = "+";
        let thisSign = "+";

        if(x.#sign == "-") {
            xSign = "-";
        }
        if(this.#sign == "-") {
            thisSign = "-";
        }

        this.#sign = "+";
        x.#sign = "+";

        if(thisSign != xSign){
            while(x.#intDigits[0] != 0){
                result = result.sum(this);
                x = x.diff(counter);
                counter.removeZero();
                x.removeZero();
            }
            result.#sign = "-";
        }
        else{
            while(x.#intDigits[0] != 0){
                result = result.sum(this);
                x = x.diff(counter);
                counter.removeZero();
                x.removeZero();
            }
            result.#sign = "+";
        }
        x.#sign = xSign;
        this.#sign = thisSign;
        return result;
    }

    pow(x){
        if (!(x instanceof BigNumber)) {
            return "error. Arguments should be BigNumber type";
        }

        let counter = new BigNumber("1");
        let result = new BigNumber("1");

        let xSign = "+";
        let thisSign = "+";
        if(x.#sign == "-") {
            xSign = "-";
        }
        if(this.#sign == "-") {
            thisSign = "-";
        }

        while(x.#intDigits[0] != 0){
            result = result.multiply(this);
            x = x.diff(counter);
            counter.removeZero();
            x.removeZero();
        }
        x.#sign = xSign;
        this.#sign = thisSign;
        result.#sign = "+";

        return result;
        
    }



    isBiggerThan(x){
        if(this.#intDigits.sign == "+" && x.#intDigits.sign == "-") return true;
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
        if(x.#intDigits.sign == "+" && this.#intDigits.sign == "-") return true;
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
        if(x.#intDigits.sign != this.#intDigits.sign ) return false;
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

const num1 = new BigNumber("123456", "+");
const num2 = new BigNumber("100", "+");
const result = num1.pow(num2);
num1.isEqualTo(num2);
num1.print();
num2.print();
result.print();
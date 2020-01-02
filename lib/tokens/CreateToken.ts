import { Group } from "./Group";
import { Ternary } from "./Ternary";
import { NumberToken } from "./Number";
import { StringToken } from "./String";
import { Negation } from "./Negation";
import { Conjunction } from "./Conjunction";
import { Disjunction } from "./Disjunction";
import { SmallerThan } from "./SmallerThan";
import { SmallerEqualsThan } from "./SmallerEqualsThan";
import { GreaterEqualsThan } from "./GreaterEqualsThan";
import { GreaterThan } from "./GreaterThan";
import { EqualsTo } from "./EqualsTo";
import { NegatedEqualsTo } from "./NegatedEqualsTo";
import { Multiplication } from "./Multiplication";
import { Division } from "./Division";
import { Addition } from "./Addition";
import { Subtraction } from "./Subtraction";

export class CreateToken {
    private static tokens = [
        Negation,
        Group,
        Ternary,

        Conjunction,
        Disjunction,

        SmallerThan,
        SmallerEqualsThan,
        GreaterEqualsThan,
        GreaterThan,
        EqualsTo,
        NegatedEqualsTo,

        Multiplication,
        Division,
        Addition,
        Subtraction,

        NumberToken,
        StringToken
    ];

    static create(str: string) {
        for(let T of this.tokens) {
            if(T.is(str)) return new T(str);
        }
            
        
        throw new Error(`Unable to match expression "${str}" to token type.`);
    }
}
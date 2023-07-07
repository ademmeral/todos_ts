"use strict";
//----- Strict array rule -----
/*
let arr:[string, number, boolean];
arr = ["asd", 22, true]
arr[0] = "2"
*/
//----- Interface for a function -----
/*
interface IFunc {
  (param:number):number
}

const func:IFunc = (param) => {
  //return `${param}`   // wrong!
  return param
}
// console.log(func(55))
*/
//----- Default params -----
// const sumAll = (num1 = 2, num2:number, num3 = 8) => num1 + num2 + num3
// console.log(sumAll(undefined,4))  // we have to say undefined. null won't work!
// type or interface wont't work for default values!
//----- Spread operator with params -----
/*
const reduced = (...args: number[]):number => {
  console.log(args)
  return args.reduce((acc, curr) => acc + curr, 0)
}
*/
// console.log(reduced(1,2,3,4,5,6,7,8,9))
//----- Aliases / Type Assertions -----
/*
let num = <string | number>'';
num = 20

let anotherNum = '' as number | string
anotherNum = 30
console.log(num, anotherNum)  // both are the same

let lastNum = (10 as unknown) as string   // unknown is a special type
console.log(typeof lastNum)
lastNum = 111 // won't workd because we allowed only string types.
*/
//----- Literal Types -----
let hi = 'hello';
hi = 'hi';
hi = 'hello';
async function fetchUsers(url) {
    const data = fetch(url)
        .then(data => data.json())
        .catch(err => {
        if (err instanceof Error) {
            return err;
        }
    });
    return data;
}
const url = "https://jsonplaceholder.typicode.com/users";
fetchUsers(url).then(console.log);

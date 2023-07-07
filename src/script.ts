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

let hi: 'hello' | 'hi' = 'hello'
hi = 'hi'
hi = 'hello'
// hi = 'what is up?'    // will complain becuase we accept only two value,"hi" or "hello".

//----- The DOM -----
/*
const img1 = document.querySelector('img')     // recognises as (HTMLImageElement | null)
const img2 = document.querySelector('img')!     // recognises as (HTMLImageElement)
const img3 = document.getElementById('#img')   // recognises as (HTMLElement | null)
const img4 = <HTMLImageElement>document.getElementById('#img') // recognises as (HTMLImageElement)

img1.src    // won't work because img1 might be null
img1?.src   // will work because it has a optional chaining
img2.src   // will work because it has exclamation mark at its end

img3.src    // won't work because TS doesn't know what its type is exactly
img4.src    // works because we specified everything about its type
*/
/*
const copyr = document.getElementById('copyr') as HTMLSpanElement
const date = new Date().getFullYear()
copyr.setAttribute('datetime', `${date}`)
copyr.textContent = `${date}`
*/

//----------- CLASSES -------------
/*
class Example{
  name : string
  age : number
  job : string
  loggedIn : boolean

  constructor( name:string, age:number, job:string, loggedIn:boolean ) {
    this.name = name
    this.age = age
    this.job = job
    this.loggedIn = loggedIn
  }
}

// OR

class Sample{

  constructor( 
    public name:string,   // public, readonly, etc are called "Data/Access modifiers"
    readonly age:number, 
    public readonly job:string,         
    private loggedIn:boolean, 
    protected status:boolean // or all of them would be public. 
  ) {             
    this.name = name
    this.age = age
    this.job = job
    this.loggedIn = loggedIn
  }
}
// OR
class AClass{

  constructor( 
    public name:string,
    readonly age:number, 
    public readonly job:string,         
    private loggedIn:boolean, 
    protected status:boolean
  ) {             
  }
}
*/
// private : When you add the private modifier to a property or method, you can access that property or method within the same class. Any attempt to access private properties or methods outside the class will result in an error at compile time.

// public : The public modifier allows class properties and methods to be accessible from all locations. It's default.

// protected : The protected modifier allows properties and methods of a class to be accessible within same class and within subclasses.

// readonly : The value that was described with readonly keyword, cannot change. So, It becomes immutable.

// public readonly : The value is accessible anywhere, but cannot be changed!
/*
class BClass {
  age!:number       // also we can use ex. mark. It is the property of this class. Ex. mark means that a value  
                    // will be assigned to this variable.

  //age!:string       // throws error at the compilation time

  constructor(public name:string) {
    this.name = name
    // this.age = 55
  }
  getAge(){
    this.age = 55
    return this.age
  }
};
console.log( new BClass("john").getAge() )
*/
/*
class CClass{

  constructor( 
    public name:string,
    readonly age:number, 
    public readonly job:string,         
    private loggedIn:boolean, 
    protected status:boolean,
    public lang:string = "TypeScript"
  ) {             
  }

  get getProps(){
    return [this.name, this.age, this.job, this.loggedIn, this.status]
  }
}
// const instanceC = new CClass('John', 22, "Frontend", false, true)
// console.log(instanceC.getProps);
// console.log(instanceC.loggedIn);    // error
*/
/*
class DClass{

  constructor( 
    public name:string, 
    readonly age:number, 
    public readonly job:string,         
    private loggedIn:boolean, 
    protected status:boolean,
    public lang:string = "TypeScript"
  ) {             
  }

  get getProps(){
    return [this.name, this.age, this.job, this.loggedIn, this.status]
  }
}
class EClass extends DClass{
  constructor(
    name:string,
    age:number, 
    job:string,
    loggedIn:boolean,
    status:boolean,
    public computer:string
  ) {
    super(name, age, job, loggedIn, status)
    this.computer = computer
  }
  get printAll(){
    const outp = `${this.name} is a ${this.job} and ${this.name} is at ${this.age}, and also uses ${this.computer} to write ${this.lang}`
    return outp
  }
}

const instanceC = new EClass("Jeff", 55, "Backend",false, false, "Mac");
console.log(instanceC.printAll)
*/

//----------- INDEX SIGNATURES & KEYOF ASSERTIONS -------------
/*
interface Ifc{
  pizza : number,
  books : number,
  job : number,
}
const Obj = {
  pizza : -10,
  books : -15,
  job : 50,
}

function showCost(obj:Ifc):number {
  let sum: number = 0
  for (const key in obj) {
    sum += obj[key]       // This won't work. TS doesn't like that interface.
  }
  return sum;
}
*/
/*
interface Ifc{
  [index:string] : number,    // This is called "index signature"
}
const Obj = {
  pizza : -10,
  books : -15,
  job : 50,
}

function showCost(obj:Ifc):number {
  let sum: number = 0
  for (const key in obj) {
    sum += obj[key]       // This will work. TS likes that interface.
  }
  return sum;
}
console.log(showCost(Obj))
*/

// We can also use readonly for object literals but cannot private, protected etc. *!*
/*
interface IObj {            
  readonly pizza : number,
  books : number
}
const myObj:IObj ={
  pizza : -10,
  books : -15
}

myObj.books = -5    // It's OK
myObj.pizza = -15   // It is not allowed because we set the pizza prop as readonly
*/
/*
interface IMyObj{
  [index:string]:number     // This allows us to define extra properties with a value of number
  // pizza : string,       // Doesn't work! Everything has to have a value of number 
  pizza : number,
  // books : boolean        // Doesn't work!
  books : number,
  job: number
}

const MyObj: IMyObj = {
  pizza : -10,
  books : -5,
  job : 10,
  // gigEco : "15",     // We aren't allowed to define extra prop with string
  gigEco : 15           // but number
}
*/

// how to use keyof
/*
interface IObj {
  something: string,
  anything: number,
  everything: (number | string)[]
}

const Obj: IObj = {
  something : "something else",
  anything : 55,
  everything : ["another thing", 99]
}

function returnObj (obj: IObj) {
  let arr:(number | string)[] = [];
  for (const key_ in obj ) {
    const key = key_ as keyof IObj
    if ( obj[key].constructor.name  === 'Array') {
        arr = arr.concat(obj[key])
    } else {
      arr.concat(obj[key])
    }
  }
  return arr;
}

console.log(returnObj(Obj))
*/
/*
interface IObj {
  something: string,
  anything: number,
}

const Obj: IObj = {
  something : "something else",
  anything : 55,
}

const arr:(string | number)[] = Object.keys(Obj).map( (key) => {
  const prop = key as keyof typeof Obj
  return Obj[prop]
}) 

console.log(arr)
*/
/*
interface IObj {
  something: string,
  anything: number,
}

const Obj: IObj = {
  something : "something else",
  anything : 55,
}

function returnKey(obj:IObj, key: keyof IObj) {
  return obj[key]
} 
console.log(
  returnKey(Obj, 'something')
)
*/

//---------- GENERICS --------------
/*
function returner <G>(arg : G ) {    // This is called Generic. Thay why I gave it the "G" letter
  return arg                         // It would be any letter instead of the "G"
}

const outp = returner("Some text..." as const);
const outpu = returner(55);
const output = returner(true);
console.log( outp )
*/
/*
// const args : readonly number[] = [8, 5]   // just an example. it won't work
const args = [8, 5] as const;       // "as const" lets you create fully readonly objects
// const args: readonly [8, 5]
const angle = Math.atan2(...args);  // It would complain if "as const didn't exist"
console.log(angle);
*/
/*
function returner <G = 'Hello'>(param : G) {
  return param      // The "Hello" is a default value (fallback)
}
console.log( returner(55) )   // no error
*/
/*
function returner <GR = 'Hello', NA = 'Jane', AG = 22>(param : GR, name: NA, age: AG) {
  return `${param} ${name}. You are at ${age}`    
}
console.log( returner("Hi", 'John', 55) )   // no error
*/

/*
function returner <T extends string>(param : T) {
  return param   
}
console.log( returner(55) )   // error
*/
/*
interface IHasId{
  id : number
}

function checkId<T extends IHasId>( obj: T) {
  return obj.hasOwnProperty('id')
}

checkId( {id : 33, name : 'John'} )   // works
checkId( {name : 'John'} )   // doesn't work
*/
/*
function returnProp<T>( obj: T, key_:string) {
  const key = key_ as keyof T
  return obj[key] //.hasOwnProperty('id')
}
console.log( returnProp({name : 'John'}, 'name') )
*/
/*
class User <T>{
  private password: T
  
  constructor(value: T) {
    this.password = value
  }

  set setPassword(value: T) {
    this.password = value
  }
}

const user = new User(12345)
// console.log( user.password )     // error. It's private
*/








//---------- UTILITY TYPES --------------

//RECORD
/*
type TObj = 'salary' | 'incomes' | 'outgoings' // or expenses
type RObj = Record<TObj, number>

const Obj: RObj = {
  //example: 22_000       // Is not allowed
  salary : 22_0000,
  //incomes : "10_000"       // Is not allowed
  incomes : 10_000,
  outgoings : 50_000
}
*/
/*
type TName = "Sarah" | "Amy" | "Ashley"
type TGrade = "A" | "B" | "C" | "D" | "E"

const Obj: Record<TName, TGrade> = {
  Sarah : "B",
  Amy : "A",
  Ashley : "C"
}
*/
// OR
/*
type TName = "Sarah" | "Amy" | "Ashley"

interface IGrade{
  assign1: number,
  assign2 : number,
}
const Obj: Record<TName, IGrade> = {
  Sarah : {assign1: 22, assign2: 28},
  Amy : {assign1: 32, assign2: 38},
  Ashley : {assign1: 42, assign2: 18}
}
*/

// PARTIAL 
/* 
interface IObj{
  name : string,
  age: number,
  verified: boolean
}
const Obj = {
  name : 'John',
  age: 44,
  verified : false
}
function updateObj<IObj>(pbj: IObj, propsToUpdate:Partial<IObj>) {
  return {
    ...Obj,
    ...propsToUpdate
  }
}   // Partial allows us to pass a part or a few parts of props

console.log( updateObj(Obj, { verified: true }) );
*/

// REQUIRED
// If there is an optional type in the interface of an object, "Require" requires it as well. So, you have to pass all props in the interface.
/*
interface IObj{
  name : string,
  age: number,
  verified?: boolean      // verified is optional
}
const Obj = {
  name : 'John',
  age: 44,
  verified : false
}
function updateObj<IObj>(pbj: IObj, propsToUpdate:Required<IObj>) {
  return {
    ...Obj,
    ...propsToUpdate
  }
}   // Partial allows us to pass a part or a few parts of props

const newObj = {name: 'Amy', age: 22, verified: true }; // we have pass all the props
const updatedObj = updateObj(Obj, newObj)
console.log( updatedObj );
*/

// READONLY
/*
interface IObj{
  name : string,
  age: number,
  verified?: boolean      // verified is optional
}
const Obj = {
  name : 'John',
  age: 44,
  verified : false
}

const newObj: Readonly<IObj> = {...Obj, verified : true}

// Obj.verified = true   // This works
// newObj.verified = true   // This doesn't work, because it's readonly!
console.log(newObj)     // But we can read properties in the newObj an cannot change
*/

// PICK   // (Pick or Omit)

/*
interface IObj{
  id:number,
  name:string,
  age:number,
  verified:boolean
}

const Obj: Omit<IObj, "id" | "verified"> = {
  // id : 22,       // doesn't work becuase we omitted "id" and "verified"
  name : "john",
  age : 55,
  // verified : false   // doesn't work becuase we omitted "id" and "verified"
}

const newObj: Pick<IObj, "id" | "verified"> = {
  id : 22,       
  name : "john",      // doesn't work becuase we picked just "id" and "verified"
  verified : false
  age : 55,           // doesn't work becuase we picked just "id" and "verified"

}
*/

// EXCLUDE, EXTRACT
/*
type Grades = "A" | "B" | "C" | "D" | "U"

type LowGrade = Exclude<Grades, "U">
type HighGrades = Extract<Grades, "A" | "B">
type MidGrade = Extract<Grades, "C">
*/

// NONNULLABLE
/*
type TObj = "Something" | 99 | null | undefined
type OnesAreNotNullOrUndefined = NonNullable<TObj>
*/

// RETURNTYPE
/*
function sendData(a: number, b: number) {
  return {
      a: `${a}`,
      b: `${b}`
  }
}

// type Data = {
//   a: string,
//   b: string
// }

//OR
type Data = ReturnType<typeof sendData>

function consoleData(data:Data) {
  console.log(JSON.stringify(data));
}
let stringifyNumbers = sendData(1, 2);
consoleData(stringifyNumbers);
*/

// RETURNTYPE
/*
interface IFunc {
  word : string,
  letter: string, 
  count? : number
}

function countLetter(obj: IFunc): IFunc  {
  
  const regExp = new RegExp(`${obj.letter}`, "gi")
  const result = obj.word.match(regExp)
 return {word : obj.word, letter : obj.letter, count : result?.length || 0}
}
const result:ReturnType<typeof countLetter> = 
  countLetter({word : "falaaan fiaalanaa", letter : "x"})

console.log(result)
*/

// PARAMETERS
/*
const myFunction = (a: string, b: string) => {
  return a + b;
}

// let passArray:[string, string] = [ 'hello ', 'world' ]
// OR
type myType = Parameters<typeof myFunction>
let passArray:myType = [ 'hello ', 'world' ]

// Returns 'hello world'
const result = myFunction(...passArray);
console.log(result)
*/

// AWAITED<ReturnType <typeof fetchData>>

interface IGeo{
  lat: string,
  lng: string
}
interface IAddress{
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: IGeo
}
interface IUsers {
    id: number,
    name: string,
    username: string,
    email: string,
    address:IAddress
}

async function fetchUsers(url:string): Promise<IUsers[]> {
    const data = fetch(url)
      .then(data => data.json())
      .catch(err => {
        if (err instanceof Error) {
          return err
        }
      })
      return data
}

type TUsers = Awaited<ReturnType<typeof fetchUsers>>

const url = "https://jsonplaceholder.typicode.com/users"
fetchUsers(url).then(console.log)
//Object spread operator
const animals = {
    tiger: 23,
    lion: 5,
    monkey: 43,
    bird: 13
}

//const { tiger, ...rest } = animals;
//tiger has 23, and rest has object with lion and monkey

 function objectSpread(param1, param2, param3) {
     console.log(param1)
     console.log(param2)
     console.log(param3)
 }

 const { lion, tiger, ...rest} = animals;

 objectSpread(tiger, lion, rest);


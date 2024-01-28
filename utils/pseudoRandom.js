const
  { debug, skip } = require('./developConsole'),
  { Random } = require('random-js'),
  random = new Random();

let historyArray = [];

const checkMinus = (num) =>
{
    if (num < 0) return -num
    else return num;

};

const checkInfinity = (num, func) =>
{
  if(num === (Infinity || -Infinity)) func()
  else return;
}

const checkNull = (num, plusRandom=false) =>
{
  if(num === 0)
  {
    if(!plusRandom) return num + 1
    else return num + Math.round(Math.random()*1000);
  }
  else return num;
};

const chanceBetween = ( chance=50, funcOne, funcTwo, num=random.integer(0,100) ) =>
{
  if(num < chance) funcOne()
  else funcTwo();
};
  
const historyPseudoRandomNumber = (min, max, n, m, arr, yourArr, array, num) =>
{
  function checkArrays()
  {
    if(yourArr.length === max)
    {
      for(let el of array)
      {
        if(yourArr[num] === el)
        {
          debug(`Было найдено совпадения элементов\nСтарое число: ${num}`);
          num = pseudoRandomNumber(min, max, n, m, arr, null, null, false, true, true);
          debug(`Новое число: ${num}`);
          checkArrays();
        };
      };
    };
  };
  checkArrays();
  
  array.push(yourArr[num]);
  
  if(array.length>n)
  {
    array.shift();
    array.shift();
  };

  return num;
};

const historyRandom = (num, min=0, max=100, array, n=3, dOaF=1, pseudoRandom=false) =>
{
  let
    iMin,
    iMax;

  function check()
  {
    for(let i of array)
    {
      iMin = i-dOaF;
      iMax = i+dOaF;
      if( num===i || ( num > iMin && num < iMax ) )
      {
        debug(`Область определения от ${ `${ iMin }`.magenta } до ${ `${ iMax }`.magenta }`);
        debug(`Число: ${ `${ num }`.magenta }`);
        
        if( !pseudoRandom ) num = random.integer(min, max)
        else num = pseudoRandomNumber(min, max, n, dOaF, array, null, null, false, false, false);
        
        debug(`Новое число: ${ `${ num } `.magenta }`);
        console.log();
      };
    };
  };

  for (let {} of array) check();
  check();
  array.push( num );

  if(array.length > n)
  {
    array.shift();
    array.shift();
  };

  return num;
};

/* function pseudoRandomNumber(min=0, max=100, n=3, m=2, arr=historyArray, yourArr=null, array=null, history=true, chanceNull=true, chanceMax=true)
{

    someMin = checkMinus( checkNull( min, false )  );
    someMax = checkMinus( checkNull( max, true  )   );
    let oRNum = checkNull( Math.round( ( Math.random() * someMax ) + ( Math.random() * ( -someMax ) ) ), true ),
        tRNum = checkNull( Math.round( ( Math.random() * someMax ) + ( Math.random() * ( -someMax ) ) ), true );

    function checkEqual()
    {
        if(someMin === someMax)
        {
            someMin = 1;
            someMax = Math.random()*1000;
            checkEqual();
        };
    };
    checkEqual();

    let someNumber = Math.random(),
        string = `${someNumber}`,
        num = Number( string.slice( Math.round( string.length/2 ), Math.round( string.length/2 + `${ someMax }`.length ) ) );

    if(max > 1255121) someNumber = Math.round(oRNum * tRNum * someNumber)
    else someNumber = Math.round(oRNum * tRNum * someNumber * (10**(`${someNumber}`.length)) / num);
  
    let period = 1,
        periodMax = 10;
    
    function someFunc()
    {
      period++;
      let somePeriod = periodMax ** period;
      someNumber = Math.round( oRNum * tRNum * ( Math.random() * ( 100/somePeriod ) ) );
    };
    checkInfinity( someNumber, someFunc );

    string = `${someNumber}`;
    num = Number( string.slice( Math.round( string.length/2 ), Math.round( string.length/2 + ( `${ someMax }`.length ) ) ) );
    
    function checkMax()
    {
      if(num > someMax)
      {
        num = checkMinus( checkNull( num, true ) ) - checkMinus( checkNull ( someMax, true ) );
        checkMax();
      }
    };
    
    checkMax();
    
    num = Math.round( checkMinus(num) );
    
    if(chanceNull)
    {
        function one() 
        {
          num = num-num
        };

        function two() 
        {
            num = num
        };

        chanceBetween( 5, one, two, pseudoRandomNumber( 0, 100, n, m, arr, null, null, false, false, false ) );
    };
    
    if( chanceMax )
    {
        let minusNumber;
        function three() {
            return minusNumber = Math.round( Math.random() * 10 );
        };
        function four() {
            return minusNumber = 0;
        };
        chanceBetween( 15, three, four, pseudoRandomNumber( 0, 100, n, m, arr, null, null, false, false, false ) );

        function one_()
        {
            num=max - minusNumber;
        };
        function two_()
        {
            num=num;
        };
        chanceBetween( 5, one_, two_, pseudoRandomNumber( 0, 100, n, m, arr, null, null, false, false, false ) );
    };

    if(history) num = historyRandom(num, min, max, arr, n, m, false);
    if( yourArr && array && history ) num = historyPseudoRandomNumber(min, max, n, m, arr, yourArr, array, num);
    
    if(num === NaN || num === null || num === undefined)
    {
      num = pseudoRandomNumber(min, max, n, m, arr, null, null, false, true, true);
      num = checkMinus(num);
    };

    return num;
}; */

function pseudoRandomNumber(min=0, max=100, n=3, m=2, historyArr=historyArray, yourArr, array, history=true, chanceNull=true, chanceMax=true)
{
  let
    someMin,
    someMax;
  
  if(min === max)
  {
    if(max===0) max +=100;
    
    min = 0;
  };

  const random = Math.round(Math.random()*1000);

  if(min===0) someMin = min + 1;
  else someMin = min;
  someMax = max * random;

  const
    randomNumber = ( someMin * someMax + ((someMax - someMin) * someMax) + random**2 ) + (random * random * (someMax ** 2)),
    text = `${randomNumber}`,
    maxLength = `${max}`.length,
    minLength = `${min}`.length;

  let number = Number( text.slice( Math.round(text.length/2), Math.round(text.length/2+maxLength) ) );

  function checkMax()
  {
    if(number > max)
    {
      number = checkMinus( checkNull( number ) ) - checkMinus( checkNull ( max ) );
      if(number===0) return;
      checkMax();
    }
  };

  checkMax();

  if(chanceNull)
  {
    chanceBetween(5, function(){ number = 0 }, function(){ number = number }, pseudoRandomNumber( 0, 100, n, m, array, null, null, false, false, false ) );
  };

  if(chanceMax)
  {
    chanceBetween(5, function(){ number = max }, function(){ number = number }, pseudoRandomNumber( 0, 100, n, m, array, null, null, false, false, false ) );
  };
  
  if(history) number = historyRandom(number, min, max, historyArr, n, m, false);
  if( yourArr && array && history ) number = historyPseudoRandomNumber(min, max, n, m, historyArr, yourArr, array, number);

  return number

}

module.exports =
{
  pseudoRandomNumber,
  historyPseudoRandomNumber,
  historyRandom,
  checkMinus,
  checkInfinity,
  checkNull,
  chanceBetween,
}
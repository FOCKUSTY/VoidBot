const
  devDebug = false;

const debug = ( arr = [], dev = devDebug, isLog = false, isTrace = false, _this_ = this, isThis = false) =>
{
  let arg = arr[0]
  
  if(!Array.isArray(arr)) arg = arr
  else {
    
    console.error(arg);
    console.trace(arg);
    console.log(arr[2]);
    return;

  };
  
  try
  {
    if(devDebug || dev)
    {

      if(isLog)     console.log(arg);
      if(isTrace)   console.trace(arg);
      if(isThis)    console.log(_this_);

    }
    else console.log(arg);
  }
  catch (err)
  {
    console.log(err);
  };
};

const skip = ( value = 1 ) =>
{
  try
  {
    for (let i = 0; i < value; i++)
    {
      console.log();
    };
  }
  catch (err)
  {
    console.log();
    debug([err, true, this]);
    console.log();
  }
};

module.exports =
{
    debug,
    skip
}
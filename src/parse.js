exports.createVariable = function (context) {
  const rawContext = context.split('\n').join('')
  const breakContext = rawContext.split('=')
  const [define, value] = [breakContext[0].trim(), breakContext[1].trim()]
  const [type, name] = define.split(' ')
  const rawValue = value.trim()
  let realValue = rawValue

  switch (type) {
    case 'number':
      realValue = parseInt(realValue)
      break

    case 'string':
      realValue = realValue.toString().split('"').join('')
      break

    default:
      break
  }

  return {
    type,
    name,
    value: realValue,
    variable: {
      [name]: realValue,
    }
  }
}

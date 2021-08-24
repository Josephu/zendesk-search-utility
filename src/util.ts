function isNumber(value: string | number | boolean): boolean {
  return typeof value === 'number' && isFinite(value)
}

function isBoolean(value: string | number | boolean): boolean {
  return typeof value === 'boolean'
}

function determineType(value: string | number | boolean): string {
  if (isBoolean(value))
    return 'boolean'
  else if (isNumber(value))
    return 'number'
  else
    return 'string'
}


export {
  isNumber,
  isBoolean,
  determineType
}
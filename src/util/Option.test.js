// @flow

import Option from "./Option"

const assertSome = <T>(option: Option<T>, value: T, elseProvider: () => T) => {
  expect(option.isEmpty()).toBe(false)
  expect(option.isNotEmpty()).toBe(true)
  expect(option.getOrElse(elseProvider)).toEqual(value)
  expect(option.getOrElse(elseProvider())).toEqual(value)
  expect(option.getOrNull()).toEqual(value)
  expect(option.getOrFail(new Error('Option error'))).toEqual(value)
  expect(option.getOrFail(() => new Error('Option error'))).toEqual(value)
}

let assertNone = <T>(option: Option<T>, elseProvider: () => T) => {
  expect(option.isEmpty()).toBe(true)
  expect(option.isNotEmpty()).toBe(false)
  expect(option.getOrNull()).toBe(null)
  expect(option.getOrElse(elseProvider)).toEqual(elseProvider())
  expect(option.getOrElse(elseProvider())).toEqual(elseProvider())
  expect(() => option.getOrFail(new Error('error'))).toThrow('error')
  expect(() => option.getOrFail(() => new Error('error'))).toThrow('error')
}

const elseProvider = () => 'else value'

it('Option methods fail', () => {
  const option: Option<string> = new Option()

  expect(() => option.isEmpty()).toThrow('Not implemented method')
  expect(() => option.isNotEmpty()).toThrow('Not implemented method')
  expect(() => option.getOrElse(() => 'value')).toThrow('Not implemented method')
  expect(() => option.getOrFail(() => new Error('error'))).toThrow('Not implemented method')
  expect(() => option.getOrNull()).toThrow('Not implemented method')
  expect(() => option.map(v => 'value')).toThrow('Not implemented method')
  expect(() => option.flatMap(v => Option.none())).toThrow('Not implemented method')
  expect(() => option.filter(v => true)).toThrow('Not implemented method')
  expect(() => option.exists(v => true)).toThrow('Not implemented method')
  expect(() => option.forEach(v => {})).toThrow('Not implemented method')

})

it('create option from undefined', () => {
  assertNone(Option.option(undefined), elseProvider)
})

it('create option from null', () => {
  assertNone(Option.option(null), elseProvider)
})

it('create option with "option" method from string', () => {
  const stringValue = 'string value'

  assertSome(Option.option(stringValue), stringValue, elseProvider)
})

it('merge two "none" options', () => {
  const option = Option.merge(Option.none(), Option.none())

  assertNone(option, () => ['else value', 'other else value'])
})

it('merge "some" and "none" options', () => {
  const value = 'string value'
  const option = Option.merge(Option.some(value), Option.none())

  assertNone(option, () => ['else value', 'other else value'])
})

it('merge "none" and "some" options', () => {
  const value = 'string value'
  const option = Option.merge(Option.none(), Option.some(value))

  assertNone(option, () => ['else value', 'other else value'])
})

it('merge two "some" options', () => {
  const value = 'string value'
  const otherValue = 'other string value'
  const option = Option.merge(Option.some(value), Option.some(otherValue))

  assertSome(option, [value, otherValue], () => ['else value', 'other else value'])
})

it('map "none" option', () => {
  const mapper = jest.fn((v) => 'string ' + v)
  const option: Option<string> = Option.none().map(mapper)

  assertNone(option, elseProvider)
})

it('filter "none" option', () => {
  const predicate = jest.fn((v) => 'string ' + v)
  const option: Option<string> = Option.none()
    .filter(predicate)

  assertNone(option, elseProvider)
})

it('flatMap "none" option', () => {
  const mapper = jest.fn((v) => Option.some('string ' + v))
  const option: Option<string> = Option.none()
    .flatMap(mapper)

  assertNone(option, elseProvider)
})

it('forEach "none" option', () => {
  const predicate = jest.fn((v) => 'string ' + v)
  Option.none()
    .forEach(predicate)

  expect(predicate).not.toBeCalled()
})

it('map "some" option', () => {
  const mapper = jest.fn((v) => 'string ' + v)

  const option: Option<string> = Option.some('value')
    .map(mapper)

  expect(mapper).toBeCalled()
  assertSome(option, 'string value', elseProvider)
})

it('filter "some" option with valid predicate', () => {
  const valueString = 'value'
  const filter = jest.fn((v) => v === valueString)

  const option: Option<string> = Option.some(valueString)
    .filter(filter)

  expect(filter).toBeCalled()
  assertSome(option, valueString, elseProvider)
})

it('filter "some" option with invalid predicate', () => {
  const valueString = 'value'
  const filter = jest.fn((v) => v !== valueString)

  const option: Option<string> = Option.some(valueString)
    .filter(filter)

  expect(filter).toBeCalled()
  assertNone(option, elseProvider)
})

it('flatMap "some" option', () => {
  const mapper: (s: string) => Option<string> = jest.fn((v) => Option.some('string ' + v))

  const option: Option<string> = Option.some('value')
    .flatMap(mapper)

  expect(mapper).toBeCalled()
  assertSome(option, 'string value', elseProvider)
})

it('forEach "some" option', () => {
  const fn = jest.fn(v => expect(v).toBe('value'))

  Option.some('value')
    .forEach(fn)

  expect(fn).toBeCalled()
})

it('exists "none" option with valid predicate', () => {
  const valueString = 'value'
  const filter = jest.fn((v) => v === valueString)

  const result: boolean = Option.none()
    .exists(filter)

  expect(filter).not.toBeCalled()
  expect(result).toBe(false)
})

it('exists "some" option with valid predicate', () => {
  const valueString = 'value'
  const filter = jest.fn((v) => v === valueString)

  const result: boolean = Option.some(valueString)
    .exists(filter)

  expect(filter).toBeCalled()
  expect(result).toBe(true)
})

it('exists "some" option with invalid predicate', () => {
  const valueString = 'value'
  const filter = jest.fn((v) => v !== valueString)

  const result: boolean = Option.some(valueString)
    .exists(filter)

  expect(filter).toBeCalled()
  expect(result).toBe(false)
})
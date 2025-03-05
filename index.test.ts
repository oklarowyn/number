import { describe, expect, test } from '@jest/globals'
import convertNumberToWords, { locale } from './index'

describe('Number to words conversion', () => {
  test('Basic numbers in English', () => {
    expect(convertNumberToWords(0)).toBe('zero')
    expect(convertNumberToWords(1)).toBe('one')
    expect(convertNumberToWords(5)).toBe('five')
    expect(convertNumberToWords(10)).toBe('ten')
  })

  test('Compound numbers in English', () => {
    expect(convertNumberToWords(21)).toBe('twenty-one')
    expect(convertNumberToWords(45)).toBe('forty-five')
    expect(convertNumberToWords(99)).toBe('ninety-nine')
  })

  test('Large numbers in English', () => {
    expect(convertNumberToWords(100)).toBe('one hundred')
    expect(convertNumberToWords(101)).toBe('one hundred one')
    expect(convertNumberToWords(999)).toBe('nine hundred ninety-nine')
    expect(convertNumberToWords(1000)).toBe('one thousand')
    expect(convertNumberToWords(1000000)).toBe('one million')
  })

  test('Negative numbers in English', () => {
    expect(convertNumberToWords(-1)).toBe('minus one')
    expect(convertNumberToWords(-15)).toBe('minus fifteen')
    expect(convertNumberToWords(-100)).toBe('minus one hundred')
  })

  test('Capitalization options', () => {
    expect(convertNumberToWords(42, { capitalize: true })).toBe('Forty-two')
    expect(convertNumberToWords(100, { capitalize: true })).toBe('One hundred')
  })
})

describe('Localization tests', () => {
  test('Numbers in French', async () => {
    await locale('fr')
    expect(convertNumberToWords(1)).toBe('un')
    expect(convertNumberToWords(21)).toBe('vingt-et-un')
    expect(convertNumberToWords(42)).toBe('quarante-deux')
    expect(convertNumberToWords(100)).toBe('cent')
  })

  test('Numbers in Spanish', async () => {
    await locale('es')
    expect(convertNumberToWords(1)).toBe('uno')
    expect(convertNumberToWords(21)).toBe('veintiuno')
    expect(convertNumberToWords(42)).toBe('cuarenta y dos')
    expect(convertNumberToWords(100)).toBe('cien')
  })

  test('Language error handling', async () => {
    await locale('invalid' as any)
    expect(convertNumberToWords(42)).toBe('forty-two') // Fallback to default English
  })
})

describe('Performance tests', () => {
  test('Large number conversion', () => {
    expect(convertNumberToWords(999999999)).toBe('nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine')
  })
})
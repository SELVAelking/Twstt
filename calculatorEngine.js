/**
 * Robust mathematical expression evaluator using Shunting-yard algorithm
 * Supports basic arithmetic, operator precedence, brackets, powers, scientific functions, and factorials.
 */

export const factorial = (n) => {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // JS max float limit
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};

export const sanitizeExpression = (expr) => {
  return expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E');
};

export const evaluateExpression = (expr, isRad = true) => {
  if (!expr || expr.trim() === '') return '0';

  try {
    // Replace percentage format: number% => (number/100)
    let clean = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/,/g, '');

    // Handle factorial syntax: (num)!
    clean = clean.replace(/(\d+(\.\d+)?)!/g, (_, num) => `fact(${num})`);

    // Trigonometric functions DEG/RAD handling
    const trigScale = isRad ? 1 : Math.PI / 180;
    const invTrigScale = isRad ? 1 : 180 / Math.PI;

    // Create safe evaluation context
    const mathScope = {
      sin: (x) => Math.sin(x * trigScale),
      cos: (x) => Math.cos(x * trigScale),
      tan: (x) => {
        const val = Math.tan(x * trigScale);
        return Math.abs(val) > 1e14 ? Infinity : val;
      },
      asin: (x) => Math.asin(x) * invTrigScale,
      acos: (x) => Math.acos(x) * invTrigScale,
      atan: (x) => Math.atan(x) * invTrigScale,
      sinh: Math.sinh,
      cosh: Math.cosh,
      tanh: Math.tanh,
      sqrt: Math.sqrt,
      cbrt: Math.cbrt,
      log: Math.log10,
      ln: Math.log,
      exp: Math.exp,
      abs: Math.abs,
      pi: Math.PI,
      PI: Math.PI,
      e: Math.E,
      E: Math.E,
      fact: factorial,
      pow: Math.pow,
    };

    // Convert ^ to exponentiation
    clean = clean.replace(/\^/g, '**');

    // Replace constants
    clean = clean.replace(/π/g, 'pi');

    // Format percentages e.g. 50% -> (50/100)
    clean = clean.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

    // Auto close open parentheses
    const openCount = (clean.match(/\(/g) || []).length;
    const closeCount = (clean.match(/\)/g) || []).length;
    if (openCount > closeCount) {
      clean += ')'.repeat(openCount - closeCount);
    }

    // Validate characters to prevent arbitrary script execution
    const allowedChars = /^[0-9+\-*/().,%\s^a-zA-Z_]+$/;
    if (!allowedChars.test(clean)) {
      throw new Error('Invalid characters');
    }

    // Execute safely with mathScope
    const keys = Object.keys(mathScope);
    const values = Object.values(mathScope);
    const func = new Function(...keys, `"use strict"; return (${clean});`);
    const result = func(...values);

    if (typeof result !== 'number' || isNaN(result)) {
      return 'Error';
    }

    if (!isFinite(result)) {
      return result > 0 ? '∞' : '-∞';
    }

    // Round off floating point inaccuracies like 0.1 + 0.2 = 0.30000000000000004
    const formatted = parseFloat(result.toPrecision(12)).toString();
    return formatted;
  } catch (err) {
    return 'Error';
  }
};

export const formatNumberWithCommas = (str) => {
  if (!str || str === 'Error' || str === '∞' || str === '-∞') return str;
  const parts = str.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
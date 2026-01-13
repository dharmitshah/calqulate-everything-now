import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Hash API key for secure storage - never store plain text API keys
async function hashApiKey(apiKey: string | null): Promise<string | null> {
  if (!apiKey) return null;
  const encoder = new TextEncoder();
  const data = encoder.encode(apiKey);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Safe math expression evaluator - no eval() or Function constructor
function evaluateExpression(expr: string): number {
  // Remove whitespace
  expr = expr.replace(/\s/g, '');
  
  // Tokenize the expression
  const tokens: (number | string)[] = [];
  let i = 0;
  
  while (i < expr.length) {
    const char = expr[i];
    
    // Parse numbers (including decimals)
    if (/\d/.test(char) || (char === '.' && i + 1 < expr.length && /\d/.test(expr[i + 1]))) {
      let num = '';
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === '.')) {
        num += expr[i];
        i++;
      }
      tokens.push(parseFloat(num));
      continue;
    }
    
    // Parse operators and parentheses
    if ('+-*/()'.includes(char)) {
      tokens.push(char);
      i++;
      continue;
    }
    
    // Handle ** for exponentiation
    if (char === '*' && expr[i + 1] === '*') {
      tokens.push('**');
      i += 2;
      continue;
    }
    
    throw new Error('Invalid character: ' + char);
  }
  
  // Recursive descent parser
  let pos = 0;
  
  function parseExpression(): number {
    let left = parseTerm();
    
    while (pos < tokens.length && (tokens[pos] === '+' || tokens[pos] === '-')) {
      const op = tokens[pos];
      pos++;
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    
    return left;
  }
  
  function parseTerm(): number {
    let left = parsePower();
    
    while (pos < tokens.length && (tokens[pos] === '*' || tokens[pos] === '/')) {
      const op = tokens[pos];
      pos++;
      const right = parsePower();
      if (op === '/' && right === 0) throw new Error('Division by zero');
      left = op === '*' ? left * right : left / right;
    }
    
    return left;
  }
  
  function parsePower(): number {
    let left = parseFactor();
    
    while (pos < tokens.length && tokens[pos] === '**') {
      pos++;
      const right = parseFactor();
      left = Math.pow(left, right);
    }
    
    return left;
  }
  
  function parseFactor(): number {
    // Handle unary minus
    if (tokens[pos] === '-') {
      pos++;
      return -parseFactor();
    }
    
    // Handle unary plus
    if (tokens[pos] === '+') {
      pos++;
      return parseFactor();
    }
    
    // Handle parentheses
    if (tokens[pos] === '(') {
      pos++;
      const result = parseExpression();
      if (tokens[pos] !== ')') throw new Error('Missing closing parenthesis');
      pos++;
      return result;
    }
    
    // Handle numbers
    if (typeof tokens[pos] === 'number') {
      return tokens[pos++] as number;
    }
    
    throw new Error('Unexpected token');
  }
  
  const result = parseExpression();
  
  if (pos < tokens.length) {
    throw new Error('Unexpected token at end');
  }
  
  return result;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { expression } = await req.json();
    
    if (!expression) {
      return new Response(
        JSON.stringify({ error: 'expression is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input - only allow safe math characters
    const safePattern = /^[0-9+\-*/().%^\s]+$/;
    if (!safePattern.test(expression.replace(/sqrt/gi, ''))) {
      return new Response(
        JSON.stringify({ error: 'Invalid characters in expression' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Safe evaluation using manual parsing (no eval or Function constructor)
    let result: number;
    try {
      // Replace common math functions and operators
      let evalExpression = expression
        .replace(/sqrt\(([^)]+)\)/gi, (_, num) => Math.sqrt(parseFloat(num)).toString())
        .replace(/\^/g, '**')
        .replace(/(\d+)%/g, '($1/100)');
      
      // Parse and evaluate safely using a simple recursive descent parser
      result = evaluateExpression(evalExpression);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid mathematical expression' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isFinite(result)) {
      return new Response(
        JSON.stringify({ error: 'Result is not a finite number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = {
      expression,
      result: Math.round(result * 1000000) / 1000000
    };

    // Log API usage with hashed API key for security
    const hashedKey = await hashApiKey(req.headers.get('x-api-key'));
    await supabase.from('api_usage').insert({
      api_name: 'calculator',
      endpoint: '/api-calculator',
      request_data: { expression },
      response_data: response,
      status_code: 200,
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      api_key: hashedKey
    });

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

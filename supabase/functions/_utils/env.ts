import * as mod from 'std/assert/mod.ts'

// Throws with an assertion error if the specified environment variable is not defined
export function ensureGetEnv(key: string) {
  const value = Deno.env.get(key)
  mod.assert(value !== undefined, `Missing ${key} environment variable`)
  return value
}

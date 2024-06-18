// default import
import ms from './operations.mjs'
let s = ms(2, 3)

// individual named imports
import { mySum, myMult } from './operations.mjs'
s = mySum(2, 3)
let m = myMult(2, 3)
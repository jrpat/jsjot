////////////////////////////////////////////////////////////////////////
const D=document, E_p=Element.prototype, ET_p=EventTarget.prototype
const $=D.querySelector.bind(D), $$=D.querySelectorAll.bind(D)
E_p.$ = E_p.querySelector; E_p.$$ = E_p.querySelectorAll
ET_p.on = ET_p.addEventListener; ET_p.off = ET_p.removeEventListener
////////////////////////////////////////////////////////////////////////

const PHI = 1.618033988749894

const $main = $('#jot')
const $input = $('#input')
const $output = $('#output')


const math = Object.fromEntries(
  Object.getOwnPropertyNames(Math).map(k => [k, Math[k]]))

const esc = x => x.replaceAll('"', '\\x22')


function eval_input() {
  let __out = []
  __out.code = ($input.value || $input.placeholder)
    .split('\n')
    .map((x,i) => `try {__out[${i}] = eval("${esc(x)}")} catch {}`)
    .join('\n')
  let p = new Proxy({__out, window, eval, PHI, ...math}, {
    has(){ return true },
    get(_,k){ return _[k] },
    set(_,k,v){ _[k] = v }
  })
  with(p) { eval(__out.code) }
  $output.innerText = __out.join('\n') + '\n'
  localStorage.setItem('input', $input.value)
  $main.style.minHeight = ''
  $main.style.minHeight = $input.scrollHeight+'px'
}


////////////////////////////////////////////////////////////////////////


let eval_timer = null
let scroll_timer = null

$input.on('input', e => {
  clearTimeout(eval_timer)
  let t = (e.inputType == 'insertLineBreak') ? 1 : 250
  eval_timer = setTimeout(eval_input, t)
})

D.on('keydown', e => {
  if (e.metaKey && (e.key == 's')) {
    e.preventDefault()
    let name = prompt('Choose a file name')
    if (!name) { return }
    let a = document.createElement('a')
    a.download=name; a.target='_blank'
    a.href = encodeURI(`data:text/plain,${$input.value}`)
    a.click()
  }
})


////////////////////////////////////////////////////////////////////////


$input.value = localStorage.getItem('input')

$input.placeholder = `
// Use comments for notes

123           // lines are evaluated
a = 100       // you can set variables
b = log10(a)  // and use Math keys

// input is auto-saved in localStorage
`.trim()

eval_input()


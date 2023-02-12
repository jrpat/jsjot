////////////////////////////////////////////////////////////////////////
const D=document, E_p=Element.prototype, ET_p=EventTarget.prototype
const $=D.querySelector.bind(D), $$=D.querySelectorAll.bind(D)
E_p.$ = E_p.querySelector; E_p.$$ = E_p.querySelectorAll
ET_p.on = ET_p.addEventListener; ET_p.off = ET_p.removeEventListener
////////////////////////////////////////////////////////////////////////


const math = Object.fromEntries(
  Object.getOwnPropertyNames(Math).map(k => [k, Math[k]]))

const esc = x => x.replaceAll('"', '\\x22')


function eval_input() {
  let __out = []
  __out.code = $('#input')
    .value
    .split('\n')
    .map((x,i) => `try {__out[${i}] = eval("${esc(x)}")} catch {}`)
    .join('\n')
  let p = new Proxy({__out, window, eval, ...math}, {
    has(){ return true },
    get(_,k){ return _[k] },
    set(_,k,v){ _[k] = v }
  })
  with(p) { eval(__out.code) }
  $('#output').innerText = __out.join('\n')
  localStorage.setItem('input', $('#input').value)
}


////////////////////////////////////////////////////////////////////////


let eval_timer = null

$('#input').on('input', e => {
  clearTimeout(eval_timer)
  eval_timer = setTimeout(eval_input, 250)
})


////////////////////////////////////////////////////////////////////////


$('#input').value = localStorage.getItem('input') || `
// Use comments for notes

123           // lines are evaluated
a = 100       // you can set variables
b = log10(a)  // and use Math keys

// input is auto-saved in localStorage

// you can adjust the textarea width
// zoom if you need more lines
`.trim()

eval_input()




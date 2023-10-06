////////////////////////////////////////////////////////////////////////
const D=document, E_p=Element.prototype, ET_p=EventTarget.prototype
const LS=localStorage, LOC=location
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

const filename = LOC.hash.length ? LOC.hash : '#jot'



function eval_input() {
  let __out = []
  __out.code = ($input.value || $input.placeholder)
    .split('\n')
    .map((x,i) => x.trim() ? `try {$_ = __out[${i}] = eval("${esc(x)}")} catch {}` : '')
    .join('\n')
  let p = new Proxy({__out, window, eval, Math, PHI, UnitBezier, Ease, ...math}, {
    has(){ return true },
    get(_,k){ return _[k] },
    set(_,k,v){ _[k] = v }
  })
  with(p) { eval(__out.code) }
  $output.innerText = __out.join('\n') + '\n'
  LS.setItem(filename, $input.value)
  $input.style.height = `${$input.scrollHeight}px`
  $output.style.height = $input.style.height
}


////////////////////////////////////////////////////////////////////////


let eval_timer = null
let scroll_timer = null

$input.on('input', e => {
  clearTimeout(eval_timer)
  let t = (e.inputType == 'insertLineBreak') ? 1 : 250
  eval_timer = setTimeout(eval_input, t)
})

let pairs = {'(':')', '[':']', '{':'}', '"':'"', "'":"'"}
let closers = Object.values(pairs)
$input.on('keydown', e => {
  if (pairs.hasOwnProperty(e.key)) {
    e.preventDefault()
    let a=$input.selectionStart, z=$input.selectionEnd
    let open=e.key, close=pairs[open], sel=''+getSelection()
    document.execCommand('insertText', false, open+sel+close)
    $input.selectionStart=a+1; $input.selectionEnd=z+1
  } else if (closers.includes(e.key)) {
    if ($input.value[$input.selectionStart] == e.key) {
      e.preventDefault()
      $input.selectionStart += 1
    }
  }
})

D.on('keydown', e => {
  if (e.metaKey && e.ctrlKey && (e.key == 's')) {
    e.preventDefault()
    let a = document.createElement('a')
    a.download=filename.slice(1)+'.js'; a.target='_blank'
    a.href = encodeURI(`data:text/plain,${$input.value}`)
    a.click()
    return
  }

  if (e.metaKey && (e.key == 's')) {
    e.preventDefault()
    let name = prompt('Name this jot')
    if (name === null) { return }
    name = '#'+name
    if (LS.getItem(name) !== null) {
      if (!confirm(`Overwrite existing jot '${name}'?`)) { return }}
    LS.setItem(name, $input.value)
    LOC.hash = name; LOC.reload()
  }

  if (e.ctrlKey && (e.key == '/')) {
    LOC.hash = '?'; LOC.reload()
  }
})

window.on('hashchange', e => LOC.reload())


////////////////////////////////////////////////////////////////////////


if (filename == '#?') {
  let keys = [...Array(LS.length).keys()].map(i => LS.key(i))
  D.body.innerHTML = '<table id=all></table>'
  D.body.setAttribute('hbox', 'center')
  for (let key of keys) {
    let d = `<button onclick="LS.removeItem('${key}');LOC.reload()">×</button>`
    let o = `<a onclick="LOC.hash='${key}';LOC.reload()">${key}</a>`
    all.innerHTML += `<tr><td>${o}</td><td>${d}</td>`
  }
  D.on('keydown', e => (e.key == 'Escape') && history.back())
} else {
  $input.value = LS.getItem(filename)

  $input.placeholder = `
// Use comments for notes

123           // lines are evaluated
a = 100       // you can set variables
b = log10(a)  // and use Math keys

// input is auto-saved in localStorage
// go to /#my-file-name to name the jot
// go to /#? to see a list of named jots
  `.trim()

  eval_input()
}




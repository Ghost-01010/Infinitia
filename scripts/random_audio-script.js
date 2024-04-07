const choose = a => a[Math.floor(Math.random() * a.length)]
const speeds = [.3, .45]
const resont = [.25, .5]
const volmns = [.8,.9,1]
const options = {
  volume: choose(volmns),
  resonance: choose(resont),
  speed: choose(speeds),
  rand: 1
}

let nextSpeed = options.speed
let nextVolume = .2

const Composer = () => {

  let context, main, verb, bus, compressor

  const trigger = Object.freeze({
    trig: function() {
      let prev = 0
      let t = false
      return function(val) {
        t = prev < 0 && val >= 0
        prev = val
        return t
      }
    },
    change: function() {
      let prev = 0
      let t = false
      return function(val) {
        t = prev != val
        prev = val
        return t
      }
    },
    pulse: function(threshold) {
      let prev = 0
      let t = false
      return function(b) {
        if (b) prev++
        if (prev == threshold) {
          t = true
          prev = 0
        } else { t = false }
        return t
      }
    }
  })

  const roots = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  const melodicminor = [0, 2, 3, 5, 7, 9, 11]
  const locrian = [0, 1, 3, 5, 6, 8, 10]
  const phrygian = [0, 1, 3, 5, 7, 8, 10]
  const aeolian = [0, 2, 3, 5, 7, 8, 10]
  const dorian = [0, 2, 3, 5, 7, 9, 10]
  const ionian = [0, 2, 4, 5, 7, 9, 11]
  const mixolydian = [0, 2, 4, 5, 7, 9, 10]
  const lydian = [0, 2, 4, 6, 7, 9, 11]
  const mode = [melodicminor, locrian, phrygian, aeolian, dorian, ionian, mixolydian, lydian]
  const lowTrig = trigger.trig()
  const highTrig = trigger.trig()
  const lowChanged = trigger.change()
  const highChanged = trigger.change()
  const pulseTrig = trigger.trig()
  const pulsed = trigger.pulse(20)

  let b = Float32Array.from({length: 3}, () => Math.random()*2-1)
  let m = pickItem(b[0],0,20,mode)
  let root = pickItem(b[1],0,20,roots)
  let then = 0,
    speedAnimStart = 0,
    volAnimStart = 0,
    volAnimStarted = false,
    speedAnimStarted = false,
    animationDuration = 5000

  options.rand = lerp(b[2],-1,1,0.05,1)

  function loop(now) {
    if (now - then > expInterp(nextSpeed, 0, 1, 800, 80)) {
      compose()
      then = now
    }
    if (Math.abs(options.speed - nextSpeed) > .001) {
      if (!speedAnimStarted) {
        speedAnimStart = now
        speedAnimStarted = true
      }
      const elapsed = now - speedAnimStart
      const fraction = elapsed / animationDuration
      if (fraction < 1) {
        const val = fractInterp(nextSpeed, options.speed, fraction)
        nextSpeed = round(1e3 * val) * 1e-3
      } else {
        speedAnimStarted = false
      }
    }
    if (Math.abs(options.volume - nextVolume) > .001) {
      if (!volAnimStarted) {
        volAnimStart = now
        volAnimStarted = true
      }
      const elapsed = now - volAnimStart
      const fraction = elapsed / (animationDuration*20)
      if (fraction < 1) {
        const val = fractInterp(nextVolume, options.volume, fraction)
        nextVolume = round(1e3 * val) * 1e-3
        main.gain.value = dbamp(lerp(nextVolume, 0, 1, -60, 3))
      } else {
        volAnimStarted = false
      }
    }
    requestAnimationFrame(loop)
  }

  function compose() {
    b = Float32Array.from({ length: 24 }, () => Math.random() * 2 - 1)
    
    if (pulsed(pulseTrig(b[0]))) {
      m = pickItem(b[0], 0, 20, mode)
      root = pickItem(b[1],0,20,roots)
      options.speed = choose(speeds)

      console.table(options)
    }

    if (lowTrig(b[10])) {
      const note = pickNote(b[11], 15, 35)
      if (lowChanged(note)) {
        sine(
          midicps(note),
          pickVolume(b[12], -24, -9),
          b[13]
        )
      }
    }

    if (highTrig(b[20])) {
      const note = pickNote(b[21], 20, 40)
      if (highChanged(note)) {
        sine(
          midicps(note),
          pickVolume(b[22], -24, -9),
          b[23]
        )
      }
    }
  }

  function pickItem(v, a, b, array) {
    return array[round(lerp(v, -1, 1, a, b)) % (array.length - 1)]
  }

  function pickNote(v, a, b) {
    return deg2key(lerp(v, -1, 1, a, b), m) + root
  }

  function pickVolume(v, a, b) {
    return dbamp(lerp(v, -1, 1, a, b))
  }

  function mod(n, m) { return ((n % m) + m) % m }

  function div(a, b) { return a / b >> 0 }

  function deg2key(degree, mode) {
    const size = mode.length
    const deg = round(degree)
    return (12 * div(deg, size)) + mode[mod(deg, size)]
  }

  function fractInterp(a, b, fraction) {
    return a + fraction * (b - a);
  }

  function expInterp(x, a, b, c, d) {
    if (x <= a) {
      return c
    }
    if (x >= b) {
      return d
    }
    return Math.pow(d / c, (x - a) / (b - a)) * c
  }

  function lerp(x, a, b, c, d) {
    if (x <= a) {
      return c
    }
    if (x >= b) {
      return d
    }
    return (x - a) * (d - c) / (b - a) + c
  }

  function round(a) { return (a + (a > 0 ? 0.5 : -0.5)) << 0 }

  function midicps(a) { return 440. * Math.pow(2.0, (a - 69.0) * 0.083333333333) }

  function dbamp(a) { return Math.pow(10, a * 0.05) }

  function createReverb(context) {
    const length = 6 * context.sampleRate
    const decay = 0.8
    const buffer = context.createBuffer(2, length, context.sampleRate)
    const noiseData = [buffer.getChannelData(0), buffer.getChannelData(1)]

    const noise = Float32Array.from({ length }, () => Math.random() * 2 - 1)

    for (let i = 0; i < length; i++) {
      const k = noise[i]
      noiseData[0][i] = k * Math.pow(1 - i / length, decay)
      noiseData[1][i] = k * Math.pow(1 - i / length, decay)
    }

    const convolver = context.createConvolver()
    convolver.buffer = buffer

    return convolver
  }

  function init() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext
    context = new AudioContext({ latencyHint: 'balanced' })

    verb = createReverb(context)
    compressor = context.createDynamicsCompressor()
    main = context.createGain()
    bus = context.createGain()
    bus.connect(verb)
    verb.connect(main)
    main.connect(compressor)
    compressor.ratio.value = 12 // 12
    compressor.release.value = 0.5 // 0.25
    compressor.threshold.value = -26 // -24
    compressor.connect(context.destination)
    
    console.table(options)

    requestAnimationFrame(loop)
  }

  function sine(freq, amp, pan) {
    const HALF_PI = Math.PI * 0.5
    const vco = context.createOscillator();
    const vca = context.createGain();
    const out = context.createGain();
    const panner = context.createStereoPanner();
    panner.pan.value = pan;
    vco.frequency.value = freq;
    // xfade resonance
    out.gain.value = Math.cos(options.resonance * HALF_PI);
    bus.gain.value = Math.cos((1.0 - options.resonance) * HALF_PI);
    vco.connect(vca);
    vca.connect(panner);
    panner.connect(out);
    out.connect(main);
    panner.connect(bus);
    // env
    const now = context.currentTime;
    const attack = now + 0.01;
    const release = attack + 1.5;
    vca.gain.value = 0;
    vca.gain.setValueAtTime(vca.gain.value, now);
    vca.gain.linearRampToValueAtTime(amp, attack);
    vca.gain.exponentialRampToValueAtTime(0.001, release);
    vco.start(now);
    // gc
    vco.stop(release + 0.1);
    setTimeout(() => vco.disconnect(), 1000 * (release + 0.2));
  }

  let toggleState = 1, timerHandle;
  function toggle() {
    if (toggleState) {
      toggleState = 0
      options.volume = .2
      timerHandle = setTimeout(() => context.suspend(), 1000)
    } else {
      options.volume = choose(volmns)
      toggleState = 1
      clearTimeout(timerHandle)
      context.resume()
      console.table(options)
    }
  }

  window.addEventListener("load", () => {
    window.play.onclick = e => {
      e.target.closest('div').classList.remove('initial')
      if (!context) init()
      else toggle()
    }
  })
}

const Shader = () => {
 /*********
  * made by Matthias Hurrle (@atzedent)
  */
  let canvas, gl
  const dpr = window.devicePixelRatio

  function resize() {
    const {
      innerWidth: width,
      innerHeight: height
    } = window

    canvas.width = width * dpr
    canvas.height = height * dpr

    gl.viewport(0, 0, width * dpr, height * dpr)
  }

  window.onresize = resize

  const vertexSource = `#version 300 es
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  in vec4 position;

  void main(void) {
    gl_Position = position;
  }
  `

  const fragmentSource = `#version 300 es
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  out vec4 fragColor;

  uniform vec2 resolution;
  uniform float time;
  uniform float speed;
  uniform float rand;
  uniform float volume;

  #define R resolution
  #define T (21.*rand+.25*(3.*time+time*speed))
  #define S smoothstep
  #define PI 3.14159265

  float rnd(float a) {
    return fract(sin(rand+a*12.599)*78.233);
  }

  float curve(float t, float e) {
    t/=e;

    return mix(
      rnd(floor(t)),
      rnd(floor(t)+1.),
      pow(S(.0,1.,fract(t)),10.)
    );
  }

  void main(void) {
    vec2 uv = (gl_FragCoord.xy -.5 * R) / min(R.x, R.y);
    vec3 col = vec3(0);

    uv *= 300.;

    for (float steps=20., i=.0; i<steps; i++) {
      uv.x += (steps-i)*2e1*sin(uv.x*.1)*.2*cos(uv.y*.05)*.2;

      float
      t = 1.1*i*PI/steps+T*.2,
      x = cos(PI+t),
      y = sin(PI+t*.1);

      vec2 p = 15e1*vec2(x,y)/sin(PI*sin(uv.x*.025+curve(T*.02, .4)));
      col += 1.1*i/length(uv-p)*(cos(vec3(0,1,-1)*PI*.9+PI*i*.2)*.5+.5);
    }

    col = S(.0,1.,volume*col);

    fragColor = vec4(col, 1);
  }
  `

  function compile(shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader))
    }
  }

  let program

  function setup() {
    const vs = gl.createShader(gl.VERTEX_SHADER)
    const fs = gl.createShader(gl.FRAGMENT_SHADER)

    compile(vs, vertexSource)
    compile(fs, fragmentSource)

    program = gl.createProgram()

    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
    }
  }

  let vertices, buffer;

  function init() {
    vertices = [
      -1, -1, 1,
      -1, -1, 1,
      -1, 1, 1,
      -1, 1, 1
    ]
    buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")

    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    program.resolution = gl.getUniformLocation(program, "resolution")
    program.time = gl.getUniformLocation(program, "time")
    program.speed = gl.getUniformLocation(program, "speed")
    program.rand = gl.getUniformLocation(program, "rand")
    program.volume = gl.getUniformLocation(program, "volume")
  }

  function loop(now) {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, canvas.width, canvas.height)
    gl.uniform1f(program.time, now * 1e-3)
    gl.uniform1f(program.speed, nextSpeed)
    gl.uniform1f(program.volume, nextVolume)
    gl.uniform1f(program.rand, options.rand)
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length * 0.5)

    requestAnimationFrame(loop)
  }
  window.addEventListener("load", () => {
    canvas = document.getElementById("canvas")
    gl = canvas.getContext("webgl2")

    setup()
    init()
    resize()
    loop(0)
  })
}

Shader()
Composer()
// Silk-like animated background using WebGL
// Inspired by @react-bits/Silk
(function () {
    const canvas = document.getElementById("silk-canvas");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        console.warn("WebGL not supported, falling back to CSS background");
        return;
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    const vertexShaderSource = `
        attribute vec2 a_position;
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform float u_speed;
        uniform float u_scale;
        uniform float u_noiseIntensity;

        // Simplex-style noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                               -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                           + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                     dot(x12.zw,x12.zw)), 0.0);
            m = m*m;
            m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
            vec3 g;
            g.x = a0.x * x0.x + h.x * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / u_resolution;
            vec2 scaledUv = uv * u_scale;

            float t = u_time * u_speed * 0.01;

            // Layered noise for silk-like flow
            float n1 = snoise(scaledUv * 3.0 + vec2(t * 0.3, t * 0.2)) * u_noiseIntensity;
            float n2 = snoise(scaledUv * 5.0 - vec2(t * 0.2, t * 0.4)) * u_noiseIntensity * 0.5;
            float n3 = snoise(scaledUv * 8.0 + vec2(t * 0.15, -t * 0.1)) * u_noiseIntensity * 0.25;
            float noise = n1 + n2 + n3;

            // Silk color palette — moody purple/grey tones
            vec3 color1 = vec3(0.055, 0.067, 0.09);   // deep dark blue
            vec3 color2 = vec3(0.482, 0.455, 0.506);   // #7B7481 — main silk color
            vec3 color3 = vec3(0.22, 0.18, 0.30);      // muted purple
            vec3 color4 = vec3(0.12, 0.14, 0.22);      // dark navy

            float blend1 = smoothstep(-1.0, 1.0, noise);
            float blend2 = smoothstep(-0.5, 1.5, sin(noise * 3.14159 + t));

            vec3 col = mix(color1, color2, blend1 * 0.6);
            col = mix(col, color3, blend2 * 0.4);
            col = mix(col, color4, (1.0 - blend1) * 0.3);

            // Subtle vignette
            float vignette = 1.0 - length((uv - 0.5) * 1.2);
            vignette = smoothstep(0.0, 1.0, vignette);
            col *= 0.7 + 0.3 * vignette;

            gl_FragColor = vec4(col, 1.0);
        }
    `;

    function createShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);

    // Fullscreen quad
    const positions = new Float32Array([
        -1, -1,  1, -1,  -1, 1,
        -1,  1,  1, -1,   1, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uSpeed = gl.getUniformLocation(program, "u_speed");
    const uScale = gl.getUniformLocation(program, "u_scale");
    const uNoiseIntensity = gl.getUniformLocation(program, "u_noiseIntensity");

    // Silk config — tweak these like the React component props
    const config = {
        speed: 20,
        scale: 1.0,
        noiseIntensity: 1.5,
    };

    gl.uniform1f(uSpeed, config.speed);
    gl.uniform1f(uScale, config.scale);
    gl.uniform1f(uNoiseIntensity, config.noiseIntensity);

    function render(time) {
        gl.uniform1f(uTime, time * 0.001);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
})();

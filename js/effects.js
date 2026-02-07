// 🌈 RETRO ARCADE - EFFECTS ENGINE
// WebGL shaders and visual effects for that authentic retro feel

class RetroEffects {
    constructor() {
        this.canvas = null;
        this.gl = null;
        this.program = null;
        this.time = 0;
        this.init();
    }

    init() {
        // Create fullscreen canvas for effects
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'effects-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(this.canvas);

        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.warn('WebGL not supported, falling back to CSS effects');
            return;
        }

        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.setupShaders();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.gl) {
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    setupShaders() {
        const vertexShaderSource = `
            attribute vec2 a_position;
            varying vec2 v_texCoord;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_texCoord = a_position * 0.5 + 0.5;
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            varying vec2 v_texCoord;
            uniform float u_time;
            uniform vec2 u_resolution;

            // VHS noise
            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            // CRT scanlines
            float scanline(vec2 uv) {
                return sin(uv.y * u_resolution.y * 1.5) * 0.02;
            }

            // Film grain
            float grain(vec2 uv) {
                return random(uv * u_time) * 0.02;
            }

            // VHS tracking distortion
            float vhsDistortion(vec2 uv) {
                float distortion = sin(uv.y * 10.0 + u_time * 2.0) * 0.002;
                return distortion;
            }

            void main() {
                vec2 uv = v_texCoord;
                
                // Apply VHS distortion (reduced)
                uv.x += vhsDistortion(uv) * 0.5;
                
                // Combine effects (much more subtle)
                float effect = 0.0;
                effect += scanline(uv) * 0.5;
                effect += grain(uv) * 0.3;
                
                // VHS color shift on edges (reduced)
                float edge = abs(uv.y - 0.5) * 2.0;
                vec3 color = vec3(0.0);
                
                if (edge > 0.9) {
                    color = vec3(0.03, 0.0, 0.03); // Very subtle purple tint at edges
                }
                
                color += effect * 0.5;
                
                gl_FragColor = vec4(color, 0.08);
            }
        `;

        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);

        // Create buffer for fullscreen quad
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }

    animate() {
        if (!this.gl || !this.program) return;

        this.time += 0.016;

        this.gl.useProgram(this.program);

        // Set uniforms
        const timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
        const resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
        
        this.gl.uniform1f(timeLocation, this.time);
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

        // Draw
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(() => this.animate());
    }
}

// Chromatic aberration effect on hover
function addChromaticAberration(element) {
    element.addEventListener('mouseenter', () => {
        element.style.textShadow = '2px 0 #ff00ff, -2px 0 #00ffff';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.textShadow = 'none';
    });
}

// Glitch effect
function glitchEffect(element, duration = 100) {
    const originalText = element.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    let iterations = 0;
    const maxIterations = 10;
    
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        iterations += 1;
        
        if (iterations > maxIterations) {
            clearInterval(interval);
            element.textContent = originalText;
        }
    }, duration / maxIterations);
}

// Initialize effects when DOM is ready
if (typeof window !== 'undefined') {
    window.RetroEffects = RetroEffects;
    window.addChromaticAberration = addChromaticAberration;
    window.glitchEffect = glitchEffect;
}

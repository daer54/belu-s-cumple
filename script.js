document.addEventListener('DOMContentLoaded', () => {
    // Audio elements (declared at top for access in password gate)
    const bgMusic = document.getElementById('bgMusic');
    const audioToggle = document.getElementById('audioToggle');
    const audioText = audioToggle ? audioToggle.querySelector('span') : null;

    // Full photo names array (declared at top to be shared by intro background and main collage)
    const photoNames = [
        "02A0DBDE-EB54-4D02-9D9C-C37E8C63D0BA.JPG",
        "34119.jpg",
        "34124.jpg",
        "34127.jpg",
        "54295388605_a97763261e_o.jpg",
        "54306679736_ffb58b8a79_o.jpg",
        "54306934763_6d46953868_o.jpg",
        "8d3b08e0-ebb3-4435-9154-3650dd63f9f9.JPG",
        "IMG-20240510-WA0001.jpg",
        "IMG-20240726-WA0043.jpg",
        "IMG-20241207-WA0018.jpg",
        "IMG-20250617-WA0018.jpg",
        "IMG-20250627-WA0010.jpg",
        "IMG-20250627-WA0028.jpg",
        "IMG-20250701-WA0019.jpg",
        "IMG-20250801-WA0008.jpg",
        "IMG_0210.jpg",
        "IMG_0217.JPG",
        "IMG_0552.jpg",
        "IMG_0728.jpg",
        "IMG_0737.jpg",
        "IMG_0759.jpg",
        "IMG_0761.jpg",
        "IMG_0764.jpg",
        "IMG_0788.jpg",
        "IMG_0818.jpg",
        "IMG_0848.jpg",
        "IMG_1171.jpg",
        "IMG_1181.jpg",
        "IMG_1242.jpg",
        "IMG_1255.jpg",
        "IMG_1266.jpg",
        "IMG_1327.jpg",
        "IMG_1594.jpg",
        "IMG_1704.jpg",
        "IMG_1705.jpg",
        "IMG_1714.jpg",
        "IMG_1817.jpg",
        "IMG_1902.jpg",
        "IMG_2477.jpg",
        "IMG_2478.jpg",
        "IMG_2480.jpg",
        "IMG_2584.jpg",
        "IMG_2749.jpg",
        "IMG_2750.jpg",
        "IMG_2752.jpg",
        "IMG_2756.jpg",
        "IMG_2809.jpg",
        "IMG_2867.jpg",
        "IMG_2966.jpg",
        "IMG_2972.jpg",
        "IMG_3070.jpg",
        "IMG_3071.jpg",
        "IMG_3072.jpg",
        "IMG_3145.jpg",
        "IMG_3146.jpg",
        "IMG_3215.jpg",
        "IMG_3217.jpg",
        "IMG_3232.jpg",
        "IMG_3247.jpg",
        "IMG_3249.jpg",
        "IMG_3472.jpg",
        "IMG_3489.jpg",
        "IMG_3612.jpg",
        "IMG_3625.PNG",
        "IMG_3643.jpg",
        "IMG_4038.jpg",
        "IMG_4039.jpg",
        "IMG_7499.jpg",
        "IMG_7500.jpg",
        "IMG_7506.jpg",
        "IMG_7507.jpg",
        "IMG_7509.jpg",
        "IMG_7511.jpg",
        "IMG_7513.jpg",
        "Lo_más_real_y_humano_202606220148.jpeg",
        "Lo_más_real_y_humano_202606220150.jpeg",
        "WhatsApp Image 2026-06-21 at 23.21.26.jpeg",
        "WhatsApp Image 2026-06-21 at 23.22.42.jpeg",
        "e30b02ff-15d3-42fa-8356-f59e64b804c9.JPG"
    ];

    // ==========================================================================
    // 0. Intro 3D Loader & Password Gate
    // ==========================================================================
    const introLoader = document.getElementById('introLoader');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');

    if (introLoader) {
        // Generate a simple static background collage of 24 photos
        const bgCollage = document.createElement('div');
        bgCollage.className = 'intro-bg-collage';
        
        // Shuffle and pick 24 photos
        const shuffled = [...photoNames].sort(() => 0.5 - Math.random()).slice(0, 24);
        shuffled.forEach(name => {
            const img = document.createElement('img');
            img.src = `fotos/${name}`;
            img.alt = '';
            bgCollage.appendChild(img);
        });
        
        // Insert as first child of introLoader
        introLoader.insertBefore(bgCollage, introLoader.firstChild);
    }

    if (introLoader && passwordForm && passwordInput && errorMessage) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = passwordInput.value.trim();

            // Check if password is "Maria" (case insensitive for a smooth experience)
            if (password.toLowerCase() === 'maria') {
                errorMessage.textContent = '';
                introLoader.classList.add('fade-out');
                
                // Play music once the password page has completely faded out (800ms transition)
                setTimeout(() => {
                    if (bgMusic && bgMusic.paused) {
                        const playPromise = bgMusic.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                if (audioToggle) audioToggle.classList.add('playing');
                                if (audioText) audioText.textContent = 'Pausar';
                            }).catch(err => console.log("Audio autoplay blocked", err));
                        } else {
                            if (audioToggle) audioToggle.classList.add('playing');
                            if (audioText) audioText.textContent = 'Pausar';
                        }
                    }
                }, 800);
            } else {
                errorMessage.textContent = 'Contraseña incorrecta 💖 Inténtalo de nuevo';
                passwordForm.classList.add('shake');
                passwordInput.value = '';
                passwordInput.focus();
                
                setTimeout(() => {
                    passwordForm.classList.remove('shake');
                }, 500);
            }
        });
    }

    // ==========================================================================
    // 1. Envelope & Letter Interaction
    // ==========================================================================
    const envelope = document.getElementById('envelope');
    const envelopeHint = document.getElementById('envelopeHint');
    let isEnvelopeOpen = false;

    if (envelope) {
        const containerWrapper = envelope.closest('.envelope-container-wrapper');
        const closeLetterBtn = document.getElementById('closeLetterBtn');

        envelope.addEventListener('click', (e) => {
            // If already open, do not toggle on envelope body clicks (use X button or background to close)
            if (isEnvelopeOpen) {
                return;
            }
            
            isEnvelopeOpen = true;
            envelope.classList.add('open');
            if (containerWrapper) containerWrapper.classList.add('open');
            if (envelopeHint) {
                envelopeHint.textContent = 'Carta abierta ✨ Usa la "X" en la esquina o haz clic fuera para cerrarla';
                envelopeHint.style.color = 'var(--accent-rose)';
            }
            
            // Play all floating videos when the letter is opened
            const floatingVideos = document.querySelectorAll('.floating-videos video');
            floatingVideos.forEach(video => {
                video.play().catch(err => console.log("Video auto-play blocked or failed", err));
            });
        });

        const closeLetter = () => {
            isEnvelopeOpen = false;
            envelope.classList.remove('open');
            if (containerWrapper) containerWrapper.classList.remove('open');
            if (envelopeHint) {
                envelopeHint.textContent = 'Haz clic en el sobre para abrir tu carta ✨';
                envelopeHint.style.color = 'var(--text-muted)';
            }
            
            // Pause all floating videos when the letter is closed to save resources
            const floatingVideos = document.querySelectorAll('.floating-videos video');
            floatingVideos.forEach(video => {
                video.pause();
            });
        };

        if (closeLetterBtn) {
            closeLetterBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLetter();
            });
        }

        if (containerWrapper) {
            containerWrapper.addEventListener('click', (e) => {
                // Close only if clicking the background overlay directly, not the wrapper or videos
                if (isEnvelopeOpen && e.target === containerWrapper) {
                    closeLetter();
                }
            });
        }
    }

    // ==========================================================================
    // 2. Lightbox / Photo Expand Modal
    // ==========================================================================
    const polaroids = document.querySelectorAll('.polaroid-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox) {
        polaroids.forEach(card => {
            card.addEventListener('click', () => {
                const imgUrl = card.getAttribute('data-img');
                const captionText = card.getAttribute('data-caption');
                
                lightboxImg.src = imgUrl;
                lightboxCaption.textContent = captionText;
                lightbox.classList.add('active');
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ==========================================================================
    // 3. Audio Player Control (Playlist: musicacumple.mp3 -> musicacumple2.mp3)
    // ==========================================================================
    if (bgMusic && audioToggle) {
        // Lower volume a bit for pleasant background experience
        bgMusic.volume = 0.4;

        const playlist = ["musicacumple.mp3", "musicacumple2.mp3"];
        let currentTrackIndex = 0;

        // Play next track automatically when the current one ends
        bgMusic.addEventListener('ended', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            bgMusic.src = playlist[currentTrackIndex];
            bgMusic.volume = 0.4;
            bgMusic.play().catch(err => {
                console.log("Failed to play next track in playlist", err);
            });
        });

        audioToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                const playPromise = bgMusic.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        audioToggle.classList.add('playing');
                        if (audioText) audioText.textContent = 'Pausar';
                    }).catch(err => {
                        console.log("Audio play blocked by browser policies.", err);
                    });
                } else {
                    audioToggle.classList.add('playing');
                    if (audioText) audioText.textContent = 'Pausar';
                }
            } else {
                bgMusic.pause();
                audioToggle.classList.remove('playing');
                if (audioText) audioText.textContent = 'Música';
            }
        });
    }

    // ==========================================================================
    // 4. Confetti / Petals Floating Animation & Mouse Interaction
    // ==========================================================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = 65;

        // Mouse/Touch physics state
        const mouse = {
            x: -1000,
            y: -1000,
            vx: 0,
            vy: 0,
            lastX: -1000,
            lastY: -1000,
            active: false
        };

        // Resize Canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Update mouse position and drag velocity
        const updateMousePosition = (x, y) => {
            if (mouse.lastX === -1000) {
                mouse.lastX = x;
                mouse.lastY = y;
            }
            mouse.x = x;
            mouse.y = y;
            mouse.vx = x - mouse.lastX;
            mouse.vy = y - mouse.lastY;
            mouse.lastX = x;
            mouse.lastY = y;
            mouse.active = true;
        };

        window.addEventListener('mousemove', (e) => {
            updateMousePosition(e.clientX, e.clientY);
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.active = false;
            mouse.lastX = -1000;
            mouse.lastY = -1000;
        });

        window.addEventListener('touchend', () => {
            mouse.active = false;
            mouse.lastX = -1000;
            mouse.lastY = -1000;
        });

        // Lavender and gold color palette for floating petals & stars
        const colors = [
            'rgba(216, 180, 254, 0.65)', // Pastel lavender
            'rgba(167, 139, 250, 0.6)',  // Soft violet
            'rgba(124, 58, 237, 0.5)',   // Royal purple
            'rgba(212, 175, 55, 0.55)',  // Soft gold (luxurious contrast)
            'rgba(233, 213, 255, 0.7)',  // Lavender dream
            'rgba(192, 132, 252, 0.6)'   // Amethyst violet
        ];

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;
                this.size = Math.random() * 8 + 6;
                // Drift upwards slowly
                this.speedY = -(Math.random() * 0.8 + 0.4);
                // Sideways sway speed
                this.speedX = Math.random() * 0.8 - 0.4;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = Math.random() * 0.02 - 0.01;
                // Shape type: 0 = circle, 1 = heart, 2 = flower petal, 3 = sparkle/star
                this.type = Math.floor(Math.random() * 4);
                this.swaySpeed = Math.random() * 0.01 + 0.005;
                this.swayAngle = Math.random() * Math.PI;
            }

            update() {
                // Base movement
                this.y += this.speedY;
                this.swayAngle += this.swaySpeed;
                this.x += this.speedX + Math.sin(this.swayAngle) * 0.15;
                this.rotation += this.rotationSpeed;

                // Mouse interaction physics
                if (mouse.active) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const influenceRadius = 180;

                    if (dist < influenceRadius) {
                        const force = (influenceRadius - dist) / influenceRadius; // 1 at mouse center, 0 at boundary
                        
                        // 1. Gently repel particles away from the cursor
                        const angle = Math.atan2(dy, dx);
                        const repulsion = force * 2.5;
                        this.x += Math.cos(angle) * repulsion;
                        this.y += Math.sin(angle) * repulsion;

                        // 2. Drag particles with mouse velocity (drag gust)
                        this.x += mouse.vx * force * 0.45;
                        this.y += mouse.vy * force * 0.45;
                    }
                }

                // Reset particle if it leaves the top or sides
                if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
                    this.reset();
                    this.y = canvas.height + 20;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.fillStyle = this.color;
                ctx.beginPath();

                if (this.type === 0) {
                    // Circle
                    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (this.type === 1) {
                    // Heart
                    const size = this.size;
                    ctx.moveTo(0, -size / 4);
                    ctx.bezierCurveTo(-size / 2, -size * 0.7, -size, -size * 0.2, 0, size * 0.6);
                    ctx.bezierCurveTo(size, -size * 0.2, size / 2, -size * 0.7, 0, -size / 4);
                    ctx.fill();
                } else if (this.type === 2) {
                    // Flower Petal
                    const w = this.size;
                    const h = this.size * 1.5;
                    ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
                    ctx.fill();
                } else if (this.type === 3) {
                    // Sparkle / 4-Point Star
                    const s = this.size;
                    ctx.moveTo(0, -s);
                    ctx.quadraticCurveTo(0, 0, s, 0);
                    ctx.quadraticCurveTo(0, 0, 0, s);
                    ctx.quadraticCurveTo(0, 0, -s, 0);
                    ctx.quadraticCurveTo(0, 0, 0, -s);
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        // Initialize particles
        const init = () => {
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                const p = new Particle();
                p.y = Math.random() * canvas.height;
                particles.push(p);
            }
        };
        init();

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Slow down/decay mouse velocities every frame
            mouse.vx *= 0.85;
            mouse.vy *= 0.85;

            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };
        animate();
    }

    // ==========================================================================
    // 5. Dynamic Collage Generator
    // ==========================================================================
    const collageGrid = document.getElementById('collageGrid');
    if (collageGrid) {
        photoNames.forEach((name) => {
            const item = document.createElement('div');
            item.className = 'collage-item';
            
            // Random cute phrases for Polaroid captions
            const captions = [
                "Un momento increíble ✨", "Recuerdos felices 💖", "Risas compartidas 😊", 
                "El mejor día ☀️", "Para siempre 💫", "Instantes hermosos 🌸", 
                "¡Qué risa este día! 😂", "Belu siendo Belu 💕", "Un día único 🌟", 
                "Detalles especiales 🎀", "Contigo todo es mejor 🥰", "Amistad real 🤞", 
                "Esos momentos mágicos 🪄", "Días felices 🎈", "Pura diversión 🥳",
                "Instante favorito 📸", "Un recuerdo especial 💌", "Tesoros de la vida 💎"
            ];
            const randomCaption = captions[Math.floor(Math.random() * captions.length)];

            item.innerHTML = `
                <div class="collage-img-wrapper">
                    <img src="fotos/${name}" alt="Recuerdo Belu" loading="lazy">
                </div>
                <div class="collage-caption">${randomCaption}</div>
            `;

            // On click, open lightbox
            item.addEventListener('click', () => {
                if (lightbox && lightboxImg && lightboxCaption) {
                    lightboxImg.src = `fotos/${name}`;
                    lightboxCaption.textContent = randomCaption;
                    lightbox.classList.add('active');
                }
            });

            collageGrid.appendChild(item);
        });
    }

    // ==========================================================================
    // 6. Fullscreen Toggle on Badge Click
    // ==========================================================================
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error trying to enter fullscreen: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
    }
});

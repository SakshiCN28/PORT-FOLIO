/**
 * Amruta Malipatil - AI & DS Portfolio Logic
 * Includes: Neural Network background, interactive simulator, sentiment analysis, project management, and validations.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Navigation & Header Effects
    // ==========================================
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-xmark');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-xmark');
        });
    });

    // ==========================================
    // 2. Interactive Canvas: Neural Connections
    // ==========================================
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const maxParticles = 65;
    const connectionDist = 120;
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off boundaries
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect lines between close particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    const alpha = (1 - (dist / connectionDist)) * 0.15;
                    ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Interactive mouse lines
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const alpha = (1 - (dist / mouse.radius)) * 0.25;
                    ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // ==========================================
    // 3. Scroll Reveal & Skill Progress Fill
    // ==========================================
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const revealSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const percent = fill.getAttribute('data-percent');
                fill.style.width = percent;
                observer.unobserve(fill);
            }
        });
    };

    const skillObserver = new IntersectionObserver(revealSkills, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => skillObserver.observe(bar));


    // ==========================================
    // 4. Live Sentiment Analyzer Mockup
    // ==========================================
    const sentimentInput = document.getElementById('sentiment-input');
    const cardPositive = document.getElementById('card-positive');
    const cardNeutral = document.getElementById('card-neutral');
    const cardNegative = document.getElementById('card-negative');
    const probPositive = document.getElementById('prob-positive');
    const probNeutral = document.getElementById('prob-neutral');
    const probNegative = document.getElementById('prob-negative');

    // Basic sentiment word banks for mock heuristic classification
    const posWords = ['good', 'great', 'awesome', 'excellent', 'amazing', 'love', 'happy', 'cool', 'smart', 'outstanding', 'best', 'science', 'ml', 'ai', 'intelligent', 'beautiful'];
    const negWords = ['bad', 'fail', 'error', 'sad', 'hate', 'worst', 'poor', 'wrong', 'horrible', 'broken', 'bug', 'hard', 'ugly', 'useless', 'terrible'];

    sentimentInput.addEventListener('input', () => {
        const text = sentimentInput.value.toLowerCase().trim();
        
        if (text === '') {
            resetSentiment();
            return;
        }

        const words = text.split(/\W+/);
        let posCount = 0;
        let negCount = 0;

        words.forEach(word => {
            if (posWords.includes(word)) posCount++;
            if (negWords.includes(word)) negCount++;
        });

        // Compute simulated probabilities
        const total = posCount + negCount;
        let pScore = 0.2; // default bias values
        let nScore = 0.1;
        
        if (total > 0) {
            pScore = posCount / total;
            nScore = negCount / total;
        } else {
            // Check context for simple rules
            if (text.length > 5) {
                pScore = 0.35;
                nScore = 0.15;
            }
        }

        const rawPos = Math.round(pScore * 100);
        const rawNeg = Math.round(nScore * 100);
        const rawNeu = 100 - rawPos - rawNeg;

        // Ensure bounds
        const finalPos = Math.max(0, Math.min(100, rawPos));
        const finalNeg = Math.max(0, Math.min(100, rawNeg));
        const finalNeu = Math.max(0, Math.min(100, rawNeu));

        probPositive.textContent = `${finalPos}%`;
        probNeutral.textContent = `${finalNeu}%`;
        probNegative.textContent = `${finalNeg}%`;

        // Highlight dominant card
        cardPositive.classList.remove('active');
        cardNeutral.classList.remove('active');
        cardNegative.classList.remove('active');

        if (finalPos > finalNeu && finalPos >= finalNeg) {
            cardPositive.classList.add('active');
        } else if (finalNeg > finalNeu && finalNeg >= finalPos) {
            cardNegative.classList.add('active');
        } else {
            cardNeutral.classList.add('active');
        }
    });

    function resetSentiment() {
        probPositive.textContent = '0%';
        probNeutral.textContent = '100%';
        probNegative.textContent = '0%';
        cardPositive.classList.remove('active');
        cardNeutral.classList.add('active');
        cardNegative.classList.remove('active');
    }


    // ==========================================
    // 5. Interactive Neural Net Training Simulator
    // ==========================================
    const trainBtn = document.getElementById('train-btn');
    const networkSelect = document.getElementById('network-select');
    const lrSelect = document.getElementById('lr-select');
    const metricEpoch = document.getElementById('metric-epoch');
    const metricLoss = document.getElementById('metric-loss');
    const metricAcc = document.getElementById('metric-acc');
    const trainingLabel = document.getElementById('training-label');
    const chartCanvas = document.getElementById('chart-canvas');
    const chartCtx = chartCanvas.getContext('2d');

    let trainingInterval = null;
    let isTraining = false;
    let historyLoss = [];
    let historyValLoss = [];

    function resizeChartCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = chartCanvas.getBoundingClientRect();
        chartCanvas.width = rect.width * dpr;
        chartCanvas.height = rect.height * dpr;
        chartCtx.scale(dpr, dpr);
    }
    resizeChartCanvas();
    window.addEventListener('resize', resizeChartCanvas);

    // Draw baseline axes grid
    function drawChartGrid(width, height) {
        chartCtx.clearRect(0, 0, width, height);
        
        chartCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        chartCtx.lineWidth = 1;
        
        // Horizontal gridlines
        for (let y = 20; y < height; y += 40) {
            chartCtx.beginPath();
            chartCtx.moveTo(30, y);
            chartCtx.lineTo(width - 15, y);
            chartCtx.stroke();
        }
        
        // Vertical gridlines
        for (let x = 30; x < width; x += 50) {
            chartCtx.beginPath();
            chartCtx.moveTo(x, 10);
            chartCtx.lineTo(x, height - 20);
            chartCtx.stroke();
        }

        // Axes
        chartCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        chartCtx.beginPath();
        chartCtx.moveTo(30, 10);
        chartCtx.lineTo(30, height - 20);
        chartCtx.lineTo(width - 15, height - 20);
        chartCtx.stroke();

        // Label placeholder metrics
        chartCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        chartCtx.font = '9px monospace';
        chartCtx.fillText('Loss', 5, 15);
        chartCtx.fillText('Epochs', width - 40, height - 5);
    }

    const initialWidth = chartCanvas.width / (window.devicePixelRatio || 1);
    const initialHeight = chartCanvas.height / (window.devicePixelRatio || 1);
    drawChartGrid(initialWidth, initialHeight);

    trainBtn.addEventListener('click', () => {
        if (isTraining) {
            stopTraining();
            return;
        }
        startTraining();
    });

    function startTraining() {
        isTraining = true;
        trainBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
        trainBtn.style.background = 'linear-gradient(135deg, var(--accent) 0%, hsl(325, 85%, 45%) 100%)';
        trainingLabel.textContent = 'Training...';
        trainingLabel.style.color = 'var(--secondary)';

        let epoch = 0;
        let loss = 0.95;
        let acc = 0.23;
        historyLoss = [];
        historyValLoss = [];

        const lr = parseFloat(lrSelect.value);
        const netType = networkSelect.value;
        const totalEpochs = 100;

        // Set convergence velocity depending on hyperparameters
        const stepRate = lr * (netType === 'cnn' ? 1.4 : netType === 'dnn' ? 1.0 : 0.75);

        if (trainingInterval) clearInterval(trainingInterval);

        trainingInterval = setInterval(() => {
            epoch += 1;
            
            // Model calculation logic: simulated decay
            const decay = Math.exp(-epoch * stepRate * 0.15);
            loss = 0.8 * decay + 0.05 + (Math.random() * 0.02);
            let valLoss = 0.85 * decay + 0.08 + (Math.random() * 0.04);
            acc = (1 - loss * 0.8) * 100;
            if (acc > 98) acc = 98 + Math.random() * 1.5;

            // Save metrics to history
            historyLoss.push(loss);
            historyValLoss.push(valLoss);

            // Update UI
            metricEpoch.textContent = epoch;
            metricLoss.textContent = loss.toFixed(4);
            metricAcc.textContent = `${acc.toFixed(1)}%`;

            // Draw training graphs
            updateTrainingChart();

            if (epoch >= totalEpochs) {
                stopTraining(true);
            }
        }, 40);
    }

    function stopTraining(completed = false) {
        isTraining = false;
        clearInterval(trainingInterval);
        trainBtn.innerHTML = '<i class="fa-solid fa-play"></i> Train';
        trainBtn.style.background = 'linear-gradient(135deg, var(--primary) 0%, hsl(265, 85%, 50%) 100%)';

        if (completed) {
            trainingLabel.textContent = 'Completed';
            trainingLabel.style.color = 'hsl(142, 70%, 55%)';
        } else {
            trainingLabel.textContent = 'Interrupted';
            trainingLabel.style.color = 'var(--text-muted)';
        }
    }

    function updateTrainingChart() {
        const w = chartCanvas.width / (window.devicePixelRatio || 1);
        const h = chartCanvas.height / (window.devicePixelRatio || 1);
        
        drawChartGrid(w, h);

        const paddingLeft = 30;
        const paddingRight = 15;
        const paddingTop = 10;
        const paddingBottom = 20;

        const plotW = w - paddingLeft - paddingRight;
        const plotH = h - paddingTop - paddingBottom;

        if (historyLoss.length === 0) return;

        // Plot Training Loss in Blue
        chartCtx.strokeStyle = 'hsl(185, 90%, 45%)';
        chartCtx.lineWidth = 2;
        chartCtx.beginPath();
        for (let i = 0; i < historyLoss.length; i++) {
            const x = paddingLeft + (i / 100) * plotW;
            const y = paddingTop + plotH - (historyLoss[i] / 1.0) * plotH;
            if (i === 0) chartCtx.moveTo(x, y);
            else chartCtx.lineTo(x, y);
        }
        chartCtx.stroke();

        // Plot Validation Loss in Violet
        chartCtx.strokeStyle = 'hsl(265, 85%, 60%)';
        chartCtx.lineWidth = 1.5;
        chartCtx.setLineDash([2, 2]);
        chartCtx.beginPath();
        for (let i = 0; i < historyValLoss.length; i++) {
            const x = paddingLeft + (i / 100) * plotW;
            const y = paddingTop + plotH - (historyValLoss[i] / 1.0) * plotH;
            if (i === 0) chartCtx.moveTo(x, y);
            else chartCtx.lineTo(x, y);
        }
        chartCtx.stroke();
        chartCtx.setLineDash([]); // Reset line dash
    }


    // ==========================================
    // 6. Project Filter & Modals
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    // Trigger reflow for animation
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Project Detail Map for Modals
    const projectData = {
        'tumor-classifier': {
            title: 'Neurolink Brain Tumor Classifier',
            tags: ['Healthcare', 'PyTorch', 'Computer Vision'],
            desc: 'This project utilizes deep convolutional neural networks (CNNs) based on ResNet architectures to analyze magnetic resonance imaging scans. It is trained to perform semantic classification tasks to identify brain tumor locations and shapes. Standard preprocessing filters are implemented using NumPy and OpenCV to normalize MRI variations.',
            tech: ['Python', 'PyTorch', 'OpenCV', 'NumPy', 'Scikit-Learn'],
            code: 'https://github.com/amruta-malipatil/neurolink-mri'
        },
        'demand-forecast': {
            title: 'Predictive Demand Forecast Engine',
            tags: ['Analytics', 'Scikit-Learn', 'TS-Forecasting'],
            desc: 'Developed a robust time-series forecasting model to address supply chain storage inefficiencies. The algorithm leverages XGBoost and Prophet libraries to forecast stock requirements 30 days into the future. Incorporates data processing pipelines constructed in SQL and automated Python ETL workers.',
            tech: ['Python', 'SQL', 'XGBoost', 'Prophet', 'Pandas', 'PostgreSQL'],
            code: 'https://github.com/amruta-malipatil/demand-forecast'
        },
        'opinion-analytics': {
            title: 'SentiNet: Opinion Analytics Tool',
            tags: ['NLP', 'TensorFlow', 'Recurrent Net'],
            desc: 'Designed an advanced text-processing application that parses large feedback datasets. Using Long Short-Term Memory (LSTM) recurrent networks built on TensorFlow, SentiNet maps complex grammatical dependencies to evaluate semantic feedback vectors with a high precision matrix.',
            tech: ['Python', 'TensorFlow', 'NLTK', 'Keras', 'Flask', 'Regex'],
            code: 'https://github.com/amruta-malipatil/sentinet-nlp'
        },
        'auto-car': {
            title: 'Autonomous Navigation Car Model',
            tags: ['Reinforcement', 'Q-Learning', 'Simulation'],
            desc: 'A simulation study focusing on Reinforcement Learning (RL). The agent learns to traverse a complex maze path without collision. Constructed with a deep Q-learning algorithm that maps continuous coordinate inputs into localized direction decisions using canvas-based animation nodes.',
            tech: ['Javascript', 'HTML5 Canvas', 'Q-Learning', 'Neural Approximation'],
            code: 'https://github.com/amruta-malipatil/rl-self-driving'
        }
    };

    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDesc = document.getElementById('modal-desc');
    const modalTechList = document.getElementById('modal-tech-list');
    const modalCodeLink = document.getElementById('modal-code-link');

    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projId = link.getAttribute('data-project-id');
            const data = projectData[projId];

            if (data) {
                modalTitle.textContent = data.title;
                
                // Tags
                modalTags.innerHTML = '';
                data.tags.forEach(t => {
                    const span = document.createElement('span');
                    span.className = 'project-tag';
                    span.textContent = t;
                    modalTags.appendChild(span);
                });

                // Desc
                modalDesc.textContent = data.desc;

                // Tech stack
                modalTechList.innerHTML = '';
                data.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'project-tag';
                    span.style.color = 'var(--text-primary)';
                    span.textContent = tech;
                    modalTechList.appendChild(span);
                });

                // Code Link
                modalCodeLink.href = data.code;

                // Open Modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Modal actions
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }


    // ==========================================
    // 7. Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get fields
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();

        // Basic validations
        if (!name || !email || !subject || !message) {
            showFormFeedback('All fields are required to process the message.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormFeedback('Please provide a valid email format.', 'error');
            return;
        }

        // Simulate successful submission
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';

        setTimeout(() => {
            showFormFeedback('Pipeline connection established! Message sent successfully to Amruta Malipatil.', 'success');
            contactForm.reset();
            formSubmitBtn.disabled = false;
            formSubmitBtn.innerHTML = 'Send Pipeline Message <i class="fa-solid fa-paper-plane"></i>';
            resetSentiment();
        }, 1200);
    });

    function showFormFeedback(msg, type) {
        formFeedback.textContent = msg;
        formFeedback.className = `form-feedback ${type}`;
        
        // Hide feedback after 5 seconds if success
        if (type === 'success') {
            setTimeout(() => {
                formFeedback.className = 'form-feedback';
            }, 6000);
        }
    }
});

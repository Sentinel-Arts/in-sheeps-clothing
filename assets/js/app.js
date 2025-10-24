    // ---------- Sound System ----------
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    
    function playSound(type) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      
      if (type === 'click') {
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'select') {
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'correct') {
        // Happy ascending arpeggio
        [0, 0.08, 0.16].forEach((time, i) => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.frequency.setValueAtTime([523, 659, 784][i], now + time);
          gain2.gain.setValueAtTime(0.15, now + time);
          gain2.gain.exponentialRampToValueAtTime(0.01, now + time + 0.3);
          osc2.start(now + time);
          osc2.stop(now + time + 0.3);
        });
      } else if (type === 'wrong') {
        // Descending disappointed sound
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'complete') {
        // Victory fanfare
        [0, 0.1, 0.2, 0.3].forEach((time, i) => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.frequency.setValueAtTime([523, 659, 784, 1047][i], now + time);
          gain2.gain.setValueAtTime(0.12, now + time);
          gain2.gain.exponentialRampToValueAtTime(0.01, now + time + 0.4);
          osc2.start(now + time);
          osc2.stop(now + time + 0.4);
        });
      } else if (type === 'welcome') {
        // Warm welcoming chord - a pleasant major chord progression
        // Playing C major chord (C-E-G) followed by a gentle rise
        const frequencies = [
          [262, 330, 392],  // C major chord at start
          [294, 370, 440]   // D major chord for uplift
        ];
        
        frequencies.forEach((chord, chordIndex) => {
          chord.forEach((freq, noteIndex) => {
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.type = 'sine'; // Sine wave for warm, gentle tone
            
            const startTime = now + (chordIndex * 0.15);
            osc2.frequency.setValueAtTime(freq, startTime);
            gain2.gain.setValueAtTime(0.08, startTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
            osc2.start(startTime);
            osc2.stop(startTime + 0.5);
          });
        });
      } else if (type === 'neutral') {
        // Neutral, informative sound - two steady tones
        const notes = [440, 523]; // A, C (neutral, neither up nor down)
        notes.forEach((freq, i) => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.type = 'sine';
          
          const startTime = now + (i * 0.12);
          osc2.frequency.setValueAtTime(freq, startTime);
          gain2.gain.setValueAtTime(0.13, startTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
          osc2.start(startTime);
          osc2.stop(startTime + 0.25);
        });
      }
    }
    
    // Rank-specific completion sounds
    function playRankSound(rankName) {
      const now = audioCtx.currentTime;
      
      if (rankName === "Sheeple") {
        // Sad, descending minor melody - disappointing
        const notes = [392, 349, 330, 294]; // G, F, E, D (descending)
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          
          const startTime = now + (i * 0.2);
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.1, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
          osc.start(startTime);
          osc.stop(startTime + 0.3);
        });
        
      } else if (rankName === "Flock Fumbler") {
        // Uncertain, wobbly sound - not quite there yet
        const notes = [294, 330, 294, 349]; // D, E, D, F (uncertain pattern)
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'triangle';
          
          const startTime = now + (i * 0.15);
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.1, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
          osc.start(startTime);
          osc.stop(startTime + 0.25);
        });
        
      } else if (rankName === "Pasture Pal") {
        // Pleasant, moderate achievement - simple ascending melody
        const notes = [262, 330, 392, 523]; // C, E, G, C (major chord arpeggio)
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          
          const startTime = now + (i * 0.12);
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.12, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);
          osc.start(startTime);
          osc.stop(startTime + 0.35);
        });
        
      } else if (rankName === "Sentinel Shepherd") {
        // Strong, confident fanfare - impressive!
        const melody = [523, 659, 784, 659, 784, 1047]; // C, E, G, E, G, C
        melody.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          
          const startTime = now + (i * 0.1);
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.13, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
          osc.start(startTime);
          osc.stop(startTime + 0.4);
        });
        
      } else if (rankName === "Observant Owl") {
        // Triumphant, heroic theme - nearly perfect!
        const melody = [523, 659, 784, 1047, 1319]; // C, E, G, C, E (ascending triumph)
        melody.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          
          const startTime = now + (i * 0.09);
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.14, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.45);
          osc.start(startTime);
          osc.stop(startTime + 0.45);
        });
        
      } else if (rankName === "GOAT Guard") {
        // LEGENDARY! Epic victory fanfare with harmony
        const melody = [523, 659, 784, 1047, 1319, 1568]; // C major scale ascending
        const harmony = [262, 330, 392, 523, 659, 784];    // Lower octave harmony
        
        melody.forEach((freq, i) => {
          // Main melody
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          
          const startTime = now + (i * 0.08);
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.12, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
          osc.start(startTime);
          osc.stop(startTime + 0.5);
          
          // Harmony
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.type = 'sine';
          
          osc2.frequency.setValueAtTime(harmony[i], startTime);
          gain2.gain.setValueAtTime(0.08, startTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
          osc2.start(startTime);
          osc2.stop(startTime + 0.5);
        });
      }
    }
    
    // Resume audio context on first user interaction
    document.addEventListener('click', () => {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }, { once: true });

    // ---------- Data ----------
    const RANKS = [
      { min: 0,  name: "Sheeple",           emoji: "🐑", colorClass: "badge-0", blurb: "High risk: wolves love a sleepy flock.", completion: "Don't worry, awareness is the first step! Every security expert started somewhere.", image: "assets/images/sheeple-rank.png" },
      { min: 40, name: "Flock Fumbler",     emoji: "🌀", colorClass: "badge-1", blurb: "Inconsistent habits: needs guidance.", completion: "You're on the right track! A few more rounds will sharpen those instincts.", image: "assets/images/flock-fumbler.png" },
      { min: 55, name: "Pasture Pal",       emoji: "🌿", colorClass: "badge-2", blurb: "Getting there: keep practicing.", completion: "Solid awareness! You're building strong security habits.", image: "assets/images/pasture-pal.png" },
      { min: 70, name: "Sentinel Shepherd", emoji: "🐕", colorClass: "badge-3", blurb: "Strong instincts: nice work.", completion: "Excellent instincts! You're a model for security awareness.", image: "assets/images/Shepherd Sentinel.png" },
      { min: 85, name: "Observant Owl",     emoji: "🦉", colorClass: "badge-4", blurb: "Elite awareness: nearly flawless.", completion: "Outstanding! You're a security awareness champion.", image: "assets/images/observant-owl.png" },
      { min: 100, name: "GOAT Guard",       emoji: "🐐", colorClass: "badge-4", blurb: "Perfect score: legendary status!", completion: "Flawless! You've achieved the ultimate rank in security awareness!", image: "assets/images/goat-gaurd.png" }
    ];

    const DAYS = [
    {
     title: "Day 1",
      image: "assets/images/day1.png",
      scenario: "You've just started at Flockly. After a long commute to work, you get out of the car and walk towards the designated security kiosk. Nick, the company security guard, recognizes you from when you interviewed, and lets you walk in.\n\nWhat's the most appropriate immediate reaction to this situation?",
      options: [
       { label: "This is a nice gesture, no harm done! Nick recognized you from your interview and probably knows HR's onboarding list. You're already liked here!", delta:-20, tone:"bad", msg:"Even friendly gestures can create security gaps. Everyone must follow proper badge-in procedures, regardless of familiarity." },
       { label: "Smile, say thank you, and make a mental note to get your badge from IT later. No need to cause a scene or trouble with Nick.", delta:-15, tone:"bad", msg:"While avoiding confrontation seems polite, security protocols exist for everyone's protection. Address it immediately, not later." },
       { label: "Politely explain to Nick that you would like him to follow company procedures.", delta:+20, tone:"good", msg:"Excellent! Enforcing security protocols politely and immediately is the right approach. This protects both you and the company." },
       { label: "After being onboarded, explain to your manager what happened, let them escalate this situation with the appropriate security team.", delta:+10, tone:"neutral", msg:"Good instinct to report it, but it's better to address security issues immediately rather than waiting. Speak up in the moment when possible." }
      ]
      },
      {
     title: "Day 2",
     image: "assets/images/day2.png",
     scenario: "It’s your second day at Flockly. After a long day of training yesterday, you finally get to sit down at your new desk, everything looks perfectly prepared. A printed card lists your name, email address, and a temporary password.\n\nNext to it, a sticky note from 'IT' reads: “Hey there! You’re all set up, just log in to your workstation.” — IT Team\n\nCharles, your desk neighbor, glances over and says: “Yeah, they did the same thing for me last month, no big deal.” You pause for a moment. Should you really log in with credentials left out in the open?",
     options: [
      { 
        label: "IT probably set this up for everyone, just log in and get started.", 
        delta: -15, 
        tone: "bad", 
        msg: "Never assume convenience means safety. Visible credentials are a serious security lapse, someone could have copied or tampered with them."
      },
      { 
        label: "Leaving login info out in the open, even for convenience, isn’t secure. Pause, contact IT to confirm, and request a password reset before logging in.", 
        delta: +20, 
        tone: "good", 
        msg: "Excellent! Credentials should never be left visible. Always verify directly with IT and reset the password through secure channels."
      },
      { 
        label: "Login, then see if you are prompted for a credential reset. If not, request IT to reset it for you.", 
        delta: +5, 
        tone: "neutral", 
        msg: "Good instinct to change the password, but logging in first exposes you before verification. Always confirm legitimacy *before* using provided credentials."
      },
      { 
        label: "If everyone else logs in this way, it’s probably fine, IT knows what they’re doing.", 
        delta: -20, 
        tone: "bad", 
        msg: "‘Everyone does it’ is a dangerous mindset. Bad habits can spread fast, even trusted routines can violate security policy."
      },
      { 
        label: "It’s a fast-moving startup, maybe IT just does things differently here.", 
        delta: -10, 
        tone: "bad", 
        msg: "Speed and innovation should never come at the cost of security. No company culture justifies unsafe credential handling."
      }
    ]
        },
        {
  title: "Day 3",
    image: "assets/images/day3.png",
    scenario: "It's lunchtime. Karl, a software engineer, invites you to a café nearby.\n\nYou bring your laptop to finish setting up your account for Flockly's ERP system. You connect to the café Wi-Fi and start logging into your work email. Karl, explains the technical details of how Flockly developed their proprietary ERP application.\n\nHow shall you proceed?",
    options: [
      {
        label: "Keep typing, everything’s encrypted these days, so there’s really no harm. It's nice to know how internal tools work.",
        delta: -5,
        tone: "bad",
        msg: "Encryption helps, but security isn’t just about networks anymore. You’re exposing your login screen, device, and internal tools in a public place—valuable intel for anyone nearby."
      },
      {
        label: "Angle your screen for privacy and finish the login quickly. Quickly wrap up the conversation, we do not want eavesdroppers listening.",
        delta: +5,
        tone: "neutral",
        msg: "Better than ignoring it, but you’re still performing sensitive actions in a public setting and possibly revealing company details."
      },
      {
        label: "Pause the login, disconnect from the café Wi-Fi, and finish setup later on a trusted network or via a company provided VPN. Avoid discussing internal tools in public.",
        delta: +20,
        tone: "good",
        msg: "Exactly right! Even with encryption, public spaces carry visual and contextual risks. Finish account setup in private and keep internal systems talk discreet."
      },
      {
        label: "Ask Karl more about the application he worked on, you want to build a good working relationship after all.",
        delta: -20,
        tone: "bad",
        msg: "Discussing internal platforms in public reveals information an eavesdropper could use for social engineering or phishing. Save that chat for the office."
      }
    ]
        },
        {
    title: "Day 4",
    image: "assets/images/day4.png",
    scenario: "Charles asks: “I’m stepping out to grab coffee, could you watch my workstation for a minute?” After he leaves, you notice his screen is unlocked and displaying internal project data.\n\nWhat should you do?",
    options: [
      { 
        label: "Discreetly lock Charles's screen without viewing or touching any documents, then remind him privately later so he can learn from it.", 
        delta: +20, 
        tone: "good", 
        msg: "Perfect response, you protected sensitive data immediately, maintained professionalism, and reinforced good security behavior respectfully."
      },
      { 
        label: "Leave it alone, you were only asked to watch it, do not touch anything. No one wants to work with someone who is annoying.", 
        delta: -15, 
        tone: "bad", 
        msg: "Doing nothing leaves sensitive information exposed. Security awareness means taking small protective actions, even when it’s not your responsibility."
      },
      { 
        label: "Quickly glance away from the screen and wait until Charles returns, then remind him later to lock it next time.", 
        delta: 0, 
        tone: "neutral", 
        msg: "You avoided viewing the data, which is good, but you didn’t prevent the exposure while it was happening."
      },
      { 
        label: "Report the incident to IT or your manager immediately as a potential policy breach.", 
        delta: -10, 
        tone: "bad", 
        msg: "Escalating shows awareness, but this is better handled directly and discreetly with your coworker first unless the behavior repeats."
      }
    ]
        },
  {
    title: "Day 5",
    image: "assets/images/day5.png",
    scenario: "It’s your fifth day at Flockly, and you’re on your first touch base meeting with Greg, your manager. He asks, “Hey, could you share your screen so we can look at your dashboard setup?”\n\nYour desktop includes a folder labeled 'Candidate Feedback (Confidential).'\n\nWhat do you do next?",
    options: [
      { 
        label: "Quickly review what’s on screen, close anything that might be sensitive, and then share your dashboard.", 
        delta: +20, 
        tone: "good", 
        msg: "Excellent. Awareness and professionalism can coexist. Checking first shows care without slowing down the meeting."
      },
      { 
        label: "Refuse to share and explain that you’re uncomfortable showing any files marked 'Confidential.'", 
        delta: -10, 
        tone: "bad", 
        msg: "That’s overly rigid. It’s fine to double check what’s visible, but total refusal slows collaboration and undermines trust."
      },
      { 
        label: "Share your entire screen immediately, you don't want to seem difficult, especially in your first meeting.",
        delta: -20, 
        tone: "bad", 
        msg: "Following others’ assurances is risky. 'Everyone does it' isn’t a security standard."
      },
      { 
        label: "Pretend your connection froze to avoid sharing until you can clean up your desktop later.", 
        delta: -15, 
        tone: "bad", 
        msg: "Avoidance isn’t professionalism. Awareness means managing risk confidently, not dodging participation."
      }
    ]
}
    ];

    const DAY_LABELS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

    // ---------- State ----------
    let state = loadState();

    // ---------- Local Storage ----------
    function saveState() {
      const stateToSave = {
        idx: state.idx,
        score: state.score,
        chosen: state.chosen,
        done: state.done,
        results: state.results
      };
      localStorage.setItem('sheepsClothingState', JSON.stringify(stateToSave));
    }

    function loadState() {
      const saved = localStorage.getItem('sheepsClothingState');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return { idx: 0, score: 0, chosen: {}, done: {}, results: {} };
        }
      }
      return { idx: 0, score: 0, chosen: {}, done: {}, results: {} };
    }

    function clearState() {
      localStorage.removeItem('sheepsClothingState');
    }

    // ---------- Helpers ----------
    const $ = s => document.querySelector(s);
    const make = (t, a = {}) => Object.assign(document.createElement(t), a);
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    function rankFor(score) {
      let cur = RANKS[0];
      for (const r of RANKS) {
        if (score >= r.min) cur = r;
        else break;
      }
      return cur;
    }

    function updateScore() {
      const score = clamp(state.score, 0, 100);
      
      $('#scoreDisplay').textContent = Math.round(score);
      
      const progressFill = $('#progressFill');
      progressFill.style.width = score + '%';
      
      // Update progress bar color based on score
      progressFill.className = 'progress-fill';
      if (score < 40) {
        progressFill.classList.add('red');
      } else if (score < 70) {
        progressFill.classList.add('yellow');
      } else {
        progressFill.classList.add('green');
      }
    }

    function renderDays() {
      const list = $('#daysList');
      list.innerHTML = '';
      
      for (let i = 0; i < 5; i++) {
        const day = make('div', { className: 'day-item', textContent: DAY_LABELS[i] });
        
        // Mark as active if current day
        if (i === state.idx) day.classList.add('active');
        
        // Mark as done if completed
        if (state.done[i]) {
          day.classList.add('done');
          // Mark as wrong if answer was incorrect, neutral if neutral
          if (state.results[i] === 'bad') {
            day.classList.add('wrong');
          } else if (state.results[i] === 'neutral') {
            day.classList.add('neutral');
          }
        }
        
        // Lock future days (days after the first unanswered day)
        const firstUnanswered = Object.keys(state.done).length;
        if (i > firstUnanswered) {
          day.classList.add('locked');
        }
        
        day.addEventListener('click', () => {
          // Only allow navigation to completed days or current day
          if (!day.classList.contains('locked')) {
            state.idx = i;
            renderAll();
          }
        });
        list.appendChild(day);
      }
    }

    function renderQuiz() {
      const content = $('#quizContent');
      content.innerHTML = '';
      
      if (state.idx >= DAYS.length) {
        // Completion screen
        const rank = rankFor(state.score);
        playRankSound(rank.name); // Play rank-specific sound
        const wrap = make('div', { className: 'completion' });
        
        // Add rank-specific image
        const imageContainer = make('div', { className: 'completion-image' });
        const img = make('img', { 
          src: rank.image,
          alt: `${rank.name} achievement`,
          loading: 'lazy'
        });
        imageContainer.appendChild(img);
        
        const badge = make('div', { className: 'rank-badge completion-badge ' + rank.colorClass });
        badge.innerHTML = `${rank.emoji} ${rank.name}`;
        
        const desc = make('div', { style: 'color:var(--muted); font-weight:600; max-width: 500px; margin: 0 auto; font-size: 16px;', textContent: rank.completion });
        
        const again = make('button', { className: 'btn' });
        again.classList.add(rank.colorClass);
        again.textContent = 'Play again';
        again.addEventListener('click', restart);
        
        const demoNotice = make('div', { 
          className: 'demo-notice ' + rank.colorClass,
          textContent: 'Baa-rilliant 🐑! Thank you for playing this demo. Additional weeks will be available in the full release, where you can unmask the wolf 🐺 amongst the flock!'
        });

        const surveyLink = make('a', {
          href: 'https://tally.so/r/n02rWN',
          target: '_blank',
          textContent: 'Please share your feedback!',
          style: 'margin-top: 16px; color: var(--accent); text-decoration: underline; cursor: pointer; font-weight: 600;'
        });

        
        wrap.append(imageContainer, badge, desc, again, demoNotice, surveyLink);
        content.appendChild(wrap);
        return;
      }
      
      const day = DAYS[state.idx];
      
      const label = make('div', { className: 'day-label', textContent: `WEEK 1 • ${day.title.toUpperCase()}` });
      
      // Add scenario image
      const imageContainer = make('div', { className: 'scenario-image' });
      const img = make('img', { 
        src: day.image,
        alt: `${day.title} scenario illustration`,
        loading: 'lazy'
      });
      imageContainer.appendChild(img);
      
      const scenario = make('p', { className: 'scenario', textContent: day.scenario });
      
      const opts = make('div', { className: 'options' });
      let selected = state.chosen[state.idx] ?? null;
      const isCompleted = state.done[state.idx];
      
      day.options.forEach((o, i) => {
        const opt = make('div', { className: 'option' });
        if (selected === i) opt.classList.add('selected');
        
        // If question is completed and this was the chosen answer, show if it was correct or wrong
        if (isCompleted && selected === i) {
          if (o.tone === 'bad') {
            opt.classList.add('wrong');
          } else if (o.tone === 'good') {
            opt.classList.add('correct');
          } else if (o.tone === 'neutral') {
            opt.classList.add('neutral');
          }
        }
        
        const icon = make('div', { className: 'option-icon' });
        const label = make('div', { className: 'option-label', textContent: o.label });
        
        opt.append(icon, label);
        
        // Only allow selection if not completed
        if (!isCompleted) {
          opt.addEventListener('click', () => {
            playSound('select');
            selectOption(i, opts, confirm);
          });
        } else {
          // Disable interaction for completed questions
          opt.style.cursor = 'default';
        }
        
        opts.appendChild(opt);
      });
      
      const confirmArea = make('div', { className: 'confirm-area' });
      const confirm = make('button', { className: 'confirm-btn', textContent: 'Confirm' });
      
      // Only show confirm button if question hasn't been answered yet
      if (!isCompleted) {
        if (selected !== null) confirm.classList.add('ready');
        
        confirm.addEventListener('click', () => {
          if (selected === null) return;
          playSound('click');
          applyChoice(day.options[selected]);
        });
        
        confirmArea.appendChild(confirm);
      } else {
        // If viewing a completed day that's not the current day, show return button
        const firstUnanswered = Object.keys(state.done).length;
        if (state.idx < firstUnanswered) {
          const returnBtn = make('button', { className: 'confirm-btn ready', textContent: 'Return to Current Day' });
          returnBtn.addEventListener('click', () => {
            playSound('click');
            state.idx = firstUnanswered;
            renderAll();
          });
          confirmArea.appendChild(returnBtn);
        }
      }
      
      content.append(label, imageContainer, scenario, opts, confirmArea);
      
      function selectOption(i, optsContainer, btn) {
        selected = i;
        state.chosen[state.idx] = i;
        [...optsContainer.children].forEach((n, j) => {
          n.classList.toggle('selected', j === i);
        });
        btn.classList.add('ready');
      }
    }

    function applyChoice(choice) {
      const prevRank = rankFor(state.score).name;
      state.score = clamp(state.score + choice.delta, 0, 100);
      state.done[state.idx] = true;
      state.results[state.idx] = choice.tone; // Store whether answer was good or bad
      
      // Save state to localStorage
      saveState();
      
      // Play appropriate sound
      if (choice.tone === 'good') {
        playSound('correct');
      } else if (choice.tone === 'neutral') {
        playSound('neutral');  // Distinct neutral sound
      } else {
        playSound('wrong');
      }
      
      updateScore();
      renderDays();
      renderQuiz(); // Re-render to show color feedback immediately
      
      const newRank = rankFor(state.score).name;
      
      // Wait a moment before showing modal so user can see the color change
      setTimeout(() => {
        const badge = $('#modalBadge');
        
        // Handle three cases: good, neutral, bad
        if (choice.tone === 'good') {
          badge.textContent = '✓ Great choice';
          badge.className = 'modal-badge good';
        } else if (choice.tone === 'neutral') {
          badge.textContent = 'RESULT';  // No symbol for neutral
          badge.className = 'modal-badge neutral';  // Teal color
        } else {
          badge.textContent = '✗ Result';
          badge.className = 'modal-badge bad';
        }
        
        $('#modalTitle').textContent = (choice.delta > 0 ? '+' : '') + choice.delta + ' points';
        $('#modalMsg').textContent = choice.msg;
        //$('#rankChange').textContent = (newRank !== prevRank) ? `Rank: ${prevRank} → ${newRank}` : '';
        
        $('#resultDialog').showModal();
      }, 800);
    }

    function restart() {
      clearState();
      localStorage.removeItem('isc-intro-seen');
      state = { idx: 0, score: 0, chosen: {}, done: {}, results: {} };
      renderAll();
      $('#introDialog').showModal();
    }

    function renderAll() {
      updateScore();
      renderDays();
      renderQuiz();
      // Scroll to top after rendering
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }, 10);
    }

    function showToast(msg) {
      const toast = make('div', { className: 'toast', textContent: msg });
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    }

    // ---------- Event Listeners ----------
    $('#restartBtn').addEventListener('click', () => {
      playSound('click');
      restart();
    });
    
    $('#shareBtn').addEventListener('click', () => {
      playSound('click');
      const rank = rankFor(state.score);
      const msg = `I scored ${Math.round(state.score)}/100 on "In Sheep's Clothing" 🐑\nRank: ${rank.emoji} ${rank.name}\n\nTest your social-engineering awareness!`;
      
      if (navigator.share) {
        navigator.share({ text: msg }).catch(() => {});
      } else {
        navigator.clipboard.writeText(msg).then(() => {
          showToast('Score copied to clipboard!');
        });
      }
    });
    
    $('#continueBtn').addEventListener('click', () => {
      playSound('click');
      $('#resultDialog').close();
      if (state.idx < DAYS.length - 1) {
        state.idx++;
      } else {
        state.idx = DAYS.length;
      }
      saveState();
      renderAll();
    });
    
    $('#startGameBtn').addEventListener('click', () => {
      playSound('welcome');
      $('#introDialog').close();
      localStorage.setItem('isc-intro-seen', 'true');
    });

    // ---------- Initialize ----------
    renderAll();
    
    // Show intro modal on first visit
    const hasSeenIntro = localStorage.getItem('isc-intro-seen');
    if (!hasSeenIntro) {
      $('#introDialog').showModal();
    }

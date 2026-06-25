/**
 * Password Strength Analyzer
 * Professional implementation for real-time password security analysis.
 */

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Application Configuration
     */
    const CONFIG = {
        generator: {
            length: 16,
            charsets: {
                upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                lower: 'abcdefghijklmnopqrstuvwxyz',
                number: '0123456789',
                special: '!@#$%^&*(),.?":{}|<>'
            }
        },
        rules: [
            {
                id: 'length',
                test: (pwd) => pwd.length >= 8,
                message: 'Make the password at least 8 characters long.',
                elementId: 'crit-length'
            },
            {
                id: 'upper',
                test: (pwd) => /[A-Z]/.test(pwd),
                message: 'Add at least one uppercase letter.',
                elementId: 'crit-upper'
            },
            {
                id: 'lower',
                test: (pwd) => /[a-z]/.test(pwd),
                message: 'Add at least one lowercase letter.',
                elementId: 'crit-lower'
            },
            {
                id: 'number',
                test: (pwd) => /[0-9]/.test(pwd),
                message: 'Include at least one number.',
                elementId: 'crit-number'
            },
            {
                id: 'special',
                test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
                message: 'Use a special character (e.g. !, @, #, $).',
                elementId: 'crit-special'
            }
        ]
    };

    /**
     * PasswordAnalyzer Module
     * Handles the logic and UI synchronization for the analyzer.
     */
    const PasswordAnalyzer = {
        elements: {
            passwordInput: document.getElementById('password-input'),
            toggleBtn: document.getElementById('toggle-password'),
            strengthBar: document.getElementById('strength-bar'),
            strengthText: document.getElementById('strength-text'),
            scoreVal: document.querySelector('.score-val'),
            suggestionsBox: document.getElementById('suggestions'),
            suggestionText: document.getElementById('suggestion-text'),
            scanLine: document.getElementById('scan-line'),
            shieldSvg: document.querySelector('.shield-svg'),
            generateBtn: document.getElementById('generate-btn'),
            copyBtn: document.getElementById('copy-btn')
        },

        /**
S        * Initialize the application
         */
        init() {
            this.attachEventListeners();
        },

        /**
         * Setup event listeners for all interactive elements
         */
        attachEventListeners() {
            const { passwordInput, toggleBtn, generateBtn, copyBtn } = this.elements;

            passwordInput.addEventListener('input', () => {
                this.triggerScan();
                this.analyze();
            });

            toggleBtn.addEventListener('click', () => this.toggleVisibility());
            generateBtn.addEventListener('click', () => this.handleGenerate());
            copyBtn.addEventListener('click', () => this.handleCopy());
        },

        /**
         * Toggles visibility of the password input
         */
        toggleVisibility() {
            const { passwordInput, toggleBtn } = this.elements;
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            toggleBtn.textContent = isPassword ? '🙈' : '👁️';
        },

        /**
         * Triggers the visual scan line animation
         */
        triggerScan() {
            const { scanLine } = this.elements;
            scanLine.classList.add('scanning');
            setTimeout(() => scanLine.classList.remove('scanning'), 1500);
        },

        /**
         * Main analysis logic: evaluates password against rules and updates UI
         */
        analyze() {
            const password = this.elements.passwordInput.value;
            let score = 0;
            const suggestions = [];

            // Evaluate each rule from config
            CONFIG.rules.forEach(rule => {
                const isValid = rule.test(password);
                const element = document.getElementById(rule.elementId);

                if (isValid) {
                    score++;
                    element?.classList.add('valid');
                } else {
                    element?.classList.remove('valid');
                    if (password.length > 0) {
                        suggestions.push(rule.message);
                    }
                }
            });

            this.updateUI(score, password.length, suggestions);
        },

        /**
         * Updates all visual components based on the analysis score
         * @param {number} score - Number of rules passed (0-5)
         * @param {number} length - Length of the password
         * @param {string[]} suggestions - List of improvement messages
         */
        updateUI(score, length, suggestions) {
            const { strengthBar, strengthText, scoreVal, suggestionsBox, suggestionText, shieldSvg } = this.elements;

            let strength = 'IDLE';
            let colorClass = '';
            let statusClass = '';
            let shieldClass = '';
            let width = '0%';
            let numericScore = score * 20;

            if (length === 0) {
                strength = 'IDLE';
                numericScore = 0;
            } else if (score <= 2) {
                strength = 'WEAK';
                colorClass = 'weak';
                statusClass = 'status-weak';
                shieldClass = 'shield-weak';
                width = '33%';
            } else if (score <= 4) {
                strength = 'MEDIUM';
                colorClass = 'medium';
                statusClass = 'status-medium';
                shieldClass = 'shield-medium';
                width = '66%';
            } else {
                strength = 'STRONG';
                colorClass = 'strong';
                statusClass = 'status-strong';
                shieldClass = 'shield-strong';
                width = '100%';
            }

            // Update progress bar and status
            strengthBar.className = `strength-bar ${colorClass}`;
            strengthBar.style.width = width;
            strengthText.innerHTML = `Status: <span class="${statusClass}">${strength}</span>`;
            scoreVal.textContent = numericScore;

            // Update security shield
            shieldSvg.className = `shield-svg ${shieldClass}`;

            // Update suggestions terminal
            if (suggestions.length > 0 && length > 0) {
                suggestionsBox.style.display = 'block';
                suggestionText.textContent = '> SYSTEM_LOG: ' + suggestions.join(' ');
            } else {
                suggestionsBox.style.display = 'none';
            }
        },

        /**
         * Generates a secure random password based on CONFIG
         * @returns {string} The generated password
         */
        generateSecurePassword() {
            const { length, charsets } = CONFIG.generator;
            const password = [];

            // Ensure at least one of each required character type
            Object.values(charsets).forEach(chars => {
                password.push(chars[Math.floor(Math.random() * chars.length)]);
            });

            // Fill remaining length with a random mix
            const allChars = Object.values(charsets).join('');
            for (let i = password.length; i < length; i++) {
                password.push(allChars[Math.floor(Math.random() * allChars.length)]);
            }

            // Shuffle to prevent predictable pattern
            return password.sort(() => Math.random() - 0.5).join('');
        },

        /**
         * Handler for the Generate button
         */
        handleGenerate() {
            const newPassword = this.generateSecurePassword();
            this.elements.passwordInput.value = newPassword;
            this.triggerScan();
            this.analyze();
        },

        /**
         * Handler for the Copy button
         */
        async handleCopy() {
            const pwd = this.elements.passwordInput.value;
            if (!pwd) {
                this.showNotification('Please enter a password first!');
                return;
            }

            try {
                await navigator.clipboard.writeText(pwd);
                this.showNotification('Password copied successfully!');
            } catch (err) {
                console.error('Clipboard error:', err);
                this.showNotification('Copy failed. Please copy manually.');
            }
        },

        /**
         * Displays a temporary neon notification toast
         * @param {string} message - The text to display
         */
        showNotification(message) {
            const toast = document.createElement('div');
            toast.className = 'copy-notification';
            toast.textContent = `> ${message}`;
            document.body.appendChild(toast);

            setTimeout(() => toast.remove(), 3000);
        }
    };

    // Start the application
    PasswordAnalyzer.init();
});

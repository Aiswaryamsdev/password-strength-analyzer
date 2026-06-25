# 🛡️ Password Strength Analyzer

A high-tech, real-time password security analysis tool designed with a cybersecurity aesthetic. This application evaluates the complexity of passwords and provides instant feedback through numerical scoring and visual indicators, helping users create more secure credentials.

![Project Screenshot](https://via.placeholder.com/800x450?text=Password+Strength+Analyzer+Interface)

## ✨ Features

- **Real-time Analysis**: Instant feedback as you type, utilizing a scan-line animation to mimic system decryption.
- **Numerical Security Score**: A precise `0-100` score based on industry-standard complexity requirements.
- **Dynamic Strength Meter**: A neon progress bar that changes color (Red $\rightarrow$ Yellow $\rightarrow$ Green) based on password strength.
- **Complexity Checklist**: Live tracking of five critical security criteria:
    - 📏 Minimum 8 characters
    - 🔠 Uppercase letters
    - 🔡 Lowercase letters
    - 🔢 Numbers
    - 🔑 Special characters
- **Secure Generator**: One-click generation of high-entropy 16-character passwords that guarantee all complexity requirements are met.
- **Quick Copy**: Integrated clipboard functionality with a sleek, neon-green success notification.
- **Cyberpunk UI**: A modern, dark-themed interface featuring:
    - Glassmorphism effects (`backdrop-filter`).
    - "Breathing" neon glows and flickering hover effects.
    - Responsive design for all screen sizes.

## 🚀 Technologies Used

- **Backend**: [Flask](https://flask.palletsprojects.com/) (Python)
- **Frontend**: 
    - HTML5
    - CSS3 (Custom Properties, Keyframe Animations, Flexbox)
    - JavaScript (ES6+)
- **Typography**: Google Fonts ([Poppins](https://fonts.google.com/specimen/Poppins), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono))

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.x installed on your system.

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/password-analyzer.git
   cd password-analyzer
   ```

2. **Install Dependencies**
   ```bash
   pip install flask
   ```

3. **Run the Application**
   ```bash
   python app.py
   ```

4. **Access the Tool**
   Open your browser and navigate to:
   `http://127.0.0.1:5000`

## 🗺️ Future Enhancements

- [ ] **Leak Detection**: Integrate with APIs (like *Have I Been Pwned*) to check if the password has appeared in known data breaches.
- [ ] **Customizable Generator**: Allow users to specify the desired length and specific character sets for generated passwords.
- [ ] **Advanced Heuristics**: Implement detection for common patterns (e.g., "123456", "password") to penalize predictable sequences.
- [ ] **Dark/Light Mode**: Add a toggle for different visual themes while maintaining the tech aesthetic.

## 👤 Author

Developed by Aiswarya M S / Aiswaryamsdev
*Aspiring Cybersecurity Engineer*

---
*Designed for educational purposes to demonstrate the importance of password complexity.*

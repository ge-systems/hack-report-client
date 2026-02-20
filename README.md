# HACK R3P0RT 🛡️

**The official open-source client for the HACK R3P0RT platform.** HACK R3P0RT is a zero-knowledge, end tod end encrypted (E2EE) SaaS designed specifically for professional penetration testers. I've built this tool on a fundamental principle: 

**Your client's vulnerabilities are none of our business.**

## 🏗️ Architecture & The Trust Model

To guarantee the absolute privacy of your data, HACK R3P0RT uses a **Decoupled Zero-Knowledge Architecture**.

* **The Client (This Repository):** 100% Open Source. Built with React and Vite. All data processing, report generation, and most importantly **encryption and decryption** happen strictly within your local browser using the Web Crypto API.
* **The Server (Private):** Our backend is strictly a "dumb" JSON API. By the time your report leaves this frontend client, it has already been encrypted with AES-GCM using a key derived from your password. Our database only stores ciphertext. 
* **The Guarantee:** No one can read your reports, I cannot hand them over to third parties, and a breach in servers would yield nothing but mathematically useless gibberish. 
* **Bring Your Own Database (BYOD) by Design:** I designed the HackReport with a decoupled architecture. The users can simply use their own database, I do not need to have your database or use a database to keep user's sensitive data in my own servers.

---

By making this client open-source, we invite the infosec community to independently audit our encryption logic. You don't have to trust us; you can trust the math.

## 🚀 Tech Stack
* **Frontend Framework:** React 18 (Bootstrapped with Vite)
* **Styling:** Tailwind CSS
* **Encryption:** Native Web Crypto API

## 🛠️ Local Development Setup
If you would like to run the client locally to audit the code or contribute:

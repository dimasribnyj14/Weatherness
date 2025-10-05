# NASA Space Apps Challenge 2025

![Logo](https://assets.spaceappschallenge.org/media/images/Colorway2-Color_White3x.width-440.jpegquality-60.png)
<img width="250" height="254" alt="image" src="https://github.com/user-attachments/assets/589b055d-1ba0-4bbd-8bd6-52d97f9301b4" />



## Weatherness 
![Icon](https://i.ibb.co/1GVB8s4L/Icon-1.png)

|   [UI/UX Design](https://www.figma.com/design/0Gk9qM5WzTmTvaFd0uC3hB/dddd?node-id=0-1)     |       ![Figma](https://skillicons.dev/icons?i=figma)                                                                               |
|-----------------|--------------------------------------------------------------------------------------------|


**Weatherness** — a mobile application, which, thanks to the user's location, can determine accurate weather data in order to provide simple answers.

## Installation

1. Clone the repository:
```bash
 git clone https://github.com/dimasribnyj14/Weatherness.git
```

2. Install dependencies:
```bash
 npm install
```

3. Change the url to your API in chat.jsx
```js
const ai = new GoogleGenAI({ apiKey: 'PUT_YOUR_APIKEY_HERE' });
```
    
4. Run the project
```bash
 npm run android    # For android
 npm run ios        # For ios
 npm run web        # For browser
```

## Pages Overview

### Main Page
#### Description
This page displays location using image and name, using NASA's API.
#### Features
- **Fail Connection**: If it failed to check (because of no connection or no permission to locate), it shows with error.
- **User's location**: Asks permission to get user's location to make it work perfectly.
#### Demonstration
<img width="115" height="256" alt="image" src="https://github.com/user-attachments/assets/04971710-9b63-4186-8e9c-f29c7572a546" />
<img width="115" height="256" alt="image" src="https://github.com/user-attachments/assets/afc18094-e03a-4c6b-9d4c-d7b58e530076" />

### Chat Page
#### Description
This page displays chat with your Robot.
#### Features
- **Gemini API**: We use a Gemini API to chat with user.
- **Weather Data**: Gemini already knows the data, thanks to NASA Api and user's location, to answer without any issues.
#### Demonstration
<img width="115" height="256" alt="image" src="https://github.com/user-attachments/assets/96d8a5e4-fffb-4b43-837f-627e8d816502" />

## 😊 Thanks to these technologies!
| Techs      | Description                                                                                     |
|-----------------|--------------------------------------------------------------------------------------------|
| ![JS](https://skillicons.dev/icons?i=js)        | **JavaScript** — A versatile programming language used primarily for web development to create interactive and dynamic content. |
| ![React](https://skillicons.dev/icons?i=react)     | **React-Native** — A JavaScript library for building user interfaces, commonly used for single-page applications.                                                               |
| ![Figma](https://skillicons.dev/icons?i=figma)     | **Figma** — A collaborative web-based design tool used for UI/UX design, prototyping, and design systems.                                                                                     |
| <img width="50" height="50" alt="image" src="https://github.com/user-attachments/assets/d7051ce4-82a0-40c8-ac4e-0f6f502ddbba" />      | **Gemini API** — allows developers to integrate Google's powerful, multimodal Gemini models—which can process and generate text, images, audio, and video—into their own applications and services.                              |
| ![NPM](https://skillicons.dev/icons?i=npm)    | **NPM** — A package manager for JavaScript that allows developers to install, share, and manage dependencies in their projects.                                                     |
| ![GITHUB](https://skillicons.dev/icons?i=github)    | **GitHub** — A web-based platform that uses Git for version control and provides hosting for software development and collaboration.                                                                                     |
| ![GIT](https://skillicons.dev/icons?i=git)       | **Git** — A distributed version control system that helps track changes in source code during software development.                |
| <img width="70" height="72" alt="image" src="https://github.com/user-attachments/assets/6b4288aa-d806-4595-9ca2-69f8bbde67ce" />| **NASA Power API** provides free access to global weather, climate, and solar data from NASA’s satellite observations and models. |

## Authors
- Sofia Vlasikhina
- [Sribnyj Dmytro](https://www.github.com/dimasribnyj14)
- Igor Sokolov
- [Vladimir Mazan](https://github.com/CaptainGames12)

## License

[MIT](https://choosealicense.com/licenses/mit/)

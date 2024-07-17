# Country Capital Match Game

## Description

This project is a match game involving countries and their capitals. The idea is to select two cards and make a match. If you make a match, the card turns green. If you make a mistake, the card turns red. The game allows you to make up to three mistakes. If you select a card, it turns blue. At the end, if you match all the pairs, the game ends and you will have won the game.

## Features

- Select two cards to make a match between a country and its capital.
- Matched cards turn green.
- Unmatched cards turn red.
- You can make up to three mistakes.
- The selected card turns blue while you are making a match.
- Win the game by matching all the pairs correctly.

## Technologies Used

- React v18.3.1
- npm
- React Redux Toolkit for state management
- Docker for building the project image
- Docker version 25.0.3
- nginx
- shell script
- Fetch API for data consumption from the following public API (no external libraries used):
  - [https://restcountries.com/v3.1/all](https://restcountries.com/v3.1/all)
- Functional components with TypeScript

## How to execute the project with docker
1. **Ensure Docker Version 25.0.3 Installed:**
   Verify that Docker version 25.0.3 is installed on your system. You can check this by running:
   ```sh
   docker --version
2. **Dont forget Open Docker desktop**
    To ensure all the docker commands listed below works well, make sure you already has docker desktop opened.
3. **Use the following command to build your Docker image named `countries-match`**
```sh
docker build -t countries-match . --load
```
3.**Start a Docker container named `countries-match` and map port 3003 on your local machine to port 3003 inside the container: ** 
```sh
docker run -p 3003:3003 countries-match
```

## Normal installation without docker Installation

To install and run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/country-capital-match-game.git
    ```
2. Navigate to the project directory:
    ```sh
    cd country-capital-match-game
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

To start the game, run:
```sh
npm start
```

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

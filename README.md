# Linkroll

## Table of Contents

## API

This project's API is based on the [OpenAPI Specification](https://swagger.io/specification/)

## Setup

### First Steps

#### Environment Variables

In the project's root directory, create an `.env` file, containing the following environment variables:

-   `DEVELOPMENT`: if this environment variable exists, sets the project to 'development' mode.

### Backend

#### Install Requirements

From the root directory, run the `pip install -r requirements.txt` to install the required dependencies.

### Frontend

#### Install Node Version

`cd` into the `frontend` directory and then install the node version you wish to use. The node version for this project can be found in the `.nvmrc` file.

**Tip:** You can quickly install the correct Node Version by running the following command while in the `frontend` directory: `nvm i $(< .nvmrc)`

#### Install Dependencies

While still in the `frontend` directory, and run the `npm install` (or `npm i`) command to install the required dependencies.

#### Run Server

Finally, run the `npm run dev` command. This command will also simultaneously run the api server (note, this will only work if the [required backend dependencies](#install-requirements) have been installed).

## Technologies Used

### Languages

-   [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
-   [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
-   [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
-   [Python](https://www.python.org/)

### Libraries, Frameworks, and Processors

-   [Next.js](https://nextjs.org/)
-   [FastAPI](https://fastapi.tiangolo.com/)
-   [SASS/SCSS](https://sass-lang.com/)

### Database

-   [PostgreSQL](https://www.postgresql.org/)

### Design

-   [Figma](https://www.figma.com/)

### Other

-   [SVGOMG](https://svgomg.net/): used to clean up all SVGs used in the project
-   [Favicomatic](https://favicomatic.com/): used to create the project's favicon

### Misc

## Credits

-   Thanks to [Josh W. Comeau](https://www.joshwcomeau.com/) for his [Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/)

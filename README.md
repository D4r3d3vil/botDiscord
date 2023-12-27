
# Discord Bot Project

This project is a Discord bot built with [SvelteKit](https://kit.svelte.dev/) and [Discord.js](https://discord.js.org/).

## Installation

1. Clone the repository:

 ```bash
    git clone https://github.com/your-username/discord-bot-project.git
```
2. Navigate to the project directory:
```bash
   cd discord-bot-project
```

3. Install dependencies:
```bash
   npm install
```
4. Create a `.env` file in the root of the project and add your Discord bot token:

```env
   BOT_TOKEN=your-discord-bot-token
```

## Usage
To start the bot, run the following command:

```bash
npm run dev
```
The bot will connect to Discord using the provided token.

## Project Structure
- **src/routes/server/+server.js**: SvelteKit server file for server-side logic.
- **src/routes**: SvelteKit routes for frontend components.
- **static**: Static files such as images, styles, etc.
- **node_modules**: Dependencies installed via npm.
- **.env**: Environment variables file. (Ensure `BOT_TOKEN` is set)

## Customization
- **Adding Commands**: Coming soon.
- **Styling**: Customize the bot appearance by modifying styles in the `src/routes` directory.
- **Features**: Extend bot functionality by adding new features to the `+server.js` file.


## Contributing

Feel free to contribute to the project by submitting issues or pull requests.


## License

This project is licensed under the [MIT License](LICENSE).
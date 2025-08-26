# PicEditor

A modern Angular-based picture editing application with drawing capabilities and interactive canvas features.

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone or Download the Project

If you haven't already, get the project files to your local machine.

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd PicEditor
npm install
```

### 3. Development Server

To run the application in development mode:

```bash
npm start
```

Or alternatively:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`. The app will automatically reload when you make changes to the source files.

### 4. Build for Production

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory and can be deployed to any web server.

## Features

- **Interactive Canvas**: Draw and create shapes on an HTML5 canvas
- **Drawing Tools**: Pencil tool for freehand drawing
- **Shape Tools**: Rectangle drawing capabilities
- **Responsive UI**: Modern Material Design interface
- **Real-time Updates**: Live canvas updates and mouse position tracking

## Project Structure

```
src/
├── app/
│   ├── canvas/              # Canvas component for drawing
│   ├── shapes/              # Shape models (Rectangle, etc.)
│   ├── shared/              # Shared components (modals)
│   ├── app.component.*      # Root component
│   └── app.module.ts        # App module configuration
├── assets/                  # Static assets
└── environments/            # Environment configurations
```

## Available Scripts

- `npm start` or `ng serve` - Start development server
- `npm run build` or `ng build` - Build for production
- `npm test` or `ng test` - Run unit tests
- `npm run lint` or `ng lint` - Run linting

## Technology Stack

- **Angular 20** - Frontend framework
- **Angular Material** - UI component library
- **TypeScript** - Programming language
- **RxJS** - Reactive programming library
- **HTML5 Canvas** - Drawing capabilities
- **LESS** - CSS preprocessing

## Browser Support

This application supports modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Adding New Features

1. Use Angular CLI to generate components: `ng generate component component-name`
2. All components are configured as standalone components
3. Import required modules directly in component decorators

### Canvas Drawing

The application uses HTML5 Canvas API for drawing functionality. The main drawing logic is in `src/app/canvas/canvas.component.ts`.

## Troubleshooting

### Common Issues

1. **Build Errors**: Make sure you're using Node.js 18+ and have run `npm install`
2. **Port Already in Use**: The default port 4200 might be in use. Angular CLI will automatically suggest an alternative port
3. **Module Not Found**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Getting Help

- Check the [Angular Documentation](https://angular.dev)
- Review [Angular Material Components](https://material.angular.io)
- For canvas-related issues, refer to [HTML5 Canvas Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
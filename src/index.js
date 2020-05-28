// TODO: Render the `App` component to the DOM
import App from './components/App.js';
import searchYouTube from './lib/searchYouTube.js';

searchYouTube();

// rendering App component to the DOM
ReactDOM.render(<App />, document.getElementById('app'));
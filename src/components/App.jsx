import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videosListed: this.initialize(),
      currentVideo: this.initialize()[0],
      inputValue: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.searchYouTube = props.searchYouTube.bind(this);
    this.handleChange = _.debounce(this.handleChange.bind(this), 500);
    this.storeFormInput = this.storeFormInput.bind(this);
  }

  initialize() {
    let videoArray = [];
    for (let i = 0; i < 5; i++) {
      let emptyVideo = {
        kind: '',
        etag: '',
        id: {
          kind: '',
          videoId: i
        },
        snippet: {
          thumbnails: {
            default: ''
          }
        }
      };
      videoArray.push(emptyVideo);
    }
    return videoArray;
  }

  handleClick(video) {
    this.setState({
      videosListed: this.state.videosListed,
      currentVideo: video,
      inputValue: null
    });
  }

  handleChange() {
    this.searchYouTube({ key: YOUTUBE_API_KEY, q: this.state.inputValue, maxResults: 5 }, (data) => {
      this.setState({
        videosListed: data,
        currentVideo: data[0],
        inputValue: null
      });
    });
  }

  storeFormInput(value) {
    this.state.inputValue = value;
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search handleChange={this.handleChange} storeFormInput={this.storeFormInput}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videosListed} clickHandler={this.handleClick} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.searchYouTube({ key: YOUTUBE_API_KEY, q: 'cute cats', maxResults: 5 }, (data) => {
      this.setState({
        videosListed: data,
        currentVideo: data[0],
        inputValue: null
      });
    });
  }

}

App.propTypes = {
  searchYouTube: PropTypes.func.isRequired
};

export default App;

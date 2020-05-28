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
      currentVideo: this.initialize()[0]
    };
    this.handleClick = this.handleClick.bind(this);
    this.searchYouTube = props.searchYouTube.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.timeoutId = undefined;
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
      currentVideo: video
    });
  }

  handleChange(event) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    let eventTargetValue = event.target.value;
    let context = this;
    //wrap this in a setTimeout
    this.searchYouTube({ key: YOUTUBE_API_KEY, q: event.target.value, maxResults: 5 }, (data) => {
      this.setState({
        videosListed: data,
        currentVideo: data[0]
      });
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search handleChange={this.handleChange}/>
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
        currentVideo: data[0]
      });
    });
  }

}

App.propTypes = {
  searchYouTube: PropTypes.func.isRequired
};

export default App;

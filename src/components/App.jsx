import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialize = () => {
      let videoArray = [];
      for (let i = 0; i < 5; i++) {
        let emptyVideo = {
          kind: '',
          etag: '',
          id: {
            kind: '',
            videoId: ''
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
    };
    this.state = {
      videosListed: this.initialize(),
      currentVideo: this.initialize()[0]
    };
    this.handleClick = this.handleClick.bind(this);
    this.searchYouTube = props.searchYouTube.bind(this);

  }

  handleClick(video) {
    this.setState({
      videosListed: this.state.videosListed,
      currentVideo: video
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em> view goes here</h5></div>
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

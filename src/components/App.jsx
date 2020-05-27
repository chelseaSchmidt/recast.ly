import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';

// var App = () => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <div><h5><em>search</em> view goes here</h5></div>
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <VideoPlayer video = {exampleVideoData[0]} />
//       </div>
//       <div className="col-md-5">
//         <VideoList videos = {exampleVideoData}/>
//       </div>
//     </div>
//   </div>
// );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videosListed: exampleVideoData,
      currentVideo: exampleVideoData[0]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  //J   : Detect user selection of a video list entry title; change the currentVideo state to point to video list entry whose title was clicked.

  //I   : click event, "this" i.e. the element that triggered
  //O/SE: change App currentVideo state
  //C   : functional components cannot have state
  //EC  : none

  //Exp : On click event of a video title, the App currentVideo state will be changed to the parent video object

  handleClick() {
    console.log('click step 2');
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
            <VideoPlayer video={this.state.currentVideo} onClick={this.handleClick} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videosListed} clickHandler={this.handleClick} />
          </div>
        </div>
      </div>
    );
  }

}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

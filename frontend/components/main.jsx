import React from 'react';
import $ from 'jquery';
//components
import Header from './header.jsx';
import Search from './search.jsx';

class Main extends React.Component{
  constructor(props){
    super(props);
  }

  addInvisble(){
    $('.searchResults').addClass('invisible');
  }

  render(){
    return(
      <div className="content" onClick={this.addInvisble}>
        <Header/>

        <h1>Simplified Search</h1>
        <h2>Developed by Deep Tailor (Future Shift'er)</h2>

        <Search/>
      </div>
      );
  }
}

export default Main;

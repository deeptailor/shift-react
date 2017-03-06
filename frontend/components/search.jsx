import React from 'react';
import $ from 'jquery';

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {results: [], request:null, value:''};

    this.searchRequest = this.searchRequest.bind(this);
    this.updateState = this.updateState.bind(this);
    this.displayResults = this.displayResults.bind(this);
  }

  componentDidMount(){
    $('.searchbar').click((e)=>{
      e.stopPropagation();
      $('.searchResults').removeClass('invisible');
    });
  }

  updateState(results){
    $('.searchResults').removeClass('invisible');
    this.setState({results: results, request:null});
  }

  searchRequest(val){

    return() => {
      val = val || document.querySelector('.searchbar').value;
      this.setState({value: val});
      if(this.state.request){
        this.state.request.abort();
      }

      window.setTimeout(() => {
        this.state.request = $.ajax({
                    url:`http://localhost:3000/api?q=/${val}`,
                    success: this.updateState,
                    error: (e) => console.log(e)
                  });
      }, 200);

    }
  }

  displayResults(){
    if(this.state.results.length > 0){
      return this.state.results.map((result, index) => {
        return(
          <li key={index} onClick={this.searchRequest(result)}>{result}</li>
        );
      });
    } else{
      return(<li className="invisible">Enter Query</li>)
    }
  }

  render(){
    return(
      <div className="searchbar-wrapper">

        <div className="searchbar-magnify"><i className="fa fa-search" aria-hidden="true"></i></div>

        <input type="search" className="searchbar" placeholder="Enter Query" value={this.state.value} onChange={this.searchRequest()}/>

        <ul className="searchResults">
          {this.displayResults()}
        </ul>
      </div>
    );
  }
}

export default Search;

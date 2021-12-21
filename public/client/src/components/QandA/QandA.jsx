import React from 'react';
import Search from './Search.jsx';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';
import axios from 'axios';
const token = require('../../../dist/config.js');

class QandA extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      haveData: false,
      qToDisplay: 2
    };
  }

  moreQuestions (e) {
    //adjuest number of questions displayed
  }

  componentDidMount () {
    //set state to questions for passed in product
    //organize in order of helpfulness
    console.log('props', this.props);

    let id = this.props.id;
    this.setState({
      product: id
    })
    this.getQuestionData(id, 3, 5)
  }

  getQuestionData(id, page, count) {
    let headers = {
      'Authorization': token.TOKEN
    };
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions', { parameters: {product: id}, headers: headers})
    .then((result) => {
      console.log('qandA get results', result);
    })
    .catch((error) => {
      throw error;
    })
  }

  render() {
    if (!this.state.haveData) {
      return (
        <div>Questions are Loading</div>
        )
      } else {
        return (
          <div>
        <h2>Q and A</h2>
        <Search />
        <Question />
        <button>More Anwsered Questions</button>
        <AddQuestion />
        </div>
      )
    }
  }
}


export default QandA;
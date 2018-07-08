import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter}  from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
//import { Provider, ReactRedux } from 'react-redux'
import { createStore } from 'redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';
import AddAuthorForm from './AddAuthorForm';


const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn', 'book2', 'book3']
    },
    {
        name: 'Charls Dicken',
        imageUrl: 'images/authors/charlsdicken.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry', 'book4', 'book5']
    },
    {
        name: 'JK Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckle', 'book6', 'book7']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Fin', 'book8', 'book9']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/Shakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry F', 'book10', 'book11']
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer))
    }
}

// function resetState(){
//     return {
//         turnData: getTurnData(authors),
//         highlight: ''
//     };
// }

//let state = resetState();

function reducer(state = { authors, turnData: getTurnData(authors), highlight: ''}, action){
    switch (action.type) {
        case 'ANSWER__SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer )
            return Object.assign(
                {},
            state, {
                highlight: isCorrect ? 'correct' : 'wrong'
            });
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors)
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author])
            })
        default: return state;
    }
    return state;
}

let store = Redux.createStore(
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//let state = resetState();

// function onAnswerSelected(answer){
//     const isCorrect = state.turnData.author.books.some((book) => book === answer);
//     state.highlight = isCorrect ? 'correct' : 'wrong';
//     render();
// }

// function App() {
//     return <ReactRedux.Provider store={store}>
//         <AuthorQuiz /> 
//     </ReactRedux.Provider>
// }

//let store = Redux.createStore(reducer);

// const AuthorWrapper = withRouter(({ history }) => 
//     <AddAuthorForm onAddAuthor={(author) => {
//         authors.push(author);
//         history.push('/');
//     }} />
// );

// function render(){
    ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz}/>
                <Route path="/add" component={AddAuthorForm}/>
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));
//}
//render();

registerServiceWorker();

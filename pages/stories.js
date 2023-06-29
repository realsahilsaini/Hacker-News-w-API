import view from '../utils/view.js';
import Story from '../components/story.js';
import baseUrl from '../utils/baseUrl.js';

export default async function Stories(path) {
  const stories = await getStories(path);
  // console.log(stories);

  const hasStories = stories.length > 0;

  view.innerHTML = `<div>
  ${hasStories ? stories.map((story, i) => Story({...story, index: i+1})).join(''): 'No Stories'}
  </div>`;  
}


// Edpoint:
// https://node-hnapi.herokuapp.com

// / (Top) -> /new
// /new (New) -> /newest
// /ask (Ask) -> /ask
// /show (Show) -> /show

async function getStories(path){
  const isHomeRoute = path === '/';
  const isNewRoute = path === '/new';


  if(isHomeRoute){
    path = '/news';
  }else if(isNewRoute){
    path = '/newest'
  }

  const response  =  await fetch(`${baseUrl}${path}`);
  //To be able to easily resolve this, since we know fetch returns a promise indiciating our data, we can make this async function, and we can await our request that we are making;

  const stories = await response.json();

  return stories;

}
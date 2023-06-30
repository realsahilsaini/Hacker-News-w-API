import view from '../utils/view.js';
import Story from '../components/story.js';
import baseUrl from '../utils/baseUrl.js';
import store from '../store.js';
import checkFavorite from '../utils/checkFavorite.js';

export default async function Stories(path) {
  const {favorites} = store.getState();
  const stories = await getStories(path);
  // console.log(stories);
  const hasStories = stories.length > 0;

  view.innerHTML = `<div>
  ${hasStories ? stories.map((story, i) => Story({...story, index: i+1, isFavorite: checkFavorite(favorites, story)})).join(''): 'No Stories'}
  </div>`;  

  document.querySelectorAll('.favorite').forEach(favoriteButton => {
    favoriteButton.addEventListener('click', async function() {
      const story = JSON.parse(this.dataset.story);  
      const isFavorited = checkFavorite(favorites, story);
      store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: { favorite: story } });
      await Stories(path);
    }); 
 });
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
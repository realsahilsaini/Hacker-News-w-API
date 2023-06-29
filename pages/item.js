import Story from "../components/story.js";
import view from "../utils/view.js";
import baseUrl from '../utils/baseUrl.js';


export default async function Item(){

    let story = null;
    let hasComments=false;
    let hasError =false;

    try{
        story = await getStory();
        hasComments = story.comments.length > 0;

    }catch{
        hasError = true
        console.error(error)
    }

    if(hasError){
        view.innerHTML = `<div class="error"Error while fetching story</div>`
    }

    view.innerHTML = `
    <div>
    ${Story(story)}
    </div> 

    <hr/>

    ${hasComments ?  story.comments.map(comment => JSON.stringify(comment)).join('') : 'No comments'}
    `
}

async function getStory(){
    // console.log(window.location.hash);
    //To get location by getting value after hash along with its id, id value

    const storyId = window.location.hash.split('?id=')[1]; //getting story id 

//   /item/:itemId

    const response = await fetch(`${baseUrl}/item/${storyId}`);

    const story = await response.json();

    return story;

}
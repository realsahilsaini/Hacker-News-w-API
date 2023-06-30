export default function checkFavortie(favorites, story){
    return favorites.some(favorite => favorite.id === story.id);

}
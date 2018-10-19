const ROOT_URL = 'http://localhost:3001';
const getURL = function (resourcePath){
    if(resourcePath.startsWith("/")){
        return `${ROOT_URL}${resourcePath}`;
    }
    return `${ROOT_URL}/${resourcePath}`;
}
export default getURL;
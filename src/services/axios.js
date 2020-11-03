import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

function makeURL(url) {
  if(Array.isArray(url)) {
    url = url.join("/");
  }
  return url;
}
 
export default {
  instance: instance,
  get: function(url, payload) {
    url = makeURL(url);
    return instance.get(url, {params: payload})//, headers: {"Authorization": store.getters['auth/authorization_header']}});    
  },
  post: function(url, payload) {
    url = makeURL(url);
    return instance.post(url, payload)//, {headers: {"Authorization": store.getters['auth/authorization_header']}})
  },
  put: function(url, payload) {
    url = makeURL(url);
    return instance.put(url, payload)//, {headers: {"Authorization": store.getters['auth/authorization_header']}});
  },
  delete: function(url) {
    url = makeURL(url);
    return instance.delete(url)//, {headers: {"Authorization": store.getters['auth/authorization_header']}});
  }
}
import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {          
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        vuexContext.commit('setPosts', [
                          {
                            id: '1',
                            title: 'First Post',
                            previewText: 'This is our first post',
                            thumbnail: 'https://thyblackman.com/wp-content/uploads/2018/11/TECH.jpg'
                          },
                          {
                            id: '2',
                            title: 'Second Post',
                            previewText: 'This is our second post',
                            thumbnail: 'https://thyblackman.com/wp-content/uploads/2018/11/TECH.jpg'
                          }
                        ])
                        resolve()
                    }, 1000)
                }).then(data => {
                    context.store.commit('setPosts', data.loadedPosts)
                }).catch(e => {});
            },
            setPosts({commit}, posts) {
                commit('setPosts', posts)
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        }
    })
}

export default createStore
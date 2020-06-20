import Vuex from 'vuex';


// 1. create a store
const createStore = () => {
    return new Vuex.Store({
        // 2. setup these building blocks
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            }
        },
        actions: {
            
            // 0] Add nuxtServerInit()
            nuxtServerInit(vuexContext, context) {

                // 1.] async action should return a Promise            
                return new Promise((resolve, reject) => {
                    setTimeout(() => {

                        // 2] access commit via vuexContent, send the payload
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

                        // 3] call the resolve to mark you're done
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

// 3. Dont forget to export, nuxt will automatically nject these
export default createStore
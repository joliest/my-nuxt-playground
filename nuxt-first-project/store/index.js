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
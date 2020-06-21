import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            },
            addPost(state, post) {
                state.loadedPosts.push(post);
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => 
                    post.id === editedPost.id
                );
                state.loadedPosts[postIndex] = editedPost;
            },
            setToken(state, token) {
                state.token = token
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {     
                return context.app.$axios
                    .$get('/posts.json')
                    .then(data => {
                        const postArray = [];
                        for (const key in data) {
                            postArray.push({...data[key], id: key})
                        }
                        vuexContext.commit('setPosts', postArray)
                    })
                    .catch(e => context.error(e))
            },
            setPosts({commit}, posts) {
                commit('setPosts', posts)
            },
            addPost({commit, state}, post) {
                const createdPost = {
                    ...post,
                    updatedDate: new Date()
                }
                // not requried to return, useful for redirection
                return this.$axios.$post(`/posts.json?auth=${state.token}`, createdPost)
                .then(data => {
                    // updating vuex store to make it sync
                    commit('addPost', { ...createdPost, id: data.name })
                })
                .catch(e => console.log(e))
            },
            editPost({commit, state}, editedPost) {
                return this.$axios.$put(`/posts/${editedPost.id}.json?auth=${state.token}`, editedPost)
                    .then(res => {
                        // updating vuex store to make it sync
                        commit('editPost', editedPost)
                    })
                    .catch(e => console.log(e))
            },
            authenticateUser({commit}, authData) {
                let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`
      
                if (!authData.isLogin) {
                    authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`
                }

                // return a Promise() to access then()
                return this.$axios
                    .$post(authUrl, {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    })
                    .then(result => {
                        commit('setToken', result.idToken)
                    })
                    .catch(e => console.log(e))
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore
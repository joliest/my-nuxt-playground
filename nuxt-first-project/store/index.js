import Vuex from 'vuex';
import Cookie from 'js-cookie';

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
            },
            clearToken(state) {
                state.token = null
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
            authenticateUser({commit, dispatch}, authData) {
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

                        //store in local storage can be accessible in browser/client only
                        localStorage.setItem('token', result.idToken)
                        localStorage.setItem(
                            'tokenExpiration', 
                            new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
                        )

                        // store as cookie to be able to read by nuxt server
                        Cookie.set('jwt', result.idToken)
                        Cookie.set(
                            'expirationDate', 
                            new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
                        )
                    })
                    .catch(e => console.log(e))
            },
            // fetch the token when page refreshes
            initAuth({commit, dispatch}, req) {
                let token, expirationDate;
                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }
                    const jwtCookie = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('jwt='));

                    if (!jwtCookie) {
                        return;
                    }

                    // retrieving the token from the cookie
                    token = jwtCookie.split('=')[1];

                    expirationDate = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('expirationDate='))
                        .split('=')[1];
                } else {
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem('tokenExpiration');
                }
                
                // expired or token available?
                if (new Date().getTime() > expirationDate || !token) {
                    console.log('No token / invalid token')
                    dispatch('logout')
                    return;
                }
                commit('setToken', token);
            },
            logout({commit}) {
                commit('clearToken')
                Cookie.remove('jwt')
                Cookie.remove('expirationDate')
                if (process.client) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('tokenExpiration')
                }
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
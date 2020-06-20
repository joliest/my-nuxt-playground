import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
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
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {     
                return axios.get(`${process.env.baseUrl}/posts.json`)
                    .then(res => {
                        const postArray = [];
                        for (const key in res.data) {
                            postArray.push({...res.data[key], id: key})
                        }
                        vuexContext.commit('setPosts', postArray)
                    })
                    .catch(e => context.error(e))
            },
            setPosts({commit}, posts) {
                commit('setPosts', posts)
            },
            addPost({commit}, post) {
                const createdPost = {
                    ...post,
                    updatedDate: new Date()
                }
                // not requried to return, useful for redirection
                return axios.post(`${process.env.baseUrl}/posts.json`, createdPost)
                .then(res => {
                    // updating vuex store to make it sync
                    commit('addPost', { ...createdPost, id: res.data.name })
                })
                .catch(e => console.log(e))
            },
            editPost({commit}, editedPost) {
                return axios.put(`${process.env.baseUrl}/posts/${editedPost.id}.json`, editedPost)
                    .then(res => {
                        // updating vuex store to make it sync
                        commit('editPost', editedPost)
                    })
                    .catch(e => console.log(e))
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
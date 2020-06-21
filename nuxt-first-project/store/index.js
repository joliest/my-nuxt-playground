import Vuex from 'vuex';

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
            addPost({commit}, post) {
                const createdPost = {
                    ...post,
                    updatedDate: new Date()
                }
                // not requried to return, useful for redirection
                return this.$axios.$post('/posts.json', createdPost)
                .then(data => {
                    // updating vuex store to make it sync
                    commit('addPost', { ...createdPost, id: data.name })
                })
                .catch(e => console.log(e))
            },
            editPost({commit}, editedPost) {
                return this.$axios.$put(`/posts/${editedPost.id}.json`, editedPost)
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